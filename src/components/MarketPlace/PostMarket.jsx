import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
  InputNumber,
  Card,
  Typography,
  theme,
  message,
  Upload,
} from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import UploadImages from "./UploadImages";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { useToken } = theme;

const PostProduct = () => {
  const { token } = useToken();
  const [categories, setCategories] = useState([]); // State to store categories
  const [images, setImages] = useState([]); // State for uploaded images
  const [imageCover, setImageCover] = useState(null); // State for image cover

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://e-commerce-api-v1-cdk5.onrender.com/api/v1/categories/"
        );
        const result = await response.json();
        setCategories(result.data || []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        message.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const onFinish = async (values) => {
    console.log("Form submitted with values:", values);
    const { name, description, quantity, price, color, category } = values;

    // Validate that at least one image is uploaded
    if (images.length === 0) {
      message.error("Please upload at least one image.");
      console.log("No images uploaded, form submission aborted.");
      return;
    }

    // Validate that an image cover is uploaded
    if (!imageCover) {
      message.error("Please upload an image cover.");
      console.log("No image cover uploaded, form submission aborted.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("category", category);
    formData.append("imagecover", imageCover);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    // console.log("Product data to be sent:", formData);
    console.log("Product data to be sent:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await fetch(
        "https://e-commerce-api-v1-cdk5.onrender.com/api/v1/products/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the authorization header
          },
          body: formData,
        }
      );

      if (response.ok) {
        message.success("Product posted successfully!");
        console.log("Product posted successfully!");
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Failed to post the product.");
        console.error("Failed to post the product:", errorData);
      }
    } catch (error) {
      console.error("Error posting product:", error);
      message.error("An error occurred while posting the product.");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: token.colorBgContainer }}>
      <Content style={{ padding: token.paddingLG }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16} className="m-auto">
            <Form
              layout="vertical"
              style={{ width: "100%" }}
              onFinish={onFinish}
            >
              <Title level={4}>Basic Information</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      { required: true, message: "Please enter the name." },
                    ]}
                  >
                    <Input placeholder="Enter Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[
                      { required: true, message: "Please select a category." },
                    ]}
                  >
                    <Select placeholder="Select a category">
                      {categories.map((cat) => (
                        <Option key={cat._id} value={cat._id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter the description." },
                  {
                    min: 20,
                    message: "Description must be at least 20 characters long.",
                  }, // New validation rule
                ]}
              >
                <Input.TextArea rows={4} placeholder="Enter Description" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[
                      { required: true, message: "Please enter the quantity." },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      style={{ width: "100%" }}
                      placeholder="Enter Quantity"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                      { required: true, message: "Please enter the price." },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      style={{ width: "100%" }}
                      addonBefore="EGP"
                      placeholder="Enter Price"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="color"
                label="Color"
                rules={[{ required: true, message: "Please enter the color." }]}
              >
                <Input placeholder="Enter Color (e.g., Red, Blue)" />
              </Form.Item>

              <Title level={4}>Product Images</Title>
              <UploadImages images={images} setImages={setImages} />

              <Title level={4}>Image Cover</Title>
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={(file) => {
                  setImageCover(file);
                  console.log("Selected Image Cover:", file);
                  return false; // Prevent automatic upload
                }}
              >
                <Button>Upload Image Cover</Button>
              </Upload>

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

              <Card
                style={{
                  marginTop: token.marginMD,
                  background: token.colorInfoBg,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <BulbOutlined
                    style={{ fontSize: 24, marginRight: token.marginSM }}
                  />
                  <Text>
                    Tip: Use high-quality, well-lit images to showcase your
                    product&apos;s best features and attract more buyers.
                  </Text>
                </div>
              </Card>

              <Form.Item>
                <Button type="primary" size="large" block htmlType="submit">
                  Post Now
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default PostProduct;
