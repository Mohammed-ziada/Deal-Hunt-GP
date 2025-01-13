import { useEffect, useState } from "react";
import { ThunderboltOutlined } from "@ant-design/icons";
import { useCart } from "../../app/CartContext";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, Col, Button } from "antd";
import productImage from "../../assets/images/product.png";
// import _ from "lodash";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState("");
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [userProducts, setUserProducts] = useState([]);
  // const [selectedProductId, setSelectedProductId] = useState(null);
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // const showModal = () => setIsModalVisible(true);

  // const handleOk = _.debounce(async () => {
  //   if (!selectedProductId) {
  //     alert("اختر المنتج اللي هتبدله!");
  //     return;
  //   }
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/storeswap", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         requester_productid: product.id,
  //         requested_productid: selectedProductId,
  //         price: product.price,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorDetails = await response.json();
  //       throw new Error(errorDetails.message || "Failed to swap");
  //     }

  //     alert("تم إرسال طلب التبديل بنجاح!");
  //     setIsModalVisible(false);
  //   } catch (error) {
  //     console.error("Error swapping:", error);
  //     alert("حصل خطأ أثناء التبديل!");
  //   }
  // }, 300);

  // const handleCancel = () => setIsModalVisible(false);

  const handleSwapNavigate = () => {
    console.log("Navigating with product:", product); // تحقق من البيانات هنا
    navigate("/swap", { state: { selectedProduct: product } });
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      const cachedData = localStorage.getItem("subcategories");
      if (cachedData) {
        setSubcategories(JSON.parse(cachedData));
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/show/allsubcategory"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subcategories");
        }
        const result = await response.json();
        localStorage.setItem("subcategories", JSON.stringify(result));
        setSubcategories(result);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  useEffect(() => {
    const subcategory = subcategories.find(
      (sub) => sub.id === product.subcategoryid
    );
    if (subcategory) {
      setSubcategoryName(subcategory.subcategoryname);
    } else {
      setSubcategoryName("Unknown Subcategory");
    }
  }, [subcategories, product.subcategoryid]);

  // useEffect(() => {
  //   const fetchUserProducts = async () => {
  //     const cachedProducts = localStorage.getItem("userProducts");
  //     if (cachedProducts) {
  //       setUserProducts(JSON.parse(cachedProducts));
  //       return;
  //     }

  //     const user = JSON.parse(localStorage.getItem("user"));
  //     if (!user || !user.id) {
  //       console.error("User not found in localStorage");
  //       return;
  //     }

  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/api/get/products");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user products");
  //       }
  //       const products = await response.json();
  //       const filteredProducts = products.filter(
  //         (item) => item.userid === user.id && item.id !== product.id
  //       );
  //       localStorage.setItem("userProducts", JSON.stringify(filteredProducts));
  //       setUserProducts(filteredProducts);
  //     } catch (error) {
  //       console.error("Error fetching user products:", error);
  //     }
  //   };

  //   fetchUserProducts();
  // }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Col>
      <Card
        className="rounded-3xl"
        hoverable
        cover={
          <Link to={`/product/${product.id}`} className="pt-6 pb-6 pr-5 pl-5">
            <img
              src={product.picname ? product.picname : productImage}
              alt={product.name}
              className="w-full bg-cover rounded-3xl"
            />
          </Link>
        }
        actions={[
          <div
            className="flex gap-1 align-middle"
            style={{ padding: "10px" }}
            key={product.id}
          >
            <Button
              type="primary"
              className="bg-[#FF3B3B] hover:bg-red-50 text-white w-full"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
            <Button
              type="primary"
              className="bg-[#942121] hover:bg-[#742121] text-white w-full"
              onClick={handleSwapNavigate}
            >
              Swap
            </Button>
          </div>,
        ]}
      >
        <Card.Meta
          title={product.name}
          description={
            <div>
              <div className="text-sm text-gray-500">{subcategoryName}</div>
              <div className="text-2xl font-semibold text-[#FF3B3B]">
                {product.price}{" "}
                <span className="text-sm font-normal text-gray-500">EGP</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="bg-[#E6F4FF] text-[#0091FF] rounded-md flex items-center gap-1">
                  <ThunderboltOutlined className="text-xs" />
                  <span>Fast Shipping</span>
                </div>
                <span className="text-gray-500">Get it by 11 Sep</span>
              </div>
            </div>
          }
        />
      </Card>
    </Col>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subcategoryid: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    picname: PropTypes.string,
  }).isRequired,
};
