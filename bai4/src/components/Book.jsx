import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Header } from './Header';

const Book = ({ book }) => {
    return (
        <div className='col-md-4 mt-3' key={book.id}>
            <div className='rounded border p-3 d-grid'>
                <div className='row'>
                    <div className='col'>
                        <a style={{ textDecoration: "none", color: "black" }} href={`/book/${book.id}`}>
                            <p className='fs-2 fst-italic'>{book.title}</p>
                        </a>
                        <p className='fst-italic'>Author: {book.author}</p>
                        <p className='fst-italic'>Type: {book.category}</p>
                        <p className='fst-italic'>Release: {book.price}</p>
                        <p className='fst-italic'>Page: {book.quantity}</p>
                    </div>
                    <div className='col d-flex align-items-center justify-content-center'>
                        <div className='vertical-line'></div>
                        <img style={{ maxWidth: '100%', height: 'auto' }} src={book.cover} alt={book.title} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        axios.get('http://127.0.0.1:8000/api/books/')
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => console.log(err));
    };


    return (
        <div>
            <Header />
            <div className="container">
                <div className="row align-items-start">
                    {books.map(book => (
                        <Book key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookList;
