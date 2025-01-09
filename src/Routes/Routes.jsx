import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import {
  Cart,
  CheckOut,
  Category,
  Home,
  NotFound,
  ProductPage,
  ProductPagec,
} from "./routes_Component.routes";
import ProfilePage from "../components/Profile/ProfilePage";
import MyOrders from "../components/Profile/MyOrders";
import PostProduct from "../components/MarketPlace/PostMarket";
// import Login from "../components/Auth/Login/Login";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AddProductsUser from "../pages/AddProductsUser";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <SignUpPage /> },
      { path: "cart", element: <Cart /> },
      { path: "category", element: <Category /> },
      { path: "checkOut", element: <CheckOut /> },
      { path: "product", element: <ProductPage /> },
      // product page
      { path: "product/:id", element: <ProductPage /> },
      { path: "productPage", element: <ProductPagec /> },
      { path: "addproduct", element: <AddProductsUser /> },
      { path: "me", element: <ProfilePage /> },
      { path: "me/myorders", element: <MyOrders /> },
      { path: "postProduct", element: <PostProduct /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default routes;
