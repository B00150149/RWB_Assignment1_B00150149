'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/Header.css';
import { logo, cart } from '../images';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);


  // const handleLogout = () => {
  //   try {
  //     // Proceed with logout logic
  //     localStorage.removeItem('isLoggedIn');
  //     setIsLoggedIn(false);
  //     // Call the API to empty the cart
  //     // const response = await fetch('http://localhost:3000/api/emptyCart', {
  //     //   method: 'DELETE',
  //     // });
  
  //     // if (!response.ok) {
  //     //   throw new Error('Failed to empty the cart.');
  //     // }

  //     // Fetch products from the API
  //     fetch(`http://localhost:3000/api/emptyCart`);
  //     console.log('Cart emptied successfully');
  

      
  //     window.location.reload(); // Optionally reload the page
  //     console.log('User logged out');
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //     alert('An error occurred while logging out.');
  //   }
  // };
  
  function handleLogout() {
    // Logout logic
     localStorage.removeItem('isLoggedIn');
     setIsLoggedIn(false);
     window.location.reload(); // Optionally reload the page
     console.log('User logged out');
     fetch(`http://localhost:3000/api/emptyCart`);
  }



  // const handleLogout = () => {
  //   // Logout logic
  //   localStorage.removeItem('isLoggedIn');
  //   setIsLoggedIn(false);
  //   window.location.reload(); // Optionally reload the page
  //   console.log('User logged out');
  // };

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

      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">
          <Image src={cart} alt="Cart" width={24} height={24} />
        </Link>

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





// //************************************* correct code */
// import Link from 'next/link';
// import Image from 'next/image';
// import '../styles/Header.css';
// import { logo, cart } from '../images';

// export default function Header(){
//   return (
//     <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
      
//       <div>
//         <Image src={logo} alt="Logo" width={80} height={40} />
//       </div>

//       <nav style={{ display: 'flex', gap: '20px' }}>
//         <Link href="/">Home</Link>
//         <Link href="/menu">Menu</Link>
//         <Link href="/cart">
//         <Image src={cart} alt="Logo" width={24} height={24} />
//         </Link>
//         <Link href="/login">Login</Link>
//       </nav>

//     </header>
//   );
// };
