"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    // const [isScrolled, setIsScrolled] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
        // if()
        // document.body.style.overflow = isNavOpen ? 'auto' : 'hidden';
    };

    useEffect(() => {
        // const handleScroll = () => {
        //     setIsScrolled(window.scrollY > 500);
        // };

        // window.addEventListener('scroll', handleScroll);
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        //     document.body.style.overflow = 'auto';
        // };
    }, []);

    const navLinks = [
        { href: '/', text: 'בית' },
        { href: '/neighborhoodInfo', text: 'מידע' },
        { href: '/forum', text: 'פורום' },
        { href: '/allFamily', text: 'משפחה' },
        { href: '/nadlan', text: 'נדל"ן' },
        { href: '/board', text: 'לוח' },
        { href: '/contactUs', text: 'צור קשר' },
    ];

    return (
        <header className={`header`}>
            <div className="container">
                <div className="header-content">
                    <Link href="/" className="logo-link">
                        <img src='/images/logo.jpg' width={40} className="logo" alt="Logo" />
                    </Link>
                    <nav className={`navHeader ${isNavOpen ? 'nav-open' : ''}`}>
                        {navLinks.map((link, index) => (
                            <Link key={index} className='nav-linkHeader' href={link.href} onClick={toggleNav}>
                                {link.text}
                            </Link>
                        ))}
                        <Link href="/login" className="nav-linkHeader login-link mobile-only" onClick={toggleNav}>
                            כניסה/הרשמה
                        </Link>
                    </nav>

                    <div className="header-actions">
                        <Link href="/login" className="login-link desktop-only">כניסה/הרשמה</Link>
                        <button className={`menu-toggle ${isNavOpen ? 'active' : ''}`} onClick={toggleNav}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='h-10 marquee-div'>
                <Marquee className="marquee h-10" pauseOnHover={true} direction='right' speed={50} autoFill={true} style={{ direction: 'ltr' }}>
                    הודעות חשובות למשתמשים יופיעו כאן
                </Marquee>
            </div>

        </header>
    )
}