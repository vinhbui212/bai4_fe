import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import { CiShoppingCart } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import { MdKeyboardVoice } from "react-icons/md";

export const Header = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleInputChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSearch = () => {
        if (keyword.trim()) {
            navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
        } else {
            navigate('/book');
        }
    };

    const handleVoiceSearch = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            setKeyword(transcript);
        };
    };
    const handleLogout = () => {
    navigate('/login');
     localStorage.removeItem('token'); 
     localStorage.removeItem('id');  
    }
    const handleCart = () => { 
        navigate('/cart');
    }

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#000' }}>
            <h1 style={{ color: '#fff' }}>Book List</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <MdKeyboardVoice onClick={handleVoiceSearch} style={{ marginRight: '10px', color: '#fff', cursor: 'pointer' }} />
                <Input value={keyword} onChange={handleInputChange} style={{ marginRight: '10px', backgroundColor: '#fff' }} />
                <BiSearch onClick={handleSearch} style={{ color: '#fff', cursor: 'pointer' }} />
            </div>
            <div>
                <button onClick={handleCart} className="btn btn-success btn-lg me-3">
                    <CiShoppingCart className="text-white" />
                </button>
                <button className="btn btn-danger btn-lg" onClick={handleLogout}>
                    <BiLogOut  className="text-white" />
                </button>
            </div>
        </header>
    );
};