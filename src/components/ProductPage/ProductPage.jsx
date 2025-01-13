import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Rate,
  Typography,
  Divider,
  Space,
  Select,
} from "antd";
import { ShoppingCartOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { useCart } from "../../app/CartContext";
import prodcutImage from "../../assets/images/product.png";
// import prodcutImage2 from "../../assets/images/product.jpg";
import ProductSlider from "./ProductSlider";
import { Option } from "antd/es/mentions";
import { SwatchBookIcon } from "lucide-react";
const { Title, Text } = Typography;
// const productImages = [prodcutImage2, prodcutImage];
const ProductPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  // console.log();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bgColor, setBgColor] = useState("");
  // const [mainImage, setMainImage] = useState(prodcutImage); // State for main image
  // const [selectedProductId, setSelectedProductId] = useState(null);
  const navigate = useNavigate();

  const handleSwapNavigate = () => {
    console.log("Navigating with product:", product); // تحقق من البيانات هنا
    navigate("/swap", { state: { selectedProduct: product } });
  };
  console.log(product);
  const toggleColor = () => {
    // Toggle between the product color and default (empty) color
    setBgColor((prevColor) =>
      prevColor === product.color.toLowerCase()
        ? ""
        : product.color.toLowerCase()
    );
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/get/products/${id}`
        );
        const result = await response.json();
        // console.log(result);
        setProduct(result); // Assuming product data is in `result`
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/get/products/`);
        const result = await response.json();
        // console.log(result);
        setProducts(result); // Assuming product data is in `result`
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
    fetchProducts();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: product.price, // Ensure correct price is passed
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;
  // console.log(product);
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Product Header */}
      <Row gutter={[16, 16]}>
        {/* Image Section */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <img
            src={product.picname || prodcutImage} // Use mainImage state
            alt={product.name}
            className="w-full rounded-lg"
          />
          {/* <Row gutter={[8, 8]} className="mt-4">
            {productImages.map((img, idx) => (
              <Col span={4} key={idx}>
                <img
                  src={img || "fallback-image-url"} // Fallback for additional images
                  alt={`Thumbnail ${idx}`}
                  className="w-full rounded-lg cursor-pointer"
                  onClick={() => setMainImage(img)} // Set main image on click
                />
              </Col>
            ))}
          </Row> */}
        </Col>

        {/* Product Details Section */}
        <Col xs={24} sm={24} md={12} lg={12} className="">
          <div className="flex flex-col justify-between ">
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              {/* <Badge.Ribbon
              text={product.quantity > 0 ? "In Stock" : "Out of Stock"}
              color={product.quantity > 0 ? "yellow" : "red"}
            > */}
              <div className="flex  gap-2 justify-between">
                <Title level={4}>{product.name}</Title>
                {product.quantity > 0 ? (
                  <div className="badgecolor badgecolortext rounded-md flex pr-2 pl-2  items-center gap-1">
                    <exclamation-circle className="text-xs" />
                    <span>In Stock</span>
                  </div>
                ) : (
                  <div className="bg-red-200 rounded-md flex pr-2 pl-2  items-center gap-1">
                    <exclamation-circle className="text-xs" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
              {/* </Badge.Ribbon> */}
              <Text strong>Brand: {product.category?.name || "N/A"}</Text>
              <Title level={3} style={{ color: "#e53935" }}>
                {product.price || "N/A"} EGP
                <small style={{ fontSize: "0.8em" }}> Including VAT</small>
              </Title>
              <div>
                <Rate allowHalf disabled defaultValue={3 | 0} />
                <Text className="text-gray-500" style={{ marginLeft: 10 }}>
                  {3} (380)
                </Text>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="bg-[#E6F4FF] text-[#0091FF]  p-2 rounded-md flex items-center gap-1">
                  <ThunderboltOutlined className="text-xs" />
                  <span>Fast Shipping</span>
                </div>
                <span className="text-gray-500">Get it by 11 Sep</span>
              </div>
              <Divider />
              <div>
                <Title level={5}>Color</Title>

                {product.color ? (
                  <>
                    <div
                      className={`border border-gray-400 pr-4 pl-4 pt-2 pb-2 rounded-xl w-fit cursor-pointer`}
                      style={{ borderColor: bgColor }} // Dynamically apply background color
                      onClick={toggleColor} // Toggle background color on click
                    >
                      {product.color || "blue"}
                    </div>
                  </>
                ) : (
                  <Text>No colors available</Text>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Select
                  defaultValue="1"
                  style={{ width: 120 }}
                  dropdownStyle={{ borderRadius: "8px" }}
                >
                  <Option value="1"> 1</Option>
                  <Option value="2"> 2</Option>
                  <Option value="3"> 3</Option>
                  <Option value="4"> 4</Option>
                  <Option value="5"> 5</Option>
                  <Option value="6"> 6</Option>
                  <Option value="7"> 7</Option>
                  <Option value="8"> 8</Option>
                  <Option value="9"> 9</Option>
                  <Option value="10">10</Option>
                </Select>
                <Button
                  type="primary"
                  className="bg-ruby-9 "
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  disabled={product.quantity === 0}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  type="primary"
                  className="bg-ruby-9 "
                  icon={<SwatchBookIcon />}
                  size="large"
                  onClick={handleSwapNavigate}
                >
                  Swap
                </Button>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
      <Divider />
      <Title level={4}>Overview</Title>
      <Text>{product.description || "No description available."}</Text>
      <Divider />
      <div className=" flex flex-col gap-2">
        <div className="">
          <ProductSlider products={products} />
        </div>
      </div>
      {/* Overview Section */}
    </div>
  );
};

export default ProductPage;
