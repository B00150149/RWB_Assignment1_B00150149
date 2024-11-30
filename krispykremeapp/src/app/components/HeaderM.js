'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/Header.css';
import { logo, cart } from '../images';
//import { getCustomSession } from '../api/sessionCode.js';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch the session email
    const fetchUserData = async () => {
      const response = await fetch('/api/getData');
            const data = await response.json();

            if (data.email/* && data.role*/) {
                setUserData(data);
                console.log('Header get Data call successful');
            } else {
                //console.error('No user data found');
            }
    };

    fetchUserData();
  }, []);


  useEffect(() => {
    
    // Check if the user is logged in by checking localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);


  function handleLogout() {
    // Logout logic
     localStorage.removeItem('isLoggedIn');
     localStorage.removeItem('userData');//
     setUserData(null);
     setIsLoggedIn(false);
     //window.location.reload(); // Optionally reload the page
     console.log('User logged out');
     fetch(`/api/logout`) // Call API to destroy session
     .then((response) => response.json())
     .then((data) => {  
       console.log(data.message); // 'Logged out successfully'
     });
     window.location = '/login'; // Optionally reload the page
  }


  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
      }}
    >
      <div>
        <Image src={logo} alt="Logo" width={80} height={40} />
      </div>

    {isLoggedIn && userData ?(<div>Welcome { userData.email} !</div>):(<div></div>)}
    

      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link href="/dashboard">Dashboard</Link>

        {isLoggedIn ? (
          <button
          onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              color: '#0070f3',
              cursor: 'pointer',
              padding: '0',
            }}
          >
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}




