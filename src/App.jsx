import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes";
import { CartProvider } from "./app/CartContext";
import "./App.css";
function App() {
  return (
    <CartProvider>
      <RouterProvider router={routes} />
    </CartProvider>
  );
}

export default App;
