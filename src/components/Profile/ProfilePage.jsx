// import {
//   Layout,
//   Row,
//   Col,
//   Card,
//   Avatar,
//   Typography,
//   Button,
//   List,
//   theme,
//   Spin,
//   message,
// } from "antd";
// import {
//   ShoppingCartOutlined,
//   HeartOutlined,
//   EditOutlined,
//   RightOutlined,
// } from "@ant-design/icons";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import ProductImage from "../../assets/images/product.png";
// import profileImage from "../../assets/images/Car.png";

// const { Content } = Layout;
// const { Title, Text } = Typography;
// const { useToken } = theme;

// const ProfilePage = () => {
//   const { token } = useToken();
//   const [user, setUser] = useState(null); // Store user data
//   const [loading, setLoading] = useState(true); // Handle loading state

//   // Fetch logged-in user data from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // Parse and set user data
//       setLoading(false); // Stop loading
//     } else {
//       message.error("No user data found.");
//       setLoading(false);
//     }
//   }, []);

//   // Static values if some fields are missing
//   const favoriteItems = [
//     {
//       title: "Nike Air Force 1",
//       category: "Fashion & Beauty",
//       price: "620.00",
//     },
//   ];

//   const orderItems = [
//     {
//       title:
//         "iPhone 15 Pro Max 512GB Natural Titanium 5G With FaceTime - Middle East Version",
//       description: "Blue Titanium - 512GB - Middle Eastern Version",
//       quantity: 2,
//     },
//   ];

//   const addresses = user?.addresses?.length
//     ? user.addresses
//     : [
//         {
//           type: "Home",
//           address: "Static Address: 123 Cairo St, Cairo, Egypt",
//         },
//       ];

//   if (loading) {
//     return (
//       <div className="text-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   // Animation variants
//   const fadeInVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <Content className="p-6 bg-gray-100">
//       <Helmet>
//         <title>Profile</title>
//       </Helmet>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} md={8}>
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeInVariants}
//             transition={{ duration: 0.5 }}
//           >
//             <Card className="bg-white text-black" align="center">
//               <Avatar size={200} src={profileImage} />
//               <div className="flex flex-col items-center gap-3">
//                 <Title level={4} style={{ margin: 0 }}>
//                   {user?.name || "User Name"}
//                 </Title>
//                 <Text type="secondary">{user?.email || "Email"}</Text>
//                 <Text type="secondary">{user?.phone || "Phone number"}</Text>
//                 <Text type="secondary">
//                   {user?.created_at
//                     ? `Joined ${new Date(user.created_at).toLocaleDateString()}`
//                     : "Joined date"}
//                 </Text>
//               </div>
//               {/* <Button
//                 type="link"
//                 icon={<EditOutlined />}
//                 style={{ padding: 0, marginTop: token.padding }}
//               >
//                 Edit Details
//               </Button> */}
//             </Card>
//           </motion.div>
//         </Col>
//         <Col xs={24} md={16}>
//           <Row gutter={[16, 16]}>
//             <Col xs={24}>
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInVariants}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//               >
//                 <Card
//                   title={
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <span>Favourites</span>
//                       <a href="#">See All</a>
//                     </div>
//                   }
//                 >
//                   <Row gutter={[16, 16]}>
//                     {favoriteItems.map((item, index) => (
//                       <Col xs={24} sm={12} lg={8} key={index}>
//                         <Card
//                           hoverable
//                           cover={<img alt={item.title} src={ProductImage} />}
//                           actions={[
//                             <Button
//                               type="primary"
//                               icon={<ShoppingCartOutlined />}
//                             >
//                               Add to cart
//                             </Button>,
//                           ]}
//                         >
//                           <Card.Meta
//                             title={item.title}
//                             description={
//                               <div>
//                                 <Text type="secondary">{item.category}</Text>
//                                 <Text
//                                   strong
//                                   style={{ color: token.colorPrimary }}
//                                 >
//                                   {item.price} USD
//                                 </Text>
//                               </div>
//                             }
//                           />
//                           <HeartOutlined
//                             style={{
//                               position: "absolute",
//                               top: 10,
//                               right: 10,
//                               fontSize: 20,
//                             }}
//                           />
//                         </Card>
//                       </Col>
//                     ))}
//                   </Row>
//                 </Card>
//               </motion.div>
//             </Col>
//             <Col xs={24}>
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInVariants}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//               >
//                 <Card
//                   title={
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <span>My Orders</span>
//                       <Link to={"/me/myorders"}>See All</Link>
//                     </div>
//                   }
//                   style={{ marginTop: 16 }}
//                 >
//                   <List
//                     itemLayout="horizontal"
//                     dataSource={orderItems}
//                     renderItem={(item, index) => (
//                       <List.Item>
//                         <List.Item.Meta
//                           avatar={
//                             <Avatar
//                               shape="square"
//                               size={64}
//                               src={ProductImage}
//                             />
//                           }
//                           title={item.title}
//                           description={
//                             <div>
//                               <Text>{item.description}</Text>
//                               <Text>x{item.quantity}</Text>
//                             </div>
//                           }
//                         />
//                         <div style={{ textAlign: "right" }}>
//                           <Text type="success">Delivered</Text>
//                           <Button type="link" icon={<RightOutlined />}>
//                             Order details
//                           </Button>
//                         </div>
//                       </List.Item>
//                     )}
//                   />
//                 </Card>
//               </motion.div>
//             </Col>
//             <Col xs={24}>
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInVariants}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//               >
//                 <Card
//                   title={
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <span>Addresses</span>
//                       <Button type="link">Manage</Button>
//                     </div>
//                   }
//                   style={{ marginTop: 16 }}
//                 >
//                   <List
//                     itemLayout="horizontal"
//                     dataSource={addresses}
//                     renderItem={(item) => (
//                       <List.Item>
//                         <List.Item.Meta
//                           title={item.type}
//                           description={item.address}
//                         />
//                       </List.Item>
//                     )}
//                   />
//                 </Card>
//               </motion.div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Content>
//   );
// };

