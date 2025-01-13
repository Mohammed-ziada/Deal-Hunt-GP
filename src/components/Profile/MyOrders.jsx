// import { Card, Avatar, Typography, Button, List } from "antd";
// import { RightOutlined } from "@ant-design/icons";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";

// const { Text } = Typography;

// const MyOrders = () => {
//   const orderItems = [
//     {
//       title:
//         "iPhone 15 Pro Max 512GB Natural Titanium 5G With FaceTime - Middle East Version",
//       description: "Blue Titanium - 512GB - Middle Eastern Version",
//       quantity: 2,
//     },
//     {
//       title:
//         "iPhone 15 Pro Max 512GB Natural Titanium 5G With FaceTime - Middle East Version",
//       description: "Blue Titanium - 512GB - Middle Eastern Version",
//       quantity: 2,
//     },
//   ];
//   return (
//     <Card
//       title={
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <span>My Orders</span>
//           <Link to={"/me/myorders"}>See All</Link>
//         </div>
//       }
//       style={{ marginTop: 16 }}
//       className="container m-auto"
//     >
//       <Helmet>
//         <title> DealHunt - My Orders</title>
//       </Helmet>
//       <List
//         itemLayout="horizontal"
//         dataSource={orderItems}
//         renderItem={(item, index) => (
//           <List.Item>
//             <List.Item.Meta
//               avatar={
//                 <Avatar
//                   shape="square"
//                   size={64}
//                   src="https://placehold.co/64x64"
//                 />
//               }
//               title={item.title}
//               description={
//                 <div>
//                   <Text>{item.description}</Text>
//                   <Text>x{item.quantity}</Text>
//                 </div>
//               }
//             />
//             <div style={{ textAlign: "right" }}>
//               <Text type="success">Delivered</Text>
//               <Button type="link" icon={<RightOutlined />}>
//                 Order details
//               </Button>
//             </div>
//           </List.Item>
//         )}
//       />
//       {/* <Text type="secondary">+2 more items</Text> */}
//       <Text type="secondary" style={{ float: "right" }}>
//         {/* Order ID: 664678 */}
//       </Text>
//     </Card>
//   );
// };
// export default MyOrders;
import { Card, Avatar, Typography, Button, List } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { Text } = Typography;

const MyOrders = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Get userId from localStorage
  // const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user).id;
  console.log(userId);
  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/getallorders/${userId}`
        );
        setOrders(response.data); // Update the orders state with fetched data
        console.log(response);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    // Fetch orders when the component mounts
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>My Orders</span>
          <Link to={"/me/myorders"}>See All</Link>
        </div>
      }
      style={{ marginTop: 16 }}
      className="container m-auto"
    >
      <Helmet>
        <title>DealHunt - My Orders</title>
      </Helmet>
      <List
        itemLayout="horizontal"
        dataSource={orders}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size={64}
                  src="https://placehold.co/64x64"
                />
              }
              title={item.title}
              description={
                <div>
                  <Text>{item.description}</Text>
                  <Text>x{item.quantity}</Text>
                </div>
              }
            />
            <div style={{ textAlign: "right" }}>
              <Text type="success">Delivered</Text>
              <Button type="link" icon={<RightOutlined />}>
                Order details
              </Button>
            </div>
          </List.Item>
        )}
      />
      <Text type="secondary" style={{ float: "right" }}>
        {/* Order ID: 664678 */}
      </Text>
    </Card>
  );
};

export default MyOrders;
