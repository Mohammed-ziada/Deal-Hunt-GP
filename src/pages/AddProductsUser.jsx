import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import { message } from "antd";
import PostProduct from "../components/MarketPlace/PostProduct";

const AddProductsUser = () => {
  const navigate = useNavigate(); // Updated hook

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("You must be logged in to access this page.");
      navigate("/login"); // Updated redirection
    }
  }, [navigate]);

  return (
    <div>
      <PostProduct />
    </div>
  );
};

export default AddProductsUser;