// export default ProfilePage;
// import {
//   Layout,
//   Row,
//   Col,
//   Card,
//   Avatar,
//   Typography,
//   Button,
//   List,
//   theme,
//   Spin,
//   message,
// } from "antd";
// import { Helmet } from "react-helmet";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import ProductImage from "../../assets/images/product.png";
// import profileImage from "../../assets/images/Car.png";

// const { Content } = Layout;
// const { Title, Text } = Typography;
// // const { useToken } = theme;

// const ProfilePage = () => {
//   // const { token } = useToken();
//   const [user, setUser] = useState(null); // Store user data
//   const [loading, setLoading] = useState(true); // Handle loading state
//   const [swapRequests, setSwapRequests] = useState([]); // Store swap requests
//   const token = localStorage.getItem("token");
//   // Fetch logged-in user data from localStorage
//   const storedUser = localStorage.getItem("user");
//   // console.log(JSON.parse(storedUser));
//   useEffect(() => {
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // Parse and set user data
//       setLoading(false); // Stop loading
//     } else {
//       message.error("No user data found.");
//       setLoading(false);
//     }
//   }, []);

//   // Fetch swap requests for the user
//   useEffect(() => {
//     const fetchSwapRequests = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/getAllswap", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await response.json();
//         if (response.ok) {
//           // Filter swap requests related to the user's products
//           const userSwapRequests = result.filter((request) => {
//             return request.requested_productid === user?.id; // تأكد إنهم متساويين
//           });

//           console.log("Test", userSwapRequests);

//           setSwapRequests(userSwapRequests); // Set swap requests to state
//         } else {
//           message.error(result.message || "Failed to fetch swap requests");
//         }
//       } catch (error) {
//         console.error("Error fetching swap requests:", error);
//         message.error("An error occurred while fetching swap requests.");
//       }
//     };

//     if (user) {
//       fetchSwapRequests();
//     }
//   }, [user]); // Re-run when user data changes

//   if (loading) {
//     return (
//       <div className="text-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   // Animation variants
//   const fadeInVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <Content className="p-6 bg-gray-100">
//       <Helmet>
//         <title>Profile</title>
//       </Helmet>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} md={8}>
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeInVariants}
//             transition={{ duration: 0.5 }}
//           >
//             <Card className="bg-white text-black" align="center">
//               <Avatar size={200} src={profileImage} />
//               <div className="flex flex-col items-center gap-3">
//                 <Title level={4} style={{ margin: 0 }}>
//                   {user?.name || "User Name"}
//                 </Title>
//                 <Text type="secondary">{user?.email || "Email"}</Text>
//                 <Text type="secondary">{user?.phone || "Phone number"}</Text>
//                 <Text type="secondary">
//                   {user?.created_at
//                     ? `Joined ${new Date(user.created_at).toLocaleDateString()}`
//                     : "Joined date"}
//                 </Text>
//               </div>
//             </Card>
//           </motion.div>
//         </Col>
//         <Col xs={24} md={16}>
//           <Row gutter={[16, 16]}>
//             <Col xs={24}>
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInVariants}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//               >
//                 <Card title="Swap Requests">
//                   <List
//                     itemLayout="horizontal"
//                     dataSource={swapRequests}
//                     renderItem={(item) => (
//                       <List.Item>
//                         <List.Item.Meta
//                           title={`Requested Product ID: ${item.requested_productid}`}
//                           description={
//                             <div>
//                               <Text>
//                                 {item.state === 0 ? "Pending" : "Accepted"}
//                               </Text>
//                             </div>
//                           }
//                         />
//                       </List.Item>
//                     )}
//                   />
//                 </Card>
//               </motion.div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Content>
//   );
// };

