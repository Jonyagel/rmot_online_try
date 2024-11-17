"use client"

import Link from 'next/link'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Marquee from 'react-fast-marquee'
import './style.css'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaUser } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { useAppContext } from '../context/appContext';
import { useRouter } from 'next/navigation'

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
    const router = useRouter();

    useEffect(() => {
        checkSignIn();
    }, [isLogin]);

    useEffect(() => {
        const checkAuthAndFetch = async () => {
          const token = localStorage.getItem('token');
          if (session || token) {
            setIsLoggedIn(true);
          } else if (status !== 'loading') {
            setIsLoggedIn(false);
            router.push('/auth/login');
          }
        };
        
        checkAuthAndFetch();
      }, [session, status]);

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
        }
    }, [session, status]);

    const toggleNav = useCallback(() => {
        setIsNavOpen(prev => !prev);
    }, []);

    const navLinks = useMemo(() => [
        { href: '/', text: 'בית' },
        { href: '/neighborhoodInfo', text: 'מידע' },
        { href: '/forum', text: 'פורום' },
        { href: '/nadlan', text: 'נדל"ן' },
        { href: '/board', text: 'לוח' },
        { href: '/contactUs', text: 'צור קשר' },
    ], []);

    const announcements = useMemo(() => [
        { text: "חדש! שכונת גני אביב נפתחה להרשמה", link: "/neighborhoodInfo?cardId=66ca4a63ee088d74f9217d0b" },
        { text: "עדכון: שינויים בתנאי הזכאות לדיור בר השגה", link: "/eligibility" },
        { text: "הזדמנות אחרונה: נותרו 5 דירות אחרונות בפרויקט נווה שמש", link: "/projects/neve-shemesh" },
        { text: "סדנת מידע בנושא משכנתאות תתקיים ביום שלישי הקרוב", link: "/events/mortgage-workshop" },
        { text: "פתיחת הרשמה לתוכנית 'בית ראשון' לזוגות צעירים", link: "/programs/first-home" },
    ], []);

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="header-actions">
                        {isLoggedIn && user ? (
                            <Link href="/profile" className="avatar-link">
                                {user.image ? (
                                    <img src={user.image} width={40} height={40} className="avatar" alt="User Avatar" />
                                ) : (
                                    <div className='border border-black rounded-circle p-2'>
                                        <FaUser size={20} />
                                    </div>
                                )}
                            </Link>
                        ) : (
                              <Link href="/auth/login" className="login-link">כניסה/הרשמה</Link>
                        )}
                    </div>

                    <nav className={`navHeader ${isNavOpen ? 'nav-open' : ''}`} onMouseLeave={() => {
                        if (isNavOpen) {
                            setIsNavOpen(false);
                        }
                    }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                className={`nav-linkHeader ${pathname === link.href ? 'active' : ''}`}
                                href={link.href}
                                onClick={toggleNav}
                            >
                                {link.text}
                            </Link>
                        ))}
                    </nav>

                    <Link href="/" className="logo-link">
                        <Image src='/images/לוגו ירוק.svg' priority={true} width={120} height={120} className="logo" alt="Logo" style={{
                            width: 'auto',
                            height: '50px'
                        }}
                        />
                    </Link>
                </div>
            </div>
            <div className='marquee-container'>
                <Marquee className="marquee" pauseOnHover={true} direction='right' speed={50} gradient={false} autoFill={true} style={{ direction: 'ltr' }}>
                    {announcements.map((announcement) => (
                        <Link key={announcement.link} href={announcement.link} className="announcement-link" aria-label={announcement.text}>
                            <span className="announcement-text">{announcement.text}</span>
                            <span className="announcement-separator">|</span>
                        </Link>
                    ))}
                </Marquee>
            </div>
        </header>
    )
}
