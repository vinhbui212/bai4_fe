import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, TextField, Button } from '@mui/material';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.user_id);
        navigate('/book');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (

    <div>
      <h2 className='fst-normal'>Login</h2>
      <form onSubmit={handleSubmit} className='mt-50'>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Username"
              fullWidth
              className='w-50'

              onChange={handleEmailChange}
              autoComplete="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className='w-50'
              required
              id="password"
              name="password"
              label="password"
              type='password'
              onChange={handlePasswordChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="w-full"
              sx={{ bgcolor: "#9155FD", padding: "0.75rem 0rem" }}
              type="sumbit"
              variant="contained"
              size="large"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center">
        <div className="py-3 flex items-center">
          <p>Don't have account ?</p>
          <Button onClick={() => navigate("/register")} className="ml-5 " size="small">Register</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;