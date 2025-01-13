import { useState, useEffect } from "react";
import { Select, Input, Button, Card, Row, Col } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "../shared/Modal";
import { CheckCircle, XCircle } from "lucide-react";

export default function SwapPage() {
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct; // Ensure the product data exists

  const [userProducts, setUserProducts] = useState([]);
  const [selectedSwapProductId, setSelectedSwapProductId] = useState(null);
  const [swapPrice, setSwapPrice] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [productOwnerName, setProductOwnerName] = useState(""); // To store product owner name
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProduct) {
      navigate("/"); // If no product data, go back to the home page
    }
  }, [selectedProduct, navigate]);

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/getallusers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const users = await response.json();

        // Find the product owner by matching user id
        const owner = users.find((user) => user.id === selectedProduct.userid);
        if (owner) {
          setProductOwnerName(owner.name); // Set the owner name if found
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [selectedProduct, token]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        console.error("User not found in localStorage");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/get/products");
        if (!response.ok) {
          throw new Error("Failed to fetch user products");
        }
        const products = await response.json();
        const filteredProducts = products.filter(
          (item) => item.userid === user.id && item.id !== selectedProduct.id
        );
        setUserProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchUserProducts();
  }, [selectedProduct]);

  const handleSwap = async () => {
    if (!selectedSwapProductId & !swapPrice) {
      //   alert("You must select a product and price to complete the swap!");
      setModalMessage(
        <div className="flex flex-col items-center">
          <XCircle className="text-red-500 w-12 h-12 mb-4" />
          <span className="text-center">
            You must select a product and price to complete the swap!
          </span>
        </div>
      );
      setIsModalVisible(true);
      return;
    } else if (!selectedSwapProductId) {
      setModalMessage(
        <div className="flex flex-col items-center">
          <XCircle className="text-red-500 w-12 h-12 mb-4" />
          <span className="text-center">
            You must select a product complete the swap!
          </span>
        </div>
      );
      setIsModalVisible(true);
      return;
    } else if (!swapPrice) {
      setModalMessage(
        <div className="flex flex-col items-center">
          <XCircle className="text-red-500 w-12 h-12 mb-4" />
          <span className="text-center">
            You must put a Price to complete the swap!
          </span>
        </div>
      );
      setIsModalVisible(true);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/storeswap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requester_productid: selectedProduct.id,
          requested_productid: selectedSwapProductId,
          price: swapPrice,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to swap");
      }

      setModalMessage(
        // Display success message with product owner's name
        <div className="flex flex-col items-center">
          <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
          <span className="text-center">
            Swap request successfully sent to the Product owner:{" "}
            {productOwnerName}
          </span>
        </div>
      );
      setIsModalVisible(true);
    } catch (error) {
      // setModalMessage(
      //     // Display success message with product owner's name
      //     <div className="flex flex-col items-center">
      //       <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
      //       <span className="text-center">
      //         Swap request successfully sent to the Product owner:{" "}
      //         {productOwnerName}
      //       </span>
      //     </div>
      //   );
      console.error("Error swapping:", error);
      alert("An error occurred while swapping!");
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate("/"); // Go back to the home page
  };

  return (
    <div className="swap-page">
      {/* Hero Banner */}
      <div
        className="hero-banner relative text-white text-center py-20"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1920x1080')`, // Replace with your desired background image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
        {/* Overlay */}
        <h1 className="text-5xl font-bold z-10 relative">Swap Your Products</h1>
        <p className="text-xl z-10 relative">
          Easily exchange your items with others
        </p>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-8">
        <Row gutter={16}>
          <Col span={12}>
            {/* Selected Product */}
            <h2 className="text-xl font-bold mb-4">Selected Product</h2>
            <Card
              hoverable
              cover={
                <img
                  src={selectedProduct.picname || "/placeholder.png"}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover"
                />
              }
            >
              <Card.Meta
                title={selectedProduct.name}
                description={
                  <div>
                    <p className="text-gray-500">
                      {selectedProduct.description}
                    </p>
                    <p className="text-red-500 font-bold text-xl">
                      {selectedProduct.price} EGP
                    </p>
                  </div>
                }
              />
            </Card>
          </Col>

          <Col span={12}>
            {/* Select Swap Product */}
            <h2 className="text-xl font-bold mb-4">Choose Product to Swap</h2>
            <Select
              placeholder="Select your product for swap"
              className="w-full mb-4"
              onChange={(value) => setSelectedSwapProductId(value)}
            >
              {userProducts.map((product) => (
                <Select.Option key={product.id} value={product.id}>
                  {product.name} - {product.price} EGP
                </Select.Option>
              ))}
            </Select>

            {/* Set Swap Price */}
            <h2 className="text-xl font-bold mb-4">Set the Price</h2>
            <Input
              placeholder="Enter the price"
              type="number"
              value={swapPrice}
              onChange={(e) => setSwapPrice(e.target.value)}
              className="mb-4"
            />

            {/* Swap Button */}
            <Button
              type="primary"
              className="bg-red-500 hover:bg-red-600 text-white w-full"
              onClick={handleSwap}
            >
              Swap
            </Button>
          </Col>
        </Row>
      </div>

      {/* Modal Component */}
      <Modal
        modalContent={modalMessage}
        setModalVisible={setIsModalVisible}
        modalVisible={isModalVisible}
        onOk={handleModalOk}
      />
    </div>
  );
}

SwapPage.propTypes = {
  selectedProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    picname: PropTypes.string,
    description: PropTypes.string,
    userid: PropTypes.number.isRequired, // Ensure the product has a userid property
  }).isRequired,
};
