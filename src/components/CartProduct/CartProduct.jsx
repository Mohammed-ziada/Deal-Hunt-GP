// import PropTypes from "prop-types"; // For prop validation
// import { Button, Col, Image, Row, Typography, message } from "antd";
// import { DeleteOutlined } from "@ant-design/icons";
// import { useCart } from "../../app/CartContext";

// export default function CartProduct({ product }) {
//   const {
//     id,
//     name,
//     priceAfterDiscount,
//     quantity,
//     imagecover,
//     category,
//     price,
//   } = product || {};
//   const { removeFromCart, updateQuantity } = useCart();

//   console.log("Product data in CartProduct:", product);

//   // Validate product properties
//   if (!product || !id || !name || quantity === undefined) {
//     return (
//       <div className="p-4 border rounded-lg">
//         <Typography.Text type="danger">Invalid product data</Typography.Text>
//       </div>
//     );
//   }

//   // Handle quantity update
//   const handleQuantityChange = (newQuantity) => {
//     if (newQuantity < 1) {
//       message.error("Quantity cannot be less than 1");
//       return;
//     }
//     if (newQuantity > 100) {
//       // Example maximum limit
//       message.error("Quantity cannot exceed 100");
//       return;
//     }
//     updateQuantity(id, newQuantity);
//   };

//   // Handle product removal
//   const handleRemove = () => {
//     try {
//       removeFromCart(id);
//       message.success("Product removed from cart");
//     } catch (error) {
//       console.error("Error removing product:", error);
//       message.error("Failed to remove product from cart");
//     }
//   };

//   return (
//     <div className="p-4 border rounded-lg">
//       <Row gutter={[16, 16]} align="middle">
//         {/* Product Image */}
//         <Col xs={6}>
//           <Image
//             width={100}
//             src={imagecover || "fallback-image-url"} // Fallback image
//             alt={name || "Product"}
//           />
//         </Col>

//         {/* Product Details */}
//         <Col xs={12}>
//           <Typography.Title level={5}>
//             {name || "Unknown Product"}
//           </Typography.Title>
//           <Typography.Text type="secondary">
//             {category?.name || "No Category"}
//           </Typography.Text>
//         </Col>

//         {/* Quantity and Price Section */}
//         <Col xs={6} className="text-right">
//           <div className="flex items-center">
//             <Button
//               onClick={() => handleQuantityChange(quantity - 1)}
//               disabled={quantity <= 1}
//             >
//               -
//             </Button>
//             <span style={{ margin: "0 10px" }}>{quantity}</span>
//             <Button
//               onClick={() => handleQuantityChange(quantity + 1)}
//               disabled={quantity >= 100} // Example max limit
//             >
//               +
//             </Button>
//           </div>
//           <Typography.Text className="block mt-2">
//             EGP {price * quantity || 0}
//           </Typography.Text>
//           <Button
//             type="text"
//             danger
//             icon={<DeleteOutlined />}
//             onClick={handleRemove}
//           >
//             Remove
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// // Prop Validation
// CartProduct.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     priceAfterDiscount: PropTypes.number.isRequired,
//     quantity: PropTypes.number.isRequired,
//     imagecover: PropTypes.string, // Correct field name
//     category: PropTypes.shape({
//       name: PropTypes.string,
//     }),
//   }),
// };
import PropTypes from "prop-types";
import { Button, Col, Image, Row, Typography, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useCart } from "../../app/CartContext";
import ProductImage from "../../assets/images/product.png";
export default function CartProduct({ product }) {
  const { removeFromCart, updateQuantity } = useCart();
  const { id, name, price, quantity, picname, subcategoryid } = product;
  console.log(product);
  // دالة لتحديث الكمية
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      message.error("Quantity cannot be less than 1");
      return;
    }
    if (newQuantity > 100) {
      message.error(" Quantity cannot exceed 100");
      return;
    }
    updateQuantity(id, newQuantity);
  };

  // دالة لحذف المنتج من الكارت
  const handleRemove = () => {
    removeFromCart(id);
    message.success(" product Deleted from cart");
  };

  return (
    <div className="p-4 border rounded-lg">
      <Row gutter={[16, 16]} align="middle">
        {/* صورة المنتج */}
        <Col xs={6}>
          <Image
            width={100}
            src={picname || ProductImage} // لو الصورة مش موجودة نعرض صورة بديلة
            alt={name || "Unknown Product"}
          />
        </Col>

        {/* تفاصيل المنتج */}
        <Col xs={12}>
          <Typography.Title level={5}>
            {name || "Unknown Product"}
          </Typography.Title>
          <Typography.Text type="secondary">
            {subcategoryid || "No Category"}
          </Typography.Text>
        </Col>

        {/* التحكم في الكمية والسعر */}
        <Col xs={6} className="text-right">
          <div className="flex items-center">
            <Button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span style={{ margin: "0 10px" }}>{quantity}</span>
            <Button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 100}
            >
              +
            </Button>
          </div>
          <Typography.Text className="block mt-2">
            EGP {price * quantity || 0}
          </Typography.Text>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleRemove}
          >
            Remove
          </Button>
        </Col>
      </Row>
    </div>
  );
}

CartProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired, // Update to number
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    picname: PropTypes.string, // تأكد من اسم الحقل
    subcategoryid: PropTypes.string,
  }),
};
