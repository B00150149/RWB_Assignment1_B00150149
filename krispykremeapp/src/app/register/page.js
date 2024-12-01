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
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function Home() {
	const [userType, setUserType] = React.useState('Customer');

				const handleSubmit = (event) => {
				console.log("handling submit");
				event.preventDefault();

				const data = new FormData(event.currentTarget);
				let email = data.get('email')
				let pass = data.get('pass')
				let num = data.get('num')
				let address = data.get('address')

				console.log("Sent email:" + email)
				console.log("Sent pass:" + pass)
				console.log("Sent address:" + address)
				console.log("Sent telephone:" + num)

				runDBCallAsync(`/api/register?email=${email}&pass=${pass}&num=${num}&address=${address}&type=${userType}`)
				}; // end handle submit


								
				async function runDBCallAsync(url) {
				const res = await fetch(url);
				const data = await res.json();

				if(data.data === "inserted"){
				console.log("register is succesfull!")
				window.location = '/login';
				} else {
				console.log("not valid ")
				}

				
				  
				}

return (
<div className="login">
<Header />
	<Container maxWidth="sm">
	<Box sx={{ height: '100vh' }} >
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
		name="num"
		label="Phone Number "
		type="num"
		id="num"
		autoComplete="num"
		/>

		<TextField
		margin="normal"
		required
		fullWidth
		name="address"
		label="Address"
		type="address"
		id="address"
		autoComplete="address"
		/>

		<TextField
		margin="normal"
		required
		fullWidth
		name="pass"
		label="Pass"
		type="pass"
		id="pass"
		autoComplete="current-password"
		/>



		<FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="user-type-label">User Type</InputLabel>
            <Select
            labelId="user-type-label"
            id="user-type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            label="User Type">
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value="Manager">Manager</MenuItem>
            </Select>
         </FormControl>


		<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Register </Button>

	</Box>
	<p>
      Already have an account?{' '}
      <Link href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
        Login
      </Link>
    </p>
	</Box>
	</Container>
<Footer />
</div> 	
); // end return
}