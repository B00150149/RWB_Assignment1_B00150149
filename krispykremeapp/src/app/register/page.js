'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
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

export default function register() {
  const [userType, setUserType] = React.useState('Customer');
  const [open, setOpen] = React.useState(false); // Dialog state
  const [errorHolder, setErrorHolder] = React.useState(''); // Error message state

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Custom validation function
  const validateForm = (event) => {
    let errorMessage = '';

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('pass');
    const phoneNumber = data.get('num');
    const address = data.get('address');

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
    if (!phoneNumber || phoneNumber.trim() === '') {
      errorMessage += 'Phone number cannot be blank. ';
    }
    if (!address || address.trim() === '') {
      errorMessage += 'Address cannot be blank. ';
    }


    // Limit  field lengths
    if (email.length > 30) {
      errorMessage += 'Email cannot exceed 50 characters. ';
    }
    if (password.length > 20) {
      errorMessage += 'Password cannot exceed 20 characters. ';
    }
    if (phoneNumber.length > 15) {
      errorMessage += 'Phone number cannot exceed 15 characters. ';
    }
    if (address.length > 100) {
      errorMessage += 'Address cannot exceed 100 characters. ';
    }

    return errorMessage;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

     // Call validation
     let errorMessage = validateForm(event);
     setErrorHolder(errorMessage);
 
     if (errorMessage.length > 0) {
       setOpen(true); // Show the error dialog
     } else {

      const email = data.get('email');
      const pass = data.get('pass');
      const num = data.get('num');
      const address = data.get('address');

      console.log("Sent email:", email);
      console.log("Sent pass:", pass);
      console.log("Sent address:", address);
      console.log("Sent telephone:", num);

      runDBCallAsync(`/api/register?email=${email}&pass=${pass}&num=${num}&address=${address}&type=${userType}`);
     }
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data === "inserted") {
      console.log("Registration successful!");
      window.location = '/login';
    } else {
      console.log("Registration failed.");
    }
  }

  return (
    <div className="login">
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ height: '100vh' }}>
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
              //inputProps={{ maxLength: 30 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="num"
              label="Phone Number"
              type="text"
              id="num"
              autoComplete="tel"
              inputProps={{
                inputMode: 'numeric', // Enforces numeric keyboard
                pattern: "[0-9]*",    // Allows only digits
              }}
              onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ""))}            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              type="address"
              id="address"
              autoComplete="address"
              inputProps={{
                pattern: "[A-Za-z0-9 ]*", // Allows only alphabets, numbers, and spaces
              }}
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^A-Za-z0-9 ]/g, ""))
              }            />
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
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel id="user-type-label">User Type</InputLabel>
              <Select
                labelId="user-type-label"
                id="user-type"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                label="User Type"
              >
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
			
          </Box>
          <p>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
              Login
            </Link>
          </p>
        </Box>
      </Container>

      {/* Error Dialog */}
      <React.Fragment>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{errorHolder}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Footer />
    </div>
  );
}



// 'use client';
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Link from '@mui/material/Link';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// export default function Home() {
//   const [userType, setUserType] = React.useState('Customer');
//   const [errors, setErrors] = React.useState({});

//   const validateFields = (data) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\d{10,15}$/;
//     let newErrors = {};

//     if (!data.get('email') || !emailRegex.test(data.get('email'))) {
//       newErrors.email = 'Please enter a valid email address.';
//     }
//     if (!data.get('num') || !phoneRegex.test(data.get('num'))) {
//       newErrors.num = 'Phone number must be 10-15 digits.';
//     }
//     if (!data.get('address')) {
//       newErrors.address = 'Address cannot be blank.';
//     }
//     if (!data.get('pass') || data.get('pass').length < 6) {
//       newErrors.pass = 'Password must be at least 6 characters.';
//     }

//     return newErrors;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     const validationErrors = validateFields(data);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const email = data.get('email');
//     const pass = data.get('pass');
//     const num = data.get('num');
//     const address = data.get('address');

//     console.log("Sent email:", email);
//     console.log("Sent pass:", pass);
//     console.log("Sent address:", address);
//     console.log("Sent telephone:", num);

//     runDBCallAsync(`/api/register?email=${email}&pass=${pass}&num=${num}&address=${address}&type=${userType}`);
//   };

//   async function runDBCallAsync(url) {
//     const res = await fetch(url);
//     const data = await res.json();

//     if (data.data === "inserted") {
//       console.log("Registration successful!");
//       window.location = '/login';
//     } else {
//       console.log("Registration failed.");
//     }
//   }

