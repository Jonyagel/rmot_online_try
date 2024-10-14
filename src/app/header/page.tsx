"use client"

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import './style.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaUser } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { useAppContext } from '../context/appContext';

interface User {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export default function Header() {
    const { data: session, status } = useSession();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const { isLogin } = useAppContext();

    useEffect(() => {
        checkSignIn();
    }, [isLogin]);

    const checkSignIn = async () => {
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkLogin`);
            const data = await resp.json();
            if (data.status === 401) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
                setUser({
                    name: data.name ?? null,
                    email: data.email ?? null,
                    image: data.image ?? null
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setIsLoggedIn(true);
            setUser({
                name: session.user.name ?? null,
                email: session.user.email ?? null,
                image: session.user.image ?? null
            });
        } else {
            // setIsLoggedIn(false);
            // setUser(null);
        }
    }, [session, status]);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const navLinks = [
        { href: '/', text: 'בית' },
        { href: '/neighborhoodInfo', text: 'מידע' },
        { href: '/forum', text: 'פורום' },
        { href: '/allFamily', text: 'קהילה' },
        { href: '/nadlan', text: 'נדל"ן' },
        { href: '/board', text: 'לוח' },
        { href: '/contactUs', text: 'צור קשר' },
    ];

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="header-actions">
                        {/* <button className={`menu-toggle ${isNavOpen ? 'active' : ''}`} onClick={toggleNav}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button> */}
                        {isLoggedIn && user ? (
                            <Link href="/userArea" className="avatar-link">
                                {user.image ? (
                                    <img src={user.image} width={40} height={40} className="avatar" alt="User Avatar" />
                                ) : (
                                    <div className='border border-black rounded-circle p-2'>
                                        <FaUser size={20} />
                                    </div>
                                )}
                            </Link>
                        ) : (
                            <Link href="/login" className="login-link">כניסה/הרשמה</Link>
                        )}
                    </div>

                    <nav className={`navHeader ${isNavOpen ? 'nav-open' : ''}`} onMouseLeave={() => {
                        if (isNavOpen) {
                            setIsNavOpen(false);
                        }
                    }}>
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                className={`nav-linkHeader ${pathname === link.href ? 'active' : ''}`}
                                href={link.href}
                                onClick={toggleNav}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </nav>

                    <Link href="/" className="logo-link">
                        <Image src='/images/לוגו ירוק.svg' width={120} height={120} className="logo" alt="Logo" />
                    </Link>
                </div>
            </div>
            <div className='marquee-container'>
                <Marquee className="marquee" pauseOnHover={true} direction='right' speed={50} gradient={false} autoFill={true} style={{ direction: 'ltr' }}>
                    הודעות חשובות למשתמשים יופיעו כאן
                </Marquee>
            </div>
        </header>
    )
}