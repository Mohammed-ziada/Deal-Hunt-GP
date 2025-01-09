import { ThunderboltOutlined } from "@ant-design/icons";
import { useCart } from "../../app/CartContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, Col, Button } from "antd";
// import React from "react";
import productImage from "../../assets/images/product.png";
export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Col xs={24} sm={24} md={24} lg={24}>
      <Card
        className=" rounded-3xl "
        hoverable
        cover={
          <Link to={`/product/${product.id}`} className=" pt-6 pb-6 pr-5 pl-5 ">
            <img
              src={productImage}
              // src={product.imagecover}
              alt={product.name}
              className="w-full   bg-cover rounded-3xl   "
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
              <div className="text-sm text-gray-500">
                {product.subcategoryid}
              </div>
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
        {/* <HeartOutlined
          style={{
            position: "absolute",
            top: 230,
            right: 27,
            fontSize: 20,
            backgroundColor: "#000",
            color: "#fff",
            padding: 5,
            borderRadius: "30%",
          }}
        /> */}
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
    imagecover: PropTypes.string,
  }).isRequired,
};
