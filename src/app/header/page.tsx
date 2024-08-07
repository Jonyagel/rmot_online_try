"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { cookies } from 'next/headers'

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };


    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link href="/" className="logo-link">
                        <img src='/images/logo.jpg' width={40} className="logo" alt="Logo" />
                    </Link>
                    <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`} onMouseLeave={() => {
                        setIsNavOpen(false);
                    }}>
                        <Link className='nav-link' href='/'>בית</Link>
                        <Link className='nav-link' href='/neighborhoodInfo'>מידע</Link>
                        <Link className='nav-link' href='/forum'>פורום</Link>
                        <Link className='nav-link' href='/allFamily'>משפחה</Link>
                        <Link className='nav-link' href='/nadlan'>נדל"ן</Link>
                        <Link className='nav-link' href='/board'>לוח</Link>
                        <Link className='nav-link' href='/contactUs'>צור קשר</Link>
                    </nav>

                    <div className="header-actions">
                        <Link href="/login" className="login-link">כניסה/הרשמה</Link>
                        <button className="menu-toggle" onClick={toggleNav}>
                            <i className={`bi ${isNavOpen ? 'bi-x' : 'bi-list'}`}></i>
                        </button>
                    </div>
                </div>
            </div>
            <Marquee className="marquee" pauseOnHover={true} direction='right' speed={50} autoFill={true} style={{ direction: 'ltr' }}>
                הודעות חשובות למשתמשים יופיעו כאן
            </Marquee>
        </header>
    )
}