// export default ProfilePage;

// ______________________ظ

// import {
//   Layout,
//   Row,
//   Col,
//   Card,
//   Avatar,
//   Typography,
//   List,
//   Spin,
//   message,
// } from "antd";
// import { Helmet } from "react-helmet";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import ProductImage from "../../assets/images/product.png";
// import profileImage from "../../assets/images/Car.png";

// const { Content } = Layout;
// const { Title, Text } = Typography;

// const ProfilePage = () => {
//   const [user, setUser] = useState(null); // Store user data
//   const [loading, setLoading] = useState(true); // Handle loading state
//   const [swapRequests, setSwapRequests] = useState([]); // Store swap requests
//   const [products, setProducts] = useState([]); // Store all products
//   const token = localStorage.getItem("token");
//   const storedUser = localStorage.getItem("user");

//   useEffect(() => {
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // Parse and set user data
//       setLoading(false); // Stop loading
//     } else {
//       message.error("No user data found.");
//       setLoading(false);
//     }
//   }, []);

//   // Fetch all products (this is necessary to compare requested_productid with user id)
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/get/products", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await response.json();

//         if (response.ok) {
//           setProducts(result); // Store products data
//         } else {
//           message.error(result.message || "Failed to fetch products");
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         message.error("An error occurred while fetching products.");
//       }
//     };

//     fetchProducts();
//   }, [token]);

//   // Fetch swap requests for the user
//   useEffect(() => {
//     const fetchSwapRequests = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/getAllswap", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await response.json();

//         if (response.ok) {
//           // Filter swap requests based on the requested_productid and user id
//           const userSwapRequests = result.filter((request) => {
//             // Get the product corresponding to requested_productid
//             const product = products.find(
//               (prod) => prod.id === request.requested_productid
//             );
//             return product?.userid === user?.id; // Compare product's userid with user's id
//           });

//           setSwapRequests(userSwapRequests); // Set filtered swap requests to state
//         } else {
//           message.error(result.message || "Failed to fetch swap requests");
//         }
//       } catch (error) {
//         console.error("Error fetching swap requests:", error);
//         message.error("An error occurred while fetching swap requests.");
//       }
//     };

//     if (user && products.length > 0) {
//       fetchSwapRequests();
//     }
//   }, [user, products]); // Re-run when user or products change

//   if (loading) {
//     return (
//       <div className="text-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   // Animation variants
//   const fadeInVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <Content className="p-6 bg-gray-100">
//       <Helmet>
//         <title>Profile</title>
//       </Helmet>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} md={8}>
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeInVariants}
//             transition={{ duration: 0.5 }}
//           >
//             <Card className="bg-white text-black" align="center">
//               <Avatar size={200} src={profileImage} />
//               <div className="flex flex-col items-center gap-3">
//                 <Title level={4} style={{ margin: 0 }}>
//                   {user?.name || "User Name"}
//                 </Title>
//                 <Text type="secondary">{user?.email || "Email"}</Text>
//                 <Text type="secondary">{user?.phone || "Phone number"}</Text>
//                 <Text type="secondary">
//                   {user?.created_at
//                     ? `Joined ${new Date(user.created_at).toLocaleDateString()}`
//                     : "Joined date"}
//                 </Text>
//               </div>
//             </Card>
//           </motion.div>
//         </Col>
//         <Col xs={24} md={16}>
//           <Row gutter={[16, 16]}>
//             <Col xs={24}>
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInVariants}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//               >
//                 <Card title="Swap Requests">
//                   <List
//                     itemLayout="horizontal"
//                     dataSource={swapRequests}
//                     renderItem={(item) => (
//                       <List.Item>
//                         <List.Item.Meta
//                           title={`Requested Product ID: ${item.requested_productid}`}
//                           description={
//                             <div>
//                               <Text>
//                                 {item.state === 0 ? "Pending" : "Accepted"}
//                               </Text>
//                             </div>
//                           }
//                         />
//                       </List.Item>
//                     )}
//                   />
//                 </Card>
//               </motion.div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Content>
//   );
// };

