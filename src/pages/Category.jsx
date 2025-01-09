import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import Filter from "../components/FilterSidebar/Filter";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion"; // استيراد Framer Motion

export default function Category() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const api = "http://127.0.0.1:8000/api/get/products";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error Fetching Data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApply = (
    [minPrice = 0, maxPrice = 2999],
    minRating = 0,
    inStock = "In Stock",
    timeRange = "all_time",
    category = "all"
  ) => {
    const currentTime = new Date();

    const newFilteredData = data.filter((product) => {
      const productDate = new Date(product.updated_at);
      const isWithinTimeRange = (() => {
        switch (timeRange) {
          case 7:
            return (currentTime - productDate) / (1000 * 60 * 60 * 24) <= 7;
          case 30:
            return (currentTime - productDate) / (1000 * 60 * 60 * 24) <= 30;
          case 90:
            return (currentTime - productDate) / (1000 * 60 * 60 * 24) <= 90;
          case "all_time":
          default:
            return true;
        }
      })();

      return (
        (minPrice === 0 || parseFloat(product.price) >= minPrice) &&
        (maxPrice === 0 || parseFloat(product.price) <= maxPrice) &&
        (minRating === 0 || product.ratingsQuantity >= minRating) &&
        (inStock === "" || inStock === "In Stock"
          ? product.quantity > 0
          : true) &&
        (category === "all" || product.subcategoryid === category) &&
        isWithinTimeRange
      );
    });

    setFilteredData(newFilteredData);
  };

  const handleReset = () => {
    setFilteredData(data);
  };

  // Sidebar animation variants
  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  // Product card animation
  const productCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 justify-center">
      <Helmet>
        <title>DealHunt - Category</title>
      </Helmet>

      {/* Sidebar Button for Mobile */}
      <button
        className="lg:hidden bg-blue-500 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Filter" : "Open Filter"}
      </button>

      {/* Sidebar */}
      <motion.div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block col-span-12 lg:col-span-3 mb-6 lg:mb-0 p-4 shadow rounded-lg`}
        initial="hidden"
        animate={"visible"}
        variants={sidebarVariants}
        transition={{ duration: 0.5 }}
      >
        <Filter
          products={data}
          onApply={handleApply}
          onReset={handleReset}
          showApplyButton={false}
        />
      </motion.div>

      {/* Product Grid */}
      <div className="col-span-12  lg:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
          {isLoading ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Loading ...
            </motion.p>
          ) : filteredData.length > 0 ? (
            filteredData.map((product, index) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={productCardVariants}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1, // Add delay for stagger effect
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="flex flex-col items-center w-full gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ExclamationCircleOutlined
                style={{ fontSize: "90px", color: "#ddd" }}
                className="mb-2"
              />
              <p className="font-bold">No Products Found</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
