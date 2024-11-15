import Link from 'next/link';
import Image from 'next/image';
import '../styles/Footer.css';
import {logo, instagram, twitter} from '../images'

export default function Footer(){
  return (
    <footer style={{ borderTop: '1px solid #ddd', padding: '20px', textAlign: 'center' }}>
      <div>
      <Image src={logo} alt="Logo" width={80} height={40} />
      </div>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Image src={twitter} alt="Twitter" width={24} height={24} />
        </a>
        <a href="https://instagram.com">
        <Image src={instagram} alt="Instagram" width={24} height={24} />
        </a>
      </div>
    </footer>
  );
};

