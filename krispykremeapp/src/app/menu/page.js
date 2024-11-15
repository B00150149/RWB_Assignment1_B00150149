import React from 'react';
import '../styles/Footer.css';
import Image from 'next/image'
import  logo from '../images';
import Link from 'next/link'; // Import Next.js Link component
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function menu (){
    return (
        <div className= "menu">
        <Header/>



        <Footer/>
        </div>
      
    );
};