// export default ProfilePage;
// __________________________________________
// import {
//   Layout,
//   Row,
//   Col,
//   Card,
//   Avatar,
//   Typography,
//   List,
//   Button,
//   Spin,
//   message,
// } from "antd";
// import { Helmet } from "react-helmet";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// // import ProductImage from "../../assets/images/product.png";
// import profileImage from "../../assets/images/Car.png";

// const { Content } = Layout;
// const { Title, Text } = Typography;

// const ProfilePage = () => {
//   const [user, setUser] = useState(null); // Store user data
//   const [loading, setLoading] = useState(true); // Handle loading state
//   const [swapRequests, setSwapRequests] = useState([]); // Store swap requests
//   const [products, setProducts] = useState([]); // Store all products
//   const token = localStorage.getItem("token");
//   const storedUser = localStorage.getItem("user");

//   useEffect(() => {
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // Parse and set user data
//       setLoading(false); // Stop loading
//     } else {
//       message.error("No user data found.");
//       setLoading(false);
//     }
//   }, []);

//   // Fetch all products (this is necessary to compare requested_productid with user id)
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/get/products", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await response.json();

//         if (response.ok) {
//           setProducts(result); // Store products data
//         } else {
//           message.error(result.message || "Failed to fetch products");
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         message.error("An error occurred while fetching products.");
//       }
//     };

//     fetchProducts();
//   }, [token]);

//   // Fetch swap requests for the user
//   useEffect(() => {
//     const fetchSwapRequests = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/getAllswap", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await response.json();

//         if (response.ok) {
//           // Filter swap requests based on the requested_productid and user id
//           const userSwapRequests = result.filter((request) => {
//             // Get the product corresponding to requested_productid
//             const product = products.find(
//               (prod) => prod.id === request.requested_productid
//             );
//             return product?.userid === user?.id; // Compare product's userid with user's id
//           });

//           setSwapRequests(userSwapRequests); // Set filtered swap requests to state
//         } else {
//           message.error(result.message || "Failed to fetch swap requests");
//         }
//       } catch (error) {
//         console.error("Error fetching swap requests:", error);
//         message.error("An error occurred while fetching swap requests.");
//       }
//     };

//     if (user && products.length > 0) {
//       fetchSwapRequests();
//     }
//   }, [user, products]); // Re-run when user or products change

