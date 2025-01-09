import { useEffect, useState } from "react";
import logo from "../../assets/images/Logo.svg";
import SearchBox from "./SearchBox";
import { Button, Col, Menu, Row, Drawer, Badge, Dropdown, Avatar } from "antd";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// import Registration from "./../../pages/Regestraion";
import { Link } from "react-router-dom";
import { useCart } from "../../app/CartContext";

export default function Navbar() {
  const { cart } = useCart(); // Access cart state from context
  const [category, setCategory] = useState([]);

  const api = "http://127.0.0.1:8000/api/getallcategories";

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        console.log(token);
        const response = await fetch(api, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the headers
          },
        });
        const result = await response.json();
        console.log(result);
        setCategory(result);
      } catch (error) {
        console.error("Error Fetching Category", error);
      }
    };
    fetchCategory();
  }, []);

  const [current, setCurrent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  // Check if the user is logged in by checking for the token
  const token = localStorage.getItem("token");

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Refresh the page to update the UI
  };

  // User profile menu items
  const profileMenu = (
    <Menu className="text-ruby-12">
      <Menu.Item>
        <Link to="/me">My Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/me/myorders">My Orders</Link>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>Log Out</Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <Row align="middle" justify="space-between" className="py-2 px-4 sm:px-6">
        {/* Left - Logo */}
        <Col xs={6} sm={4} md={3} className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-5" />
          </Link>
        </Col>

        {/* Center - Menu Items */}
        <Col xs={0} sm={16} md={14} className="hidden sm:flex justify-center">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={[
              {
                key: "home",
                label: (
                  <Link to="/" className="text-sm  text-ruby-12  ">
                    Home
                  </Link>
                ),
              },
              ...(category
                ? category.map((categ) => ({
                    key: categ._id, // Assuming each category has a unique `_id` field
                    label: (
                      <Link to={`/category/`} className="text-sm text-ruby-12">
                        {categ.catogoryname}
                      </Link>
                    ),
                  }))
                : []),
            ]}
            className="border-none w-full justify-center"
          />
        </Col>

        {/* Right - Icons and Login */}
        <Col
          xs={6}
          sm={4}
          md={3}
          className="flex items-center justify-end space-x-4"
        >
          {/* Cart Icon with Badge */}
          <Link to="/cart">
            <Badge count={cart.length} showZero>
              <ShoppingCartOutlined className="text-gray-500 text-lg hidden sm:block hover:text-black duration-300" />
            </Badge>
          </Link>

          {/* User Profile or Login Button */}
          {token ? (
            // If user is logged in, show profile menu
            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <Avatar
                className="cursor-pointer"
                size="large"
                icon={
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Profile"
                  />
                }
              />
            </Dropdown>
          ) : (
            // If not logged in, show the login button
            <Link to="/login">
              <Button
                type="link"
                className="text-ruby-12 text-sm hidden sm:block"
              >
                Log in
              </Button>
            </Link>
          )}

          {/* Mobile Menu Icon */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            className="block sm:hidden text-lg"
            onClick={showDrawer}
          />
        </Col>
      </Row>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={250}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={
            category
              ? category.map((categ) => ({
                  ...categ,
                  label: <span className="text-sm">{categ.catogoryname}</span>,
                }))
              : []
          }
        />

        <div className="mt-4 flex justify-between items-center">
          {/* Cart Icon in Drawer with Badge */}
          <Link to="/cart">
            <Badge count={cart.length} showZero>
              <ShoppingCartOutlined style={{ fontSize: "24px" }} />
            </Badge>
          </Link>

          <Button
            type="link"
            className="text-red-600 text-sm"
            onClick={showModal}
          >
            Log in
          </Button>
        </div>
      </Drawer>

      {/* Login Modal
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Registration />
      </Modal> */}

      {/* Search Box below Navbar */}
      <SearchBox />
    </div>
  );
}
