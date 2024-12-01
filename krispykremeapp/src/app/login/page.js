'use client';
import React from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

export default function Login() {
  const handleSubmit = (event) => {
    console.log('Handling submit');
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const pass = data.get('pass');
    
    console.log('Sent email:', email);
    console.log('Sent pass:', pass);

    runDBCallAsync(`/api/login?email=${email}&pass=${pass}`);
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    // const urlParams = new URLSearchParams(window.location.search);
    // const email = urlParams.get('email'); // Get the email from the URL

    console.log('Response from server:', data);

    if (data.status === true) {
      console.log('Login is valid!');
      console.log('Role is', data.role);
      localStorage.setItem('isLoggedIn', 'true'); // Mark user as logged in
      if(data.role == "Manager"){
        //window.location = '/dashboard';
        router.push('/dashboard'); // Redirect to the Manager dashboard
      }
      else{
      //window.location = '/'; // Redirect to the home page
      router.push('/dashboard'); // Redirect to the Manager dashboard
      }
    } else {
      console.log('Invalid login');
      alert('Invalid email or password');
    }
  }

  return (
    <div className="login">
      <Header />
      <Container maxWidth="sm">
        {/* <Box sx={{ height: '100vh' }}> */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>

            <p>
      Don't have an account?{' '}
      <Link href="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
        Register
      </Link>
    </p>
          </Box>
        {/* </Box> */}
      </Container>
      <Footer />
    </div>
  );
}



