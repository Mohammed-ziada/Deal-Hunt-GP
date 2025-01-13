import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // أول ما الـ component يتحمل، نجيب الكارت من الـ localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart); // لو فيه كارت مخزن، نخزنه في الـ state
    }
  }, []);

  // دالة لإضافة المنتج للكارت
  const addToCart = useCallback(async (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // نخزن الكارت في الـ localStorage
        return updatedCart;
      }
      const updatedCart = [...prevCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // نخزن الكارت في الـ localStorage
      return updatedCart;
    });
  }, []);

  // دالة لحذف منتج من الكارت
  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // نخزن الكارت في الـ localStorage
      return updatedCart;
    });
  }, []);

  // دالة لتحديث الكمية
  const updateQuantity = useCallback((id, quantity) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // نخزن الكارت في الـ localStorage
      return updatedCart;
    });
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
