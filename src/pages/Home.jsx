import { Layout, Row, Col, Spin } from "antd";
import MainSlider from "../components/MainSlider/MainSlider";
import ProductCard from "../components/ProductCard/ProductCard";
import CategorySlider from "../components/CategorySlider/CategorySlider";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion"; // استيراد Framer Motion
import Title from "antd/es/typography/Title";

const { Content } = Layout;

export default function Home() {
  const [data, setData] = useState([]);
  // const [categoryData, setCategoryData] = useState([]);
  const api = "http://127.0.0.1:8000/api/get/products";
  // const api2 = "http://127.0.0.1:8000/api/getallcategories";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const result = await response.json();
        console.log(result);
        const productsWithCategoryName = result.map((product) => {
          return {
            ...product,
          };
        });
        setData(productsWithCategoryName);
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };

    // fetchDataCAtegory();
    fetchData();
  }, []);
  console.log(data);

  // Variants for animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Layout>
      <Helmet>
        <title>DealHunt - Home</title>
      </Helmet>
      <Content className="">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 1 }}
          style={{ margin: 0, padding: 0 }}
        >
          <MainSlider />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          transition={{ duration: 1 }}
        >
          <CategorySlider />
        </motion.div>

        <div className="mt-4">
          <Title level={3} className="text-center">
            Featured Products
          </Title>
          <Row gap={"10px"} justify="start">
            {data.length > 0 ? (
              data.map((product) => {
                return (
                  <Col
                    key={product.name}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={5}
                    className="flex justify-center mb-3 gap-2 m-auto"
                  >
                    {console.log(product.id)}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={cardVariants}
                      transition={{ duration: 0.5, delay: product.id * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  </Col>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-[50vh] w-full">
                <Spin spinning={true} className="custom-color" size="large" />
              </div>
            )}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
