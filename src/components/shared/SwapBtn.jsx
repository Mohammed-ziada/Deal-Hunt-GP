import { Button } from "antd";
import { useNavigate } from "react-router-dom"; // Change this to useNavigate

const SwapButton = ({ userProducts, selectedProduct, onNavigate }) => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleSwap = () => {
    // Navigate to Swap Page
    navigate(onNavigate); // Use navigate instead of history.push
  };

  return (
    <Button type="primary" onClick={handleSwap}>
      Swap
    </Button>
  );
};

export default SwapButton;
