"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="header-content">
                    <Link href="/" className="logo-link">
                        <img src='/images/logo.jpg' width={40} className="logo" alt="Logo" />
                    </Link>
                    <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`}>
                        <Link className='nav-link' href='/' onClick={toggleNav}>בית</Link>
                        <Link className='nav-link' href='/neighborhoodInfo' onClick={toggleNav}>מידע</Link>
                        <Link className='nav-link' href='/forum' onClick={toggleNav}>פורום</Link>
                        <Link className='nav-link' href='/allFamily' onClick={toggleNav}>משפחה</Link>
                        <Link className='nav-link' href='/nadlan' onClick={toggleNav}>נדל"ן</Link>
                        <Link className='nav-link' href='/board' onClick={toggleNav}>לוח</Link>
                        <Link className='nav-link' href='/contactUs' onClick={toggleNav}>צור קשר</Link>
                    </nav>

                    <div className="header-actions">
                        <Link href="/login" className="login-link">כניסה/הרשמה</Link>
                        <button className={`menu-toggle ${isNavOpen ? 'active' : ''}`} onClick={toggleNav}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='h-10'>
                <Marquee className="marquee h-10" pauseOnHover={true} direction='right' speed={50} autoFill={true} style={{ direction: 'ltr' }}>
                    הודעות חשובות למשתמשים יופיעו כאן
                </Marquee>
            </div>
        </header>
    )
}