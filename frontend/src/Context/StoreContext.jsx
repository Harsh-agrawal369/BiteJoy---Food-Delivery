import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  //We are using this as context because if we use a state in FoodItems it will create the state for each object individually
  const [cartItems, setCartItems] = useState({});

  const [token, setToken] = useState("");

  const [name, setName] = useState("");

  const addToCart = (itemId) => {
    // If there is not product of this type in cart, we add it to out list
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((Product) => Product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
      setName(localStorage.getItem("name"));
      setToken(localStorage.getItem("token"));
    }
  })

  const API_URL = "http://localhost:4000";

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
