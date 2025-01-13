import { useState, useEffect } from "react";
import { Carousel, Row, Col, Typography } from "antd";
import ProductCard from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

const { Title } = Typography;

const ProductSlider = ({ products }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-slider-container">
      <Title level={4}>Frequently Bought with</Title>
      <Carousel
        autoplay
        className="p-4"
        dots={true}
        arrows={true}
        infinite={true}
        slidesToShow={4} // Default number of cards to display at a time
        responsive={[
          {
            breakpoint: 1200, // lg
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 992, // md
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768, // sm
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 576, // xs
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {products.map((product, idx) => (
          <Row key={idx} className="product-card p-3 mb-3">
            <Col xs={24} sm={24} md={24} lg={24}>
              <ProductCard product={product} />
            </Col>
          </Row>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductSlider;
ProductSlider.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subcategoryid: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    imagecover: PropTypes.string,
  }).isRequired,
};
