import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
const View = () => {
    const params = useParams();
    const [book, setBook] = useState({

        id: '',
        title: '',
        author: '',
        category: '',
        price: '',


    })
    const [imgUrl, setImgUrl] = useState('');
    const [quantity, setQuantity] = useState('');
    const id = params.id;
    const navigate = useNavigate();
    console.log(id);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
        })
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
                setImgUrl(data.cover);

            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleBuy = () => {
        const newTitle = book.title;
        const newPrice = book.price; // assuming the book object has a price property
        let titles = JSON.parse(localStorage.getItem('Titles')) || [];
        let boughtItems = JSON.parse(localStorage.getItem('BoughtItems')) || [];

        let existingItem = boughtItems.find(item => item.title === newTitle);

        if (existingItem) {
            existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
        } else {
            titles.push(newTitle);
            localStorage.setItem('Titles', JSON.stringify(titles));

            const boughtItem = { title: newTitle, quantity: Number(quantity), price: newPrice };
            boughtItems.push(boughtItem);
        }
        localStorage.setItem('BoughtItems', JSON.stringify(boughtItems));

        if (newTitle)
            navigate('/cart');
    }
    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>{`Book ${id}`}</h1>
            </div>
            <div>
                <div className='container'>
                    <div className='rounded border p-3'>
                        <div className='row'>
                            <div className='col-8 '>
                                <div className='d-flex mt-3'>
                                    <label>Title:{' '}</label>
                                    <input
                                        className='form-control ms-4'
                                        type="text"
                                        value={book.title}
                                        disabled
                                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                                    />
                                </div>

                                <div className='d-flex mt-3'>
                                    <label>Author:{' '}</label>
                                    <input
                                        className='form-control ms-2'
                                        type="text"
                                        value={book.author}
                                        disabled
                                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                                    />
                                </div>

                                <div className='d-flex mt-3'>
                                    <label> Type:{' '}</label>
                                    <input
                                        className='form-control ms-3'
                                        type="text"
                                        value={book.category}
                                        disabled
                                        onChange={(e) => setBook({ ...book, type: e.target.value })}
                                    />
                                </div>
                                <div className='d-flex mt-3'>
                                    <label>Price:{' '}</label>
                                    <input
                                        className='form-control ms-1'
                                        type="text"
                                        value={book.price}
                                        disabled
                                        onChange={(e) => setBook({ ...book, date: e.target.value })}

                                    />
                                </div>


                                <div className='mt-5 d-flex justify-content-center'>
                                    <label htmlFor="quantity">Quantity : </label>{' '}
                                    <input
                                        id="quantity"
                                        type="number"
                                        value={quantity}
                                        required
                                        placeholder="Choose quantity"

                                        onChange={(e) => setQuantity(e.target.value)}
                                    />

                                    <button className='btn btn-info ms-3' onClick={() => handleBuy()}>Mua</button>
                                </div>

                            </div>
                            <div className='col-4'>
                                <img src={imgUrl} alt="book cover" width="70%" height="auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View;