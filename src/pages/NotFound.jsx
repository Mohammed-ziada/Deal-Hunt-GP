import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import CButton from "../components/shared/CustomButton";
import { Helmet } from "react-helmet";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <>
    <Helmet>
        <title>DealHunt - Not Found</title>
    </Helmet>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited In Maintance"
      extra={<CButton onClick={handleBackHome}>Back to Home</CButton>}
    />
    </>
  );
};

export default NotFound;
