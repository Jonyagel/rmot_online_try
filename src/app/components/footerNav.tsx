'use client'
import Link from 'next/link';
import './footerNav.css';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/', text: 'בית', imgSrc: '/images/icon-logo/בית.png' },
    { href: '/neighborhoodInfo', text: 'מידע', imgSrc: '/images/icon-logo/מידע.png' },
    { href: '/forum', text: 'פורום', imgSrc: '/images/icon-logo/פורומים.png' },
    // { href: '/allFamily', text: 'משפחה', imgSrc: '/images/icon-logo/קהילה.png' },
    { href: '/nadlan', text: 'נדל"ן', imgSrc: '/images/icon-logo/נדלן.png' },
    { href: '/board', text: 'לוח', imgSrc: '/images/icon-logo/לוח.png' },
    // { href: '/contactUs', text: 'צור קשר', imgSrc: '/images/contact.png' },
];

const FooterNav = () => {

    const pathname = usePathname();

    return (
        <div className="footer-nav d-md-none">
            <nav className="footer-nav rounded-top-4">
                {navLinks.map((link, index) => (
                    <Link key={index} href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>
                        <div className="icon-container">
                            <img src={link.imgSrc} alt={link.text} className="nav-icon" />
                        </div>
                        <span>{link.text}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default FooterNav;
