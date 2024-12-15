'use client';
//import React from 'react';
import * as React from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Header from '../components/Header';
import Footer from '../components/Footer';


// Import email validator
const validator = require('email-validator');


export default function Login() {

  const [open, setOpen] = React.useState(false);
  const [errorHolder, setErrorHolder] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   const validateForm = (event) => {
      let errorMessage = '';
  
      const data = new FormData(event.currentTarget);
      const email = data.get('email');
      const password = data.get('pass');
  
      // Validate email & check for empy fields
      const emailCheck = validator.validate(email);
      console.log('Email status:', emailCheck);
  
      if (!emailCheck) {
        errorMessage += 'Incorrect email. ';
      }
      if (!email || email.trim() === '') {
        errorMessage += 'Email cannot be blank. ';
      }
      if (!password || password.trim() === '') {
        errorMessage += 'Password cannot be blank. ';
      }
    
  
  
      // Limit  field lengths
      if (email.length > 30) {
        errorMessage += 'Email cannot exceed 50 characters. ';
      }
      if (password.length > 20) {
        errorMessage += 'Password cannot exceed 20 characters. ';
      }
    
      return errorMessage;
    };

  const handleSubmit = (event) => {
    console.log('Handling submit');
    event.preventDefault();

    let errorMessage = validateForm(event);
    setErrorHolder(errorMessage);

    if (errorMessage.length > 0) {
      setOpen(true);
    } else {
      const data = new FormData(event.currentTarget);

      const email = data.get('email');
      const pass = data.get('pass');
      
      console.log('Sent email:', email);
      console.log('Sent pass:', pass);

      runDBCallAsync(`/api/login?email=${email}&pass=${pass}`);
    }
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log('Response from server:', data);

    if (data.status === true) {
      console.log('Login is valid!');
      console.log('Role is', data.role);
      localStorage.setItem('isLoggedIn', 'true'); // Mark user as logged in
       
      if(data.role == "Manager"){
          window.location = '/dashboard';
        }
        else{
        window.location = '/'; // Redirect to the home page
        }

    } else {
      console.log('Invalid login');
     // alert('Invalid email or password');
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
              inputProps={{
                maxLength: 20,
                pattern: "[A-Za-z0-9]*", // Allows only alphabets and numbers
              }}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^A-Za-z0-9]/g, ""))
              }   
              
            
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

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Error'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {errorHolder}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
      <Footer />
    </div>
  );
}








// 'use client';
// //import React from 'react';
// import * as React from 'react';
// import Link from 'next/link';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// export default function Login() {
//   const [errors, setErrors] = React.useState({});


//   const validateFields = (data) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     let newErrors = {};

//     if (!data.get('email') || !emailRegex.test(data.get('email'))) {
//       newErrors.email = 'Please enter a valid email address.';
//     }
//     if (!data.get('pass') || data.get('pass').length < 6) {
//       newErrors.pass = 'Password must be at least 6 characters.';
//     }

//     return newErrors;
//   };


//   const handleSubmit = (event) => {
//     console.log('Handling submit');
//     event.preventDefault();

//     const data = new FormData(event.currentTarget);
//     const validationErrors = validateFields(data); // Use data after it's initialized
    
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const email = data.get('email');
//     const pass = data.get('pass');
    
//     console.log('Sent email:', email);
//     console.log('Sent pass:', pass);

//     runDBCallAsync(`/api/login?email=${email}&pass=${pass}`);

//   };

//   async function runDBCallAsync(url) {
//     const res = await fetch(url);
//     const data = await res.json();

//     console.log('Response from server:', data);

//     if (data.status === true) {
//       console.log('Login is valid!');
//       console.log('Role is', data.role);
//       localStorage.setItem('isLoggedIn', 'true'); // Mark user as logged in
       
//       if(data.role == "Manager"){
//           window.location = '/dashboard';
//         }
//         else{
//         window.location = '/'; // Redirect to the home page
//         }

//     } else {
//       console.log('Invalid login');
//       alert('Invalid email or password');
//     }
//   }

//   return (
//     <div className="login">
//       <Header />
//       <Container maxWidth="sm">
//         {/* <Box sx={{ height: '100vh' }}> */}
//           <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               error={!!errors.email}
//               helperText={errors.email}
//             />

//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="pass"
//               label="Password"
//               type="password"
//               id="pass"
//               autoComplete="current-password"
//               error={!!errors.pass}
//               helperText={errors.pass}
//             />

//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//               Login
//             </Button>

//             <p>
//       Don't have an account?{' '}
//       <Link href="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
//         Register
//       </Link>
//     </p>
//           </Box>
//         {/* </Box> */}
//       </Container>
//       <Footer />
//     </div>
//   );
// }



