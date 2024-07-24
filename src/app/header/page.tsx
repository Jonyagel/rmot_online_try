// "use client"
// import Link from 'next/link'
// import React, { useState } from 'react'
// import Marquee from 'react-fast-marquee'
// import './style.css'
// import 'bootstrap-icons/font/bootstrap-icons.css';

// export default function Header() {
//     const [isNavOpen, setIsNavOpen] = useState(false);

//     const toggleNav = () => {
//         setIsNavOpen(!isNavOpen);
//     };

//     return (
//         <div className='bg-light sticky-top'>
//             <div className='container d-flex justify-content-between p-3'>
//                 <Link href={"/login"}><button className='btn btn-dark'>כניסה/הרשמה</button></Link>
//                 <div className='position-relative d-md-none'>
//                     <button className='btn btn-light' onClick={toggleNav}>
//                         <i className="bi bi-list"></i>
//                     </button>
//                     <div className={`navbar mobile-dropdown ${isNavOpen ? 'show' : ''}`}>
//                         <nav className='d-flex flex-column'>
//                             <Link className='dropdown-item mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>דף הבית</Link>
//                             <Link className='dropdown-item mx-3 text-dark link-underline link-underline-opacity-0' href={'/neighborhoodInfo'}>מידע שכונתי</Link>
//                             <Link className='dropdown-item mx-3 text-dark link-underline link-underline-opacity-0' href={'/forum'}>פורומים</Link>
//                             <Link className='dropdown-item mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>לכל המשפחה</Link>
//                             <Link className='dropdown-item mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>נדלן</Link>
//                             <Link className='dropdown-item mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>לוח</Link>
//                             <Link className='dropdown-item mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>צור קשר</Link>
//                         </nav>
//                     </div>
//                 </div>
//                 <div className='navbar d-none d-md-block'>
//                     <nav className='d-flex align-items-center'>
//                         <Link className='mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>דף הבית</Link>
//                         <Link className='mx-3 text-dark link-underline link-underline-opacity-0' href={'/neighborhoodInfo'}>מידע שכונתי</Link>
//                         <Link className='mx-3 text-dark link-underline link-underline-opacity-0' href={'/forum'}>פורומים</Link>
//                         <Link className='mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>לכל המשפחה</Link>
//                         <Link className='mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>נדלן</Link>
//                         <Link className='mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>לוח</Link>
//                         <Link className='mx-3 text-dark link-underline link-underline-opacity-0' href={'/'}>צור קשר</Link>
//                     </nav>
//                 </div>
//                 <div className='logo'>
//                     <img src='/images/logo.jpg' width={50} className='rounded-circle' />
//                 </div>
//             </div>
//             <Marquee className='bg-dark text-light' pauseOnHover={true} direction='right' autoFill={true} style={{ direction: 'ltr' }}>
//                 בסדר מצוין שלום מה קורה
//             </Marquee>
//         </div>
//     )
// }
"use client"
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import Marquee from 'react-fast-marquee'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsNavOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [navRef]);

    const NavLinks = () => (
        <>
            <Link className='nav-link' href={'/'} onClick={() => setIsNavOpen(false)}>דף הבית</Link>
            <Link className='nav-link' href={'/neighborhoodInfo'} onClick={() => setIsNavOpen(false)}>מידע שכונתי</Link>
            <Link className='nav-link' href={'/forum'} onClick={() => setIsNavOpen(false)}>פורומים</Link>
            <Link className='nav-link' href={'/'} onClick={() => setIsNavOpen(false)}>לכל המשפחה</Link>
            <Link className='nav-link' href={'/'} onClick={() => setIsNavOpen(false)}>נדלן</Link>
            <Link className='nav-link' href={'/'} onClick={() => setIsNavOpen(false)}>לוח</Link>
            <Link className='nav-link' href={'/'} onClick={() => setIsNavOpen(false)}>צור קשר</Link>
        </>
    );

    return (
        <div className='bg-light sticky-top shadow-sm'>
            <div className='container py-2'>
                <div className='row align-items-center'>
                    <div className='col-4 col-md-2 order-md-3 text-end text-md-start'>
                        <Link href={"/login"}><button className='btn btn-dark btn-sm'>כניסה/הרשמה</button></Link>
                    </div>
                    <div className='col-4 col-md-8 order-md-2 text-center position-relative'>
                        <div className='d-md-none'>
                            <button className='menu-toggle' onClick={toggleNav}>
                                <i className={`bi ${isNavOpen ? 'bi-x' : 'bi-list'}`}></i>
                            </button>
                        </div>
                        <div ref={navRef} className={`navbar-collapse ${isNavOpen ? 'show' : ''} d-md-block`}>
                            <nav className='d-flex flex-column flex-md-row justify-content-md-center align-items-center mx-auto'>
                                <NavLinks />
                            </nav>
                        </div>
                    </div>
                    <div className='col-4 col-md-2 order-md-1 text-start'>
                        <div className='logo'>
                            <img src='/images/logo.jpg' width={50} className='rounded-circle' alt="Logo" />
                        </div>
                    </div>
                </div>
            </div>
            <Marquee className='bg-dark text-light' pauseOnHover={true} direction='right' autoFill={true} style={{ direction: 'ltr' }}>
                הודעות חשובות למשתמשים יופיעו כאן
            </Marquee>
        </div>
    )
}