//   // Function to accept or reject a swap request
//   const handleRequestAction1 = async (requestId, action) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/acceptswap/${requestId}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             state: action === "accept" ? 1 : 2, // 1 = accepted, 2 = rejected
//           }),
//         }
//       );
//       const result = await response.json();
//       if (response.ok) {
//         message.success(
//           `Request ${
//             action === "accept" ? "accepted" : "rejected"
//           } successfully.`
//         );
//         // Refresh swap requests after action
//         setSwapRequests(swapRequests.filter((req) => req.id !== requestId));
//       } else {
//         message.error(result.message || "Failed to update swap request.");
//       }
//     } catch (error) {
//       console.error("Error updating swap request:", error);
//       message.error("An error occurred while updating the swap request.");
//     }
//   };
//   const handleRequestAction = async (requestId, action) => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/acceptswap/${requestId}?action=${action}`,
//         {
//           method: "GET", // Change to GET method
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const result = await response.json();
//       if (response.ok) {
//         message.success(
//           `Request ${
//             action === "accept" ? "accepted" : "rejected"
//           } successfully.`
//         );
//         // Refresh swap requests after action
//         setSwapRequests(swapRequests.filter((req) => req.id !== requestId));
//       } else {
//         message.error(result.message || "Failed to update swap request.");
//       }
//     } catch (error) {
//       console.error("Error updating swap request:", error);
//       message.error("An error occurred while updating the swap request.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   // Animation variants
//   const fadeInVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <Content className="p-6 bg-gray-100">
//       <Helmet>
//         <title>Profile</title>
//       </Helmet>
//       <Row gutter={[16, 16]}>
//         <Col xs={24} md={8}>
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeInVariants}
//             transition={{ duration: 0.5 }}
//           >
//             <Card className="bg-white text-black" align="center">
//               <Avatar size={200} src={profileImage} />
//               <div className="flex flex-col items-center gap-3">
//                 <Title level={4} style={{ margin: 0 }}>
//                   {user?.name || "User Name"}
//                 </Title>
//                 <Text type="secondary">{user?.email || "Email"}</Text>
//                 <Text type="secondary">{user?.phone || "Phone number"}</Text>
//                 <Text type="secondary">
//                   {user?.created_at
//                     ? `Joined ${new Date(user.created_at).toLocaleDateString()}`
//                     : "Joined date"}
//                 </Text>
//               </div>
//             </Card>
//           </motion.div>
//         </Col>
//         <Col xs={24} md={16}>
//           <Row gutter={[16, 16]}>
//             <Col xs={24}>
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInVariants}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//               >
//                 <Card title="Swap Requests">
//                   <List
//                     itemLayout="horizontal"
//                     dataSource={swapRequests}
//                     renderItem={(item) => (
//                       <List.Item>
//                         <List.Item.Meta
//                           title={`Requested Product ID: ${item.requested_productid}`}
//                           description={
//                             <div>
//                               <Text>
//                                 {item.state === 0
//                                   ? "Pending"
//                                   : item.state === 1
//                                   ? "Accepted"
//                                   : "Rejected"}
//                               </Text>
//                             </div>
//                           }
//                         />
//                         <div>
//                           {item.state === 0 && (
//                             <div>
//                               <Button
//                                 type="primary"
//                                 onClick={() =>
//                                   handleRequestAction(item.id, "accept")
//                                 }
//                                 style={{ marginRight: 10 }}
//                               >
//                                 Accept
//                               </Button>
//                               <Button
//                                 type="danger"
//                                 onClick={() =>
//                                   handleRequestAction(item.id, "reject")
//                                 }
//                               >
//                                 Reject
//                               </Button>
//                             </div>
//                           )}
//                         </div>
//                       </List.Item>
//                     )}
//                   />
//                 </Card>
//               </motion.div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Content>
//   );
// };

// export default ProfilePage;
// _____________________________

// ProfilePage.js
import React, { useEffect, useState } from "react";
import { Layout, Row, Col, message } from "antd";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import SwapRequests from "./SwapRequests";
import LoadingSpinner from "./LoadingSpinner";
import { fetchProducts, fetchSwapRequests, handleRequestAction } from "./app";
// ProfilePage.js
// import { Row, Col, message } from "antd";
// import { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import { motion } from "framer-motion";
// import ProfileCard from "./ProfileCard";
// import SwapRequests from "./SwapRequests";
// import LoadingSpinner from "./LoadingSpinner";
// import { fetchProducts, fetchSwapRequests, handleRequestAction } from "./app";

const { Content } = Layout;

const ProfilePage = () => {
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Handle loading state
  const [swapRequests, setSwapRequests] = useState([]); // Store swap requests
  const [products, setProducts] = useState([]); // Store all products
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data
      setLoading(false); // Stop loading
    } else {
      message.error("No user data found.");
      setLoading(false);
    }
  }, []);

  // Fetch swap requests and products for the user
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts(token);
      const fetchedSwapRequests = await fetchSwapRequests(token);

      if (fetchedProducts && fetchedSwapRequests) {
        setProducts(fetchedProducts);

        // Filter swap requests that are not sent by the user
        const filteredSwapRequests = fetchedSwapRequests.filter((request) => {
          const product = fetchedProducts.find(
            (prod) => prod.id === request.requested_productid
          );
          return product?.userid !== user?.id;
        });
        setSwapRequests(filteredSwapRequests);
      } else {
        message.error("Error fetching data.");
      }
      setLoading(false);
    };

    if (user && token) {
      fetchData();
    }
  }, [user, token]);

  const handleAction = async (requestId, action) => {
    const result = await handleRequestAction(requestId, action, token);
    if (result) {
      message.success(
        `Request ${action === "accept" ? "accepted" : "rejected"} successfully.`
      );
      setSwapRequests(swapRequests.filter((req) => req.id !== requestId));
    } else {
      message.error("Failed to update swap request.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Content className="p-6 bg-gray-100">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <ProfileCard user={user} />
          </motion.div>
        </Col>
        <Col xs={24} md={16}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SwapRequests
              swapRequests={swapRequests}
              onAction={handleAction}
              products={products}
            />
          </motion.div>
        </Col>
      </Row>
    </Content>
  );
};

export default ProfilePage;
