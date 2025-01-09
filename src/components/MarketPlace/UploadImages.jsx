import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd";
import PropTypes from "prop-types";

const UploadImages = ({ images, setImages }) => {
  const handleImageChange = (info) => {
    console.log("handleImageChange called with info:", info);
    const files = info.fileList
      .map((file) => file.originFileObj)
      .filter(Boolean);

    console.log("Files to be processed:", files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        console.log("File read successfully:", file.name);
        // Avoid adding duplicate images by checking if they already exist in the state
        setImages((prevImages) => {
          if (!prevImages.includes(reader.result)) {
            console.log("Adding new image to state:", reader.result);
            return [...prevImages, reader.result];
          }
          console.log("Image already exists in state:", reader.result);
          return prevImages;
        });
      };

      reader.onerror = () => {
        console.error("Failed to read the file:", file.name);
      };

      reader.readAsDataURL(file);
    });

    // Clear fileList to avoid reprocessing old files
    info.fileList = [];
    console.log("Cleared fileList:", info.fileList);
    console.log("Current images state:", images);
  };

  const handleDeleteImage = (index) => {
    console.log("handleDeleteImage called with index:", index);
    setImages((prevImages) => {
      const newImages = [...prevImages]; // Create a shallow copy
      newImages.splice(index, 1); // Remove the item at the specified index
      console.log("Updated images state after deletion:", newImages);
      return newImages; // Update the state with the modified array
    });
  };

  const handleDeleteAll = () => {
    console.log("handleDeleteAll called");
    setImages([]); // Clear all images
    console.log("All images deleted, current state:", images);
  };

  return (
    <div>
      {/* Upload Button */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Upload
            accept="image/*"
            multiple
            onChange={handleImageChange}
            showUploadList={false} // Hide default upload list
          >
            <Button icon={<UploadOutlined />}>Upload Images</Button>
          </Upload>
        </Col>

        {/* Delete All Button */}
        {images.length > 0 && (
          <Col xs={24} md={8}>
            <Button
              type="primary"
              danger
              onClick={handleDeleteAll}
              style={{ marginTop: "16px" }}
            >
              Delete All Images
            </Button>
          </Col>
        )}
      </Row>

      {/* Display uploaded images */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        {images.map((image, index) => (
          <Col xs={24} md={8} key={index} style={{ position: "relative" }}>
            <img
              src={image}
              alt={`Uploaded Preview ${index}`}
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            />
            {/* Delete Button */}
            <Button
              type="primary"
              danger
              size="small"
              style={{ position: "absolute", top: 10, right: 10 }}
              onClick={() => handleDeleteImage(index)}
            >
              Delete
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};
UploadImages.propTypes = {
  images: PropTypes.array.isRequired,
  setImages: PropTypes.func.isRequired,
};

export default UploadImages;
