import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const boughtItems = JSON.parse(localStorage.getItem('BoughtItems')) || [];
        setCartItems(boughtItems);
    }, []);

    const handleRemove = (title) => {
        let boughtItems = JSON.parse(localStorage.getItem('BoughtItems')) || [];
        boughtItems = boughtItems.filter(item => item.title !== title);
        localStorage.setItem('BoughtItems', JSON.stringify(boughtItems));
        setCartItems(boughtItems);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    }

    return (
        <div>
            <h1>Cart</h1>
            <div className="d-flex justify-content-center align-items-center" style={{ position: 'absolute', top: '10.33%', width: '100%' }}>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td><button onClick={() => handleRemove(item.title)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;