'use client';

import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';
import HeaderM from '../components/HeaderM';
import Footer from '../components/Footer';

export default function dashboard() {
    const [orders, setOrders] = useState([]); // State to store fetched orders

    useEffect(() => {
        // Fetch orders from the API
        fetch('/api/getOrders')
            .then((res) => res.json())
            .then((data) => {
                setOrders(data); // Set orders data to state
            })
    }, []);

    return (
        <div className="dashboard">
            <HeaderM />
            <main className="content">
                <h1>Order Details</h1>
                    <div>
                        {orders.map((order) => (
                            <div key={order._id} className="order-card">
                                <h2>Order ID: {order._id}</h2>
                                <p><strong>Email:</strong> {order.email}</p>
                                <p><strong>Order Date:</strong> {new Date(order.OrderDate).toLocaleString()}</p>
                                <h3>Items:</h3>
                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            <p><strong>Item:</strong> {item.item}</p>
                                            <p><strong>Price:</strong> {item.price}</p>
                                            
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Total:</strong> {order.total}</p>
                            </div>
                        ))}
                    </div>
            </main>
            <Footer />
        </div>
    );
}
