import React from 'react'

const Checkout = () => {
    const boughtItems = JSON.parse(localStorage.getItem('BoughtItems')) || [];
    console.log(boughtItems);
    const handleBack = () => {
        localStorage.removeItem('BoughtItems');
        window.location.href = '/book';
    }

    const totalPrice = boughtItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Bạn đã mua thành công</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {boughtItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Total Price: {totalPrice}</h2>
            <button onClick={handleBack} className='btn btn-success'>Trang chủ</button>
        </div>
    )
}

export default Checkout