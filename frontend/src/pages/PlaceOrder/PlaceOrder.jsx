import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, API_URL, token, food_list, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    contactNumber: "",
  });

  const onChangeHandler = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];

    food_list.forEach((item) => {
        if (cartItems[item.id] > 0) {
            let orderInfo = { ...item, quantity: cartItems[item.id] };
            orderItems.push(orderInfo);
        }
    });

    let orderData = {
        token: token, // Include the token in the orderData
        items: orderItems,
        totalAmount: getTotalCartAmount() + 2.5,
        address: data, // Use "address" instead of "deliveryInfo"
    };

    try {
        console.log("Order data being sent:", orderData);
        let response = await axios.post(`${API_URL}/api/order/place`, orderData, {
            headers: { token: token },
        });

        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
            alert("Order placed successfully");
        } else {
            alert("Order failed");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        alert("Order failed");
    }
};


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First Name"
          />
          <input
            type="text"
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last Name"
          />
        </div>
        <input
          type="email"
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Email Address"
        />
        <input
          type="text"
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            type="text"
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            placeholder="City"
          />
          <input
            type="text"
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            required
            name="pinCode"
            onChange={onChangeHandler}
            value={data.pinCode}
            placeholder="Pin Code"
          />
          <input
            type="text"
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          type="text"
          required
          name="contactNumber"
          onChange={onChangeHandler}
          value={data.contactNumber}
          placeholder="Contact Number"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() ? 2.5 : 0}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Total Amount</p>
              <p>${getTotalCartAmount() ? getTotalCartAmount() + 2.5 : 0}</p>
            </div>
          </div>

          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
