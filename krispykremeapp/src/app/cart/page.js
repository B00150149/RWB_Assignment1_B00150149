'use client';

import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const [userData, setUserData] = useState(null);

    // http://localhost:3000

  useEffect(() => {
    // Fetch the session email
    const fetchUserData = async () => {
      const response = await fetch('/api/getData');
            const data = await response.json();

            if (data.email/* && data.role*/) {
                setUserData(data);
                console.log('get Data call successful');
            } else {
                //console.error('No user data found');
            }
    };

    fetchUserData();
  }, []);

    // Fetch cart items from the API
    useEffect(() => {
        fetch('/api/getCartItems')
            .then((res) => res.json())
            .then((data) => {
                setCartItems(data);

                // Safely calculate the total price, ensuring `item.price` is a valid number
                const totalPrice = data.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
                setTotal(totalPrice);
            })
            .catch((error) => console.error('Error fetching cart items:', error));
    }, []);


    function putOrders(email) {
        console.log("putting in order:", { email});
        fetch(`/api/putOrders?email=${encodeURIComponent(email)}`);
        // //empty cart after order placed
        // fetch(`http://localhost:3000/api/emptyCart`);

        // // After checkout, trigger a UI refresh by fetching the updated cart items
         setCartItems([]); // Clear the current cart items from state
         setTotal(0); // Reset the total
      }
      


    const theme = createTheme({
        palette: {
            primary: { main: green[500] },
        },
    });

    return (
        <div>
            <Header />
            <ThemeProvider theme={theme}>
                <Container sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
                        Your Cart
                    </Typography>
                    {cartItems.length > 0 ? (
                        <>
                            <Grid container spacing={2}>
                                {cartItems.map((item, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderBottom: '1px solid #ddd',
                                                pb: 2,
                                                mb: 2,
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={`/images/${item.image}`}
                                                alt={item.pname}
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    mr: 2,
                                                    border: '1px solid #ddd',
                                                }}
                                            />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6">{item.pname}</Typography>
                                                <Typography variant="body1">${(Number(item.price) || 0).toFixed(2)}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Box sx={{ borderTop: '1px solid #ddd', pt: 2, mt: 2 }}>
                                <Typography variant="h6" sx={{ textAlign: 'right' }}>
                                    Total: ${(Number(total) || 0).toFixed(2)}
                                </Typography>
                                <Button 
                                onClick={() => {
                                    if (userData && userData.email) {
                                      putOrders(userData.email);
                                    } else {
                                      alert("Please login to place order");
                                    }
                                  }}
                                variant="contained" color="primary" sx={{ display: 'block', mx: 'auto', mt: 2 }} >
                                    Checkout
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>
                            Your cart is empty.
                        </Typography>
                    )}
                </Container>
            </ThemeProvider>
            <Footer />
        </div>
    );
}

