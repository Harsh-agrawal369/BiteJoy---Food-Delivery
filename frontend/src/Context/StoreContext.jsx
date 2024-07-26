import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const API_URL = "http://localhost:4000";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = (itemId) => {
    if (itemId) {  // Check if itemId is valid
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (!updatedCart[itemId]) {
          updatedCart[itemId] = 1;
        } else {
          updatedCart[itemId] += 1;
        }
        console.log("Cart Items after add:", updatedCart);
        return updatedCart;
      });
    } else {
      console.error("addToCart called with undefined itemId");
    }
  };

  const removeFromCart = (itemId) => {
    if (itemId) {  // Check if itemId is valid
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[itemId] > 1) {
          updatedCart[itemId] -= 1;
        } else {
          delete updatedCart[itemId];
        }
        return updatedCart;
      });
    } else {
      console.error("removeFromCart called with undefined itemId");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((Product) => Product.id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Item with id ${item} not found in food list.`);
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/food/list`);
      console.log("API Response:", response.data);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      console.log("Hello");
      if (localStorage.getItem("token")) {
        setName(localStorage.getItem("name"));
        setToken(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    API_URL,
    token,
    setToken,
    name,
    setName,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
