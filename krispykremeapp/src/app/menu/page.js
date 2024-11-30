
'use client';

import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link as MuiLink, Grid, Box,
    Typography, Container, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default function Home() {
    const [data, setData] = useState(null);
    const [weather, setWeatherData] = useState(0);

    // Fetch products from the API
    useEffect(() => {
        fetch('/api/getProducts')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            });
    }, []);


    function putInCart(pname, pdesc, price, image) {
      console.log("putting in cart:", { pname, pdesc, price, image });
    
      fetch(`/api/putInCart?pname=${encodeURIComponent(pname)}&pdesc=${encodeURIComponent(pdesc)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`);
    }
    

    // Fetch weather data
    useEffect(() => {
        fetch('/api/getWeather')
            .then((res) => res.json())
            .then((weather) => {
                setWeatherData(weather);
            });
    }, []);

    if (!data) return <p>Loading...</p>;
    if (!weather) return <p>No weather data available.</p>;

    const theme = createTheme({
        palette: {
            secondary: {
                main: green[500],
            },
        },
        typography: {
            h4: {
                fontWeight: 700,
            },
        },
    });

    return (
        <div className="menu">
        <Header />
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <Container component="main">
              <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h4" color="secondary">Today's Temperature: {weather.temp}°C </Typography>
                <Typography variant="h3" sx={{ my: 2 }}> Menu</Typography>
              </Box>

              <Grid container spacing={4}>
                {data.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={`/images/${item.image}`}  // Adjust this line to reference images in the 'public/images' folder
                        alt={item.pname}
                        />

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">{item.pname}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.pdesc}</Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>${item.price}</Typography>
                      </CardContent>

                      <CardActions>
                        <Box
                          sx={{
                            display: 'flex', // Use Flexbox
                            justifyContent: 'center', // Center horizontally
                            width: '100%', // Ensure it takes the full width of CardActions
                          }}
                        >
                          <Button  onClick={() => putInCart(item.pname, item.pdesc, item.price, item.image)} variant="contained" color="secondary">Add to Cart </Button>
                          {/* <Button onClick={() => (putInCart(item.pname, item.pdesc, item.price, item.image))} variant="contained" color="secondary">Add to Cart</Button> */}
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </ThemeProvider>

        <Footer />
        </div>
    );
}


