'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import './notFound.css'
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMap, faSearch, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import NotFoundAnimation from './notFound/notFoundComps';

const NotFoundPage: React.FC = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };
    return (
        <div className="not-found-container">
            <div className="not-found-content m-4">
                <div className="not-found-left shadow">
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="not-found-icon"
                    >
                        <FontAwesomeIcon icon={faExclamationTriangle} size="4x" />
                    </motion.div>
                    <h1>404</h1>
                    <h2>אופס! נראה שהלכת לאיבוד ברמות...</h2>
                    <p>גם לתושבי רמות הוותיקים ביותר קורה לפעמים. בוא נחזור יחד למסלול!</p>
                    <div className="not-found-links">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="not-found-link"
                            onClick={() => handleNavigation('/')}
                        >
                            <FontAwesomeIcon icon={faHome} /> חזרה הביתה
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="not-found-link"
                            onClick={() => handleNavigation('/neighborhoodInfo')}
                        >
                            <FontAwesomeIcon icon={faMap} /> מפת השכונה
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="not-found-link"
                            onClick={() => handleNavigation('/search')}
                        >
                            <FontAwesomeIcon icon={faSearch} /> חיפוש
                        </motion.div>
                    </div>
                </div>
                <div className="not-found-right">
                <NotFoundAnimation />
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;