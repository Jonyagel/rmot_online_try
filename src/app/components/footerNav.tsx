'use client';
import Link from 'next/link';
import './footerNav.css';
import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';

const navLinks = [
    { href: '/', text: 'בית', imgSrc: '/images/icon-logo/בית.png' },
    { href: '/neighborhoodInfo', text: 'מידע', imgSrc: '/images/icon-logo/מידע.png' },
    { href: '/forum', text: 'פורום', imgSrc: '/images/icon-logo/פורומים.png' },
    { href: '/nadlan', text: 'נדל"ן', imgSrc: '/images/icon-logo/נדלן.png' },
    { href: '/board', text: 'לוח', imgSrc: '/images/icon-logo/לוח.png' },
];

const FooterNav = () => {
    const pathname = usePathname();
    const [showAd, setShowAd] = useState(false);

    // Ad timer logic
    useEffect(() => {
        const showAdBanner = () => {
            setShowAd(true);
            setTimeout(() => setShowAd(false), 5000); // Hide after 5s
        };

        const timer = setInterval(showAdBanner, 30000); // Show every 30s
        return () => clearInterval(timer);
    }, []);

    const memoizedNavLinks = useMemo(() => navLinks, []);

    return (
        <div className="d-md-none">
            {/* Mobile Ad Banner */}
            {showAd && (
                <div className="fixed bottom-16 left-0 right-0 z-50 px-2">
                    <div className="bg-white rounded-lg shadow-lg p-2 relative">
                        <button 
                            onClick={() => setShowAd(false)}
                            className="absolute top-1 right-1 p-1 text-gray-500"
                        >
                            ✕
                        </button>
                        <img 
                            src="/images/saleAds.gif"
                            alt="Advertisement"
                            className="w-full rounded"
                        />
                    </div>
                </div>
            )}

            {/* Original Footer Nav */}
            <nav className="footer-nav rounded-top-4">
                {memoizedNavLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                    >
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
