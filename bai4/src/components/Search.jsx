import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);   
    const keyword = searchParams.get('keyword');
    console.log(keyword);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/search/results/?q=${keyword}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.results) {
                setBooks(data.results.books);
                console.log(data.results.books);
            } else {
                setBooks([]);
            }
        })
        .catch((err) => console.log(err));
    }, [keyword]);
    
    return (
        <div>
            <h1>Search result for {keyword}</h1>
            <div className="container">
                <div className="row align-items-start">
                    {books.map(book => (
                        <div key={book.title}>
                            <h3> Title:{book.title}</h3>
                            <img src={book.cover} alt={book.title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
