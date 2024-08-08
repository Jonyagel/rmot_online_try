"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, Element } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faNewspaper, faUsers, faSchool, faBaby, faTree, faSynagogue, faShoppingCart, faHospital, faRoad, faMountain, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAnimation } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface CounterStatisticProps {
  label: string;
  endValue: string;
  icon: IconDefinition;
}

const CounterStatistic: React.FC<CounterStatisticProps> = ({ label, endValue, icon }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          });

          let start = 0;
          const end = parseInt(endValue.replace(/,/g, ''));
          const duration = 2000;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            const distance = end - start;
            const speed = Math.max(1, Math.abs(distance / 100));
            const acceleration = Math.max(0.1, Math.abs(distance / 1000)); // Adjust the acceleration factor
            start += increment * speed * acceleration;
            if (start >= end) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [endValue, controls]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center space-y-8 mb-12">
      <div className="flex items-center space-x-6">
        <FontAwesomeIcon icon={icon as IconDefinition} className="text-6xl text-yellow-300" />
        <span className="text-7xl font-bold">{count.toLocaleString()}</span>
      </div>
      <span className="text-3xl font-semibold">{label}</span>
    </div>
  );
};

const Animation: React.FC = () => {
  const sections = [
    { id: 'home', icon: faHome, title: 'בית', content: 'ברוכים הבאים לשכונת רמות, המקום שבו כל אחד מרגיש בבית! כאן תוכלו למצוא את כל המידע על הפעילויות והאירועים השונים המתרחשים אצלנו.' },
    { id: 'info', icon: faInfoCircle, title: 'מידע', content: 'גלו את כל מה שיש לדעת על השכונה שלנו. כאן תוכלו למצוא מידע על ההיסטוריה של השכונה, המסעדות, הפארקים וכל השירותים המוצעים לתושבים.' },
    { id: 'news', icon: faNewspaper, title: 'חדשות', content: 'עדכונים שוטפים על אירועים ופעילויות בשכונה. אל תפספסו שום דבר! כל החדשות האחרונות על מה שקורה אצלנו.' },
    { id: 'community', icon: faUsers, title: 'קהילה', content: 'הצטרפו לקהילה התוססת שלנו. כאן תוכלו למצוא חברים חדשים, להשתתף בפעילויות חברתיות וליהנות מהווי קהילתי שאין כמותו.' },
  ];

  const statistics: CounterStatisticProps[] = [
    { label: 'תושבים', endValue: '55,000', icon: faUsers },
    { label: 'בתי ספר', endValue: '15', icon: faSchool },
    { label: 'גני ילדים', endValue: '50', icon: faBaby },
    { label: 'פארקים', endValue: '10', icon: faTree },
    { label: 'בתי כנסת', endValue: '30', icon: faSynagogue },
    { label: 'מרכזי קניות', endValue: '5', icon: faShoppingCart },
    { label: 'מרפאות', endValue: '8', icon: faHospital },
    { label: 'קווי אוטובוס', endValue: '12', icon: faRoad },
    { label: 'גובה מעל פני הים', endValue: '885', icon: faMountain },
  ];

  useEffect(() => {
    sections.forEach((section, index) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: `#${section.id}`,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      timeline
        .fromTo(`#${section.id}-content`,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          })
        .from(`#${section.id}-icon`, {
          opacity: 0,
          scale: 0.5,
          rotation: 360,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        }, '-=0.5')
        .from(`#${section.id}-text`, {
          opacity: 0,
          x: -100,
          duration: 1,
          ease: 'back.out(1.7)',
        }, '-=0.75')
        .from(`#${section.id}-button`, {
          opacity: 0,
          y: 50,
          duration: 0.75,
          ease: 'power2.out',
        }, '-=0.5');

      // Add parallax effect
      gsap.from(`#${section.id}-bg1`, {
        scrollTrigger: {
          trigger: `#${section.id}`,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
        x: '-10%',
        y: '5%',
        scale: 1.1,
        duration: 2,
        ease: 'power2.out',
      });
      gsap.from(`#${section.id}-bg2`, {
        scrollTrigger: {
          trigger: `#${section.id}`,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
        x: '5%',
        y: '-10%',
        scale: 1.05,
        duration: 2,
        ease: 'power2.out',
      });
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen text-white relative overflow-hidden">
      <div id="home-bg1" className="absolute top-0 left-0 w-full h-full bg-center bg-cover opacity-10" style={{ backgroundImage: 'url(/bg1.jpg)' }} />
      <div id="home-bg2" className="absolute top-0 left-0 w-full h-full bg-center bg-cover opacity-10" style={{ backgroundImage: 'url(/bg2.jpg)' }} />

      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg z-50">
        <ul className="flex justify-center space-x-8 py-4">
          {sections.map((section) => (
            <li key={section.id}>
              <Link to={section.id} smooth={true} duration={500} className="text-white hover:text-yellow-300 transition-colors cursor-pointer">
                <FontAwesomeIcon icon={section.icon as IconDefinition} className="mr-2" />
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((section, index) => (
        <Element name={section.id} key={section.id} className="min-h-screen flex flex-col items-center justify-center p-8">
          <div id={`${section.id}-content`} className="max-w-3xl mx-auto text-center p-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg transform transition duration-500 hover:scale-105 relative z-10">
            <FontAwesomeIcon id={`${section.id}-icon`} icon={section.icon as IconDefinition} className="text-7xl mb-6 text-yellow-300" />
            <h2 id={`${section.id}-text`} className="text-5xl font-bold mb-4 font-serif">{section.title}</h2>
            <p className="text-2xl leading-relaxed">{section.content}</p>
            {index < sections.length - 1 && (
              <Link to={sections[index + 1].id} smooth={true} duration={500} className="no-underline inline-block mt-8 bg-yellow-300 text-purple-600 px-6 py-3 rounded-full hover:bg-white hover:text-purple-600 transition-colors cursor-pointer transform transition duration-500 hover:scale-110" id={`${section.id}-button`}>
                המשך לקרוא
              </Link>
            )}
          </div>

          {index === 0 && (
            <div className="grid grid-cols-3 gap-12 mt-16">
              {statistics.map((stat, i) => (
                <CounterStatistic key={i} label={stat.label} endValue={stat.endValue} icon={stat.icon} />
              ))}
            </div>
          )}
        </Element>
      ))}
    </div>
  );
};

export default Animation;