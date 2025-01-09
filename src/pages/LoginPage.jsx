import { Layout, Row, Col, Card, Typography } from "antd";
import Login from "../components/Auth/Login/Login";

const { Content } = Layout;
const { Title } = Typography;

export default function LoginPage() {
  return (
    <Layout style={{}}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <Card>
              <Title
                level={2}
                style={{ textAlign: "center", color: "#FF3B3B" }}
              >
                DealHunt
              </Title>
              <Login />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