//   return (
//     <div className="login">
//       <Header />
//       <Container maxWidth="sm">
//         <Box sx={{ height: '100vh' }}>
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
//               name="num"
//               label="Phone Number"
//               type="text"
//               id="num"
//               autoComplete="tel"
//               inputProps={{ maxLength: 15 }}
//               error={!!errors.num}
//               helperText={errors.num}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="address"
//               label="Address"
//               type="address"
//               id="address"
//               autoComplete="address"
//               inputProps={{ maxLength: 100 }}
//               error={!!errors.address}
//               helperText={errors.address}
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
//               inputProps={{ maxLength: 20 }}
//             />
//             <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
//               <InputLabel id="user-type-label">User Type</InputLabel>
//               <Select
//                 labelId="user-type-label"
//                 id="user-type"
//                 value={userType}
//                 onChange={(e) => setUserType(e.target.value)}
//                 label="User Type"
//               >
//                 <MenuItem value="Customer">Customer</MenuItem>
//                 <MenuItem value="Manager">Manager</MenuItem>
//               </Select>
//             </FormControl>

//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//               Register
//             </Button>
			
//           </Box>
//           <p>
//             Already have an account?{' '}
//             <Link href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
//               Login
//             </Link>
//           </p>
//         </Box>
//       </Container>
//       <Footer />
//     </div>
//   );
// }



// 'use client';
// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Link from '@mui/material/Link';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import Header from '../components/Header';
// import Footer from '../components/Footer';


// export default function Home() {
// 	const [userType, setUserType] = React.useState('Customer');
				
// 				const handleSubmit = (event) => {
// 				console.log("handling submit");
// 				event.preventDefault();

// 				const data = new FormData(event.currentTarget);
// 				let email = data.get('email')
// 				let pass = data.get('pass')
// 				let num = data.get('num')
// 				let address = data.get('address')

// 				console.log("Sent email:" + email)
// 				console.log("Sent pass:" + pass)
// 				console.log("Sent address:" + address)
// 				console.log("Sent telephone:" + num)

// 				runDBCallAsync(`/api/register?email=${email}&pass=${pass}&num=${num}&address=${address}&type=${userType}`)
// 				}; // end handle submit


								
// 				async function runDBCallAsync(url) {
// 				const res = await fetch(url);
// 				const data = await res.json();

// 				if(data.data === "inserted"){
// 				console.log("register is succesfull!")
// 				window.location = '/login';
// 				} else {
// 				console.log("not valid ")
// 				}

				
				  
// 				}

// return (
// <div className="login">
// <Header />
// 	<Container maxWidth="sm">
// 	<Box sx={{ height: '100vh' }} >
// 	<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

// 		<TextField
// 		margin="normal"
// 		required
// 		fullWidth
// 		id="email"
// 		label="Email Address"
// 		name="email"
// 		autoComplete="email"
// 		autoFocus
// 		error={!!errors.email}
//         helperText={errors.email}
// 		/>

// 		<TextField
// 		margin="normal"
// 		required
// 		fullWidth
// 		name="num"
// 		label="Phone Number "
// 		type="num"
// 		id="num"
// 		autoComplete="num"
// 		error={!!errors.num}
//         helperText={errors.num}
// 		/>

// 		<TextField
// 		margin="normal"
// 		required
// 		fullWidth
// 		name="address"
// 		label="Address"
// 		type="address"
// 		id="address"
// 		autoComplete="address"
// 		error={!!errors.address}
//         helperText={errors.address}
// 		/>

// 		<TextField
// 		margin="normal"
// 		required
// 		fullWidth
// 		name="pass"
// 		label="Pass"
// 		type="pass"
// 		id="pass"
// 		autoComplete="current-password"
// 		error={!!errors.pass}
//         helperText={errors.pass}
// 		/>



// 		<FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
//             <InputLabel id="user-type-label">User Type</InputLabel>
//             <Select
//             labelId="user-type-label"
//             id="user-type"
//             value={userType}
//             onChange={(e) => setUserType(e.target.value)}
//             label="User Type">
//             <MenuItem value="Customer">Customer</MenuItem>
//             <MenuItem value="Manager">Manager</MenuItem>
//             </Select>
//          </FormControl>


// 		<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Register </Button>

// 	</Box>
// 	<p>
//       Already have an account?{' '}
//       <Link href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
//         Login
//       </Link>
//     </p>
// 	</Box>
// 	</Container>
// <Footer />
// </div> 	
// ); // end return
// }