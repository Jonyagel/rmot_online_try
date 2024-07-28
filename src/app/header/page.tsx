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
import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import './style.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

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