import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Book from './components/Book';
import View from './components/View';
import Search from './components/Search';
import { Navigate, useRoutes } from 'react-router-dom';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const isAuthenticated=()=>{
  const token = localStorage.getItem('token');
  return token != null;
}

function PrivateRoute ({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}
function LoginRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/book" /> : children;
}

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/login" element={<LoginRoute><Login /></LoginRoute>} />
        <Route path="/book" element={<PrivateRoute><Book /></PrivateRoute>} />
        <Route path="/book/:id" element={<PrivateRoute><View /></PrivateRoute>} />
        <Route path='/search' element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />


      </Routes>

    </div>
  );
}

export default App;