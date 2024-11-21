import Link from 'next/link';
import Image from 'next/image';
import '../styles/Header.css';
import { logo, cart } from '../images';

export default function Header(){
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
      
      <div>
        <Image src={logo} alt="Logo" width={80} height={40} />
      </div>

      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">
        <Image src={cart} alt="Logo" width={24} height={24} />
        </Link>
        <Link href="/login">Login</Link>
      </nav>

    </header>
  );
};

