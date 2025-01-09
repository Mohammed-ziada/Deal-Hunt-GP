import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Card,
  Rate,
  Typography,
  Divider,
  Badge,
  Tag,
  Space,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../../app/CartContext";

const { Title, Text } = Typography;

const ProductPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/get/products/${id}`
        );
        const result = await response.json();
        setProduct(result); // Assuming product data is in `result`
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: product.price, // Ensure correct price is passed
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Product Header */}
      <Row gutter={[16, 16]}>
        {/* Image Section */}
        <Col span={12}>
          <img
            src={product.imagecover || "fallback-image-url"} // Fallback image
            alt={product.name}
            className="w-full rounded-lg"
          />
          <Row gutter={[8, 8]} className="mt-4">
            {product.image?.map((img, idx) => (
              <Col span={4} key={idx}>
                <img
                  src={img || "fallback-image-url"} // Fallback for additional images
                  alt={`Thumbnail ${idx}`}
                  className="w-full rounded-lg cursor-pointer"
                />
              </Col>
            ))}
          </Row>
        </Col>

        {/* Product Details Section */}
        <Col span={12}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Badge.Ribbon
              text={product.quantity > 0 ? "In Stock" : "Out of Stock"}
              color={product.quantity > 0 ? "green" : "red"}
            >
              <Title level={4}>{product.name}</Title>
            </Badge.Ribbon>
            <Text strong>Brand: {product.category?.name || "N/A"}</Text>
            <Title level={3} style={{ color: "#e53935" }}>
              {product.price || "N/A"} EGP
              <small style={{ fontSize: "0.8em" }}> Including VAT</small>
            </Title>
            <Rate
              allowHalf
              disabled
              defaultValue={product.ratingsQuantity || 0}
            />
            <Text type="secondary">Fast Shipping · Get it by 11 Sep</Text>
            <Divider />
            <div>
              <Title level={5}>Color</Title>
              {product.color?.length > 0 ? (
                product.color.map((color, idx) => <Tag key={idx}>{color}</Tag>)
              ) : (
                <Text>No colors available</Text>
              )}
            </div>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              disabled={product.quantity === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Overview Section */}
      <Divider />
      <Title level={4}>Overview</Title>
      <Text>{product.description || "No description available."}</Text>
    </div>
  );
};

export default ProductPage;
