import { Layout, Row, Col, Spin } from "antd";
import MainSlider from "../components/MainSlider/MainSlider";
import ProductCard from "../components/ProductCard/ProductCard";
import CategorySlider from "../components/CategorySlider/CategorySlider";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

const { Content } = Layout;

export default function Home() {
  const [data, setData] = useState([]);
  const api = "http://127.0.0.1:8000/api/get/products";
  // const api2 = "https://dummyjson.com/products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const result = await response.json();
        const productsWithCategoryName = result.map((product) => {
          console.log(product);
          return {
            ...product,
            category: { name: product.subcategoryid }, // Ensure category is an object
          };
        });
        setData(productsWithCategoryName);
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <Layout>
      <Helmet>
        <title>DealHunt - Home</title>
      </Helmet>
      <Content className="">
        <div style={{ margin: 0, padding: 0 }}>
          <MainSlider />
        </div>
        <CategorySlider />
        <div className="mt-4">
          <Row gap={"10px"} justify="start">
            {data.length > 0 ? (
              data.map((product) => {
                return (
                  <Col
                    key={product.id}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={5}
                    className="flex justify-center mb-3 gap-2 m-auto"
                  >
                    <ProductCard product={product} />
                  </Col>
                );
              })
            ) : (
              <>
                <div className="flex justify-center items-center h-[50vh] w-full">
                  <Spin spinning={true} style={{ color: "red" }} size="large" />
                </div>
              </>
            )}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
