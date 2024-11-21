import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "next/image";
import Link from 'next/link';
import { Box, Typography, Grid, Button, Card, CardContent } from "@mui/material";

export default function Home() {
  return (
    <div className="Page">
      <Header />

      {/* Welcome Section */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          height: 300,
          mb: 4,
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid #ddd",
        }}
      >
        {/* Background Image */}
        <Image
          src="/images/krispy.jpg" // Path to the image
          alt="Welcome to Krispy Kreme"
          layout="fill" // Makes the image fill the parent container
          objectFit="cover" // Ensures the image maintains aspect ratio while filling the container
        />
        {/* Overlay Content */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            textShadow: "1px 1px 5px rgba(0,0,0,0.8)",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to Krispy Kreme!
          </Typography>
          
          <Button variant="contained" sx={{
              backgroundColor: "#91C47A", // Custom background color
              "&:hover": {
                backgroundColor: "#A1D88C", // Slightly darker on hover
              },
            }}>
          <Link href="/menu">View Menu</Link>
          </Button>
        </Box>
      </Box>

      {/* Popular Items Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Our Popular Items
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { src: "/images/Kinder.jpg", title: "Kinder Donut", desc: "Classic Kinder!" },
            { src: "/images/lime.jpg", title: "Lime Pie Donut", desc: "Sweet&Saur delight!" },
            { src: "/images/oreo.jpg", title: "Oreo Donut", desc: "Orea and chocolate!" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 2,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                {/* Item Image */}
                <Image
                  src={item.src} // Path to image
                  alt={item.title}
                  width={150} // Fixed width
                  height={150} // Fixed height
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
    </div>
  );
}
