import { List, Button, Typography, Card, Avatar } from "antd";
import { CheckOutlined, CloseOutlined, SwapOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductImage from "../../assets/images/product.png";

const { Text } = Typography;

const SwapRequests = ({ swapRequests, onAction, products }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={swapRequests}
      renderItem={(item) => {
        const requestedProduct = products.find(
          (product) => product.id === item.requested_productid
        );
        const userProduct = products.find(
          (product) => product.id === item.requester_productid
        );

        return (
          <List.Item>
            <Card
              style={{
                width: "100%",
                borderRadius: "12px",
                border: "1px solid #f0f0f0",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px",
                backgroundColor: "#fff",
                padding: "20px",
              }}
            >
              <List.Item.Meta
                title={
                  <Text strong style={{ fontSize: "18px" }}>
                    Requested Product ID: {item.requested_productid}
                  </Text>
                }
                description={
                  <div>
                    <Text type="secondary">
                      {item.state === 0
                        ? "Pending"
                        : item.state === 1
                        ? "Accepted"
                        : "Rejected"}
                    </Text>
                  </div>
                }
              />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", flex: 1 }}
                  >
                    <Link to={`/product/${requestedProduct?.id}`}>
                      <Avatar
                        size={80}
                        src={requestedProduct?.picname || ProductImage}
                        style={{
                          borderRadius: "12px",
                          border: "2px solid #f0f0f0",
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: "15px",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {requestedProduct?.name}
                      </Text>
                    </Link>
                  </div>

                  <SwapOutlined
                    style={{
                      fontSize: "36px",
                      color: "#e54666",
                      margin: "0 15px",
                    }}
                  />

                  <div
                    style={{ display: "flex", alignItems: "center", flex: 1 }}
                  >
                    <Link to={`/product/${userProduct?.id}`}>
                      <Avatar
                        size={80}
                        src={userProduct?.picname || ProductImage}
                        style={{
                          borderRadius: "12px",
                          border: "2px solid #f0f0f0",
                        }}
                      />
                      <Text
                        style={{
                          marginLeft: "15px",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {userProduct?.name}
                      </Text>
                    </Link>
                  </div>
                </div>

                {item.state === 0 && (
                  <div
                    style={{ display: "flex", gap: "15px", marginTop: "20px" }}
                  >
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={() => onAction(item.id, "accept")}
                      style={{
                        backgroundColor: "#52c41a",
                        borderColor: "#52c41a",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "10px 25px",
                        borderRadius: "25px",
                        boxShadow: "0 4px 10px rgba(82, 196, 26, 0.2)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      type="danger"
                      icon={<CloseOutlined />}
                      onClick={() => onAction(item.id, "reject")}
                      style={{
                        backgroundColor: "#f5222d",
                        borderColor: "#f5222d",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "10px 25px",
                        borderRadius: "25px",
                        boxShadow: "0 4px 10px rgba(245, 34, 45, 0.2)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </List.Item>
        );
      }}
    />
  );
};

export default SwapRequests;
