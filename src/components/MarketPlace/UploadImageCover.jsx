import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload, message } from "antd";
import PropTypes from "prop-types";

const UploadImageCover = ({ imageCover, setImageCover }) => {
  const handleImageCoverChange = (info) => {
    if (!info.file) {
      message.error("No file selected.");
      return;
    }

    const file = info.file.originFileObj;

    if (!file) {
      message.error("No file selected.");
      return;
    }

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      message.error("Please upload a valid image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      message.error("Image size must be less than 2MB.");
      return;
    }

    setImageCover(file);
    message.success("Image cover selected successfully!");
  };

  const handleDeleteImageCover = () => {
    setImageCover(null);
    message.success("Image cover removed.");
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Upload
            accept="image/*"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageCoverChange}
          >
            <Button icon={<UploadOutlined />}>Upload Image Cover</Button>
          </Upload>
        </Col>

        {imageCover && (
          <Col xs={24} md={8}>
            <Button
              type="primary"
              danger
              onClick={handleDeleteImageCover}
              style={{ marginTop: "16px" }}
            >
              Remove Image Cover
            </Button>
          </Col>
        )}
      </Row>

      {imageCover && (
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          <Col xs={24} md={8} style={{ position: "relative" }}>
            <img
              src={URL.createObjectURL(imageCover)}
              alt="Uploaded Image Cover"
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

UploadImageCover.propTypes = {
  imageCover: PropTypes.object,
  setImageCover: PropTypes.func.isRequired,
};

export default UploadImageCover;
