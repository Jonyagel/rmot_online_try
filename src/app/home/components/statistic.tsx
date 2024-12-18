import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBaby, faHospital, faRoad, faSchool, faShoppingCart, faSynagogue, faTree, faUsers } from '@fortawesome/free-solid-svg-icons';
import './statistic.css'

interface CounterStatisticProps {
    label: string;
    endValue: string;
    icon: string;
}

const statistics: CounterStatisticProps[] = [
    { label: 'תושבים', endValue: '55000', icon: 'person' },
    { label: 'בתי ספר', endValue: '15', icon: 'backpack' },
    { label: 'גני ילדים', endValue: '50', icon: 'dice-5' },
    { label: 'פארקים', endValue: '10', icon: 'tree' },
    { label: 'בתי כנסת', endValue: '30', icon: 'book' },
    { label: 'מרכזי קניות', endValue: '5', icon: 'cart' },
    { label: 'מרפאות', endValue: '8', icon: 'h-circle' },
    { label: 'קווי אוטובוס', endValue: '12', icon: 'bus-front' },
];

export default function Statistic() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="statistics-group pb-28 mt-4">
            {statistics.map((stat, index) => (
                <CounterStatistic key={index} {...stat} inView={inView} ref={ref} />
            ))}
        </div>
    );
}

const CounterStatistic = React.forwardRef<HTMLDivElement, CounterStatisticProps & { inView: boolean }>(
    ({ label, endValue, icon, inView }, ref) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (inView) {
                let start = 0;
                const end = parseInt(endValue.replace(/,/g, ''));
                const duration = 2000;
                const increment = end / (duration / 16);

                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        clearInterval(timer);
                        setCount(end);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);

                return () => clearInterval(timer);
            }
        }, [inView, endValue]);

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="statistic-item text-center"
            >
                   <i className={`bi bi-${icon} statistic-icon`} style={{color:'#00a35b '}}></i>
                <div className="statistic-value">{count.toLocaleString()}</div>
                <div className="statistic-label font-bold">{label}</div>
            </motion.div>
        );
    }
);

CounterStatistic.displayName = 'CounterStatistic';