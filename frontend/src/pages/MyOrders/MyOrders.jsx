import './MyOrders.css';
import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const { API_URL, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            let response = await axios.post(
                `${API_URL}/api/order/userOrders`,
                {},
                { headers: { token } }
            );
            console.log("Orders:", response.data);
            setData(response.data.orders);
        } catch (error) {
            console.error("Error in fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);  // Dependency array now includes token

    return (
        <div>
            {/* Render orders */}
        </div>
    );
};

export default MyOrders;
