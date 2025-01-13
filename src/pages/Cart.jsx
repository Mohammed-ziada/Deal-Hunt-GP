import {
  Spin,
  message,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../app/CartContext";
import CartProduct from "../components/CartProduct/CartProduct";
import { makeOrder } from "../components/CartProduct/MakeOrder"; // Assuming this is the function to make an order
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Modal from "../components/shared/Modal";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, isLoading, setCart } =
    useCart();
  const { Title, Text } = Typography;
  const navigate = useNavigate(); // useNavigate inside component
  const [couponCode, setCouponCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // For modal visibility
  const [modalContent, setModalContent] = useState(""); // For modal content
  // Check if user is logged in
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if not logged in
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    // Avoid rendering the component until navigation has occurred
    return null;
  }

  // Calculate Subtotal
  const calculateSubtotal = () =>
    cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

  const subtotal = calculateSubtotal();
  const shipping = cart.length > 0 ? 32 : 0;
  const vat = subtotal * 0.14;
  const total = subtotal + shipping + vat;

  // Handle Apply Coupon
  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      message.warning("Please enter a valid coupon code.");
      return;
    }
    setCouponCode(""); // Clear input after applying
  };

  // Pass navigate to makeOrder

  const handleOrder = async () => {
    let response;

    try {
      // استدعاء makeOrder وتخزين الاستجابة في response
      response = await makeOrder(cart, navigate);
      toast.promise(makeOrder(cart, navigate), {
        loading: "Redirecting to Home...",
        success: <b>Order placed successfully!</b>,
        error: <b>Failed to place the order.</b>,
      });
      // إذا كانت الاستجابة ناجحة، نقوم بتحديث المودال
      setModalContent(
        <div className="flex flex-col items-center">
          <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
          <span className="text-center">Order done successfully!</span>
        </div>
      );

      // بعد عرض المودال بنجاح، انتظر 2 ثانية ثم قم بإغلاق المودال والانتقال إلى الصفحة الرئيسية
      setTimeout(() => {
        setModalVisible(false);
        navigate("/"); // إعادة التوجيه إلى الصفحة الرئيسية بعد 2 ثانية
      }, 2000);

      setCart([]); // تفريغ الكارت بعد النجاح
    } catch (error) {
      // في حالة حدوث خطأ، نقوم بتحديث المودال مع رسالة فشل
      console.error("Error while placing the order:", error);
      setModalContent(
        <div className="flex flex-col items-center">
          <XCircle className="text-red-500 w-12 h-12 mb-4" />
          <span className="text-center">Failed to place the order.</span>
        </div>
      );

      // عرض المودال مع الرسالة بعد 2 ثانية
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    } finally {
      setModalVisible(true); // عرض المودال أثناء معالجة النتيجة
    }
  };

  console.log(cart.map((product) => product.quantity));
  return (
    <Row className="p-4">
      <Col xs={24} md={18} className="p-4">
        <Title level={4}>
          Cart{" "}
          <Text className="text-lg" type="secondary">
            ({cart.length} items)
          </Text>
        </Title>
        {isLoading ? (
          <Spin size="large" />
        ) : cart.length > 0 ? (
          cart.map((product) => (
            <CartProduct
              key={product.id}
              product={product}
              removeProduct={() => removeFromCart(product.id)}
              updateQuantity={(quantity) => {
                updateQuantity(product.id, quantity);
              }}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </Col>

      <Col
        xs={24}
        md={6}
        className="p-4 border border-gray-200 rounded-md bg-white self-start"
      >
        <Title level={4}>Order Summary</Title>
        <Input
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          suffix={
            <Button onClick={handleApplyCoupon} disabled={!couponCode.trim()}>
              Apply
            </Button>
          }
        />
        <Divider />
        <Row>
          <Col span={12}>Subtotal</Col>
          <Col span={12} className="text-right">
            EGP {subtotal.toFixed(2)}
          </Col>
        </Row>
        <Row>
          <Col span={12}>Shipping</Col>
          <Col span={12} className="text-right">
            EGP {shipping.toFixed(2)}
          </Col>
        </Row>
        <Row>
          <Col span={12}>VAT</Col>
          <Col span={12} className="text-right">
            EGP {vat.toFixed(2)}
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <Title level={5}>Total</Title>
          </Col>
          <Col span={12} className="text-right">
            <Text strong>EGP {total.toFixed(2)}</Text>
          </Col>
        </Row>
        <Button type="primary" block className="mt-4" onClick={handleOrder}>
          Order Now
        </Button>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 1500, // مدة ظهور التوست (بالمللي ثانية)
            style: {
              background: "#fff", // لون خلفية التوست
              color: "#64172b", // لون النص داخل التوست
            },
          }}
        />
      </Col>
      <Modal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        modalContent={modalContent}
      />
    </Row>
  );
};

export default Cart;
