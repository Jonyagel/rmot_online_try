import React from 'react';
import { motion } from 'framer-motion';

const NotFoundAnimation = () => {
  return (
    <div style={{ 
      width: '300px', 
      height: '300px', 
      position: 'relative', 
      borderRadius: '20px', 
      overflow: 'hidden',
    }}>
      {/* זכוכית מגדלת */}
      <motion.svg
        width="180"
        height="180"
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: '40%', left: '50%', marginLeft: '-90px', marginTop: '-90px' }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: [0, 10, 0] }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.circle
          cx="40"
          cy="40"
          r="30"
          fill="none"
          stroke="#00a35b"
          strokeWidth="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.line
          x1="60"
          y1="60"
          x2="85"
          y2="85"
          stroke="#00a35b"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.75, delay: 1 }}
        />
      </motion.svg>

      {/* קווי חיפוש */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${140 + i * 35}px`,
            left: '50px',
            width: '200px',
            height: '8px',
            background: '#e0e0e0',
            borderRadius: '4px',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.75 + i * 0.2 }}
        />
      ))}

      {/* סימן X */}
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: '40%', left: '50%', marginLeft: '-60px', marginTop: '-60px' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.75 }}
      >
        {['M20,20 L80,80', 'M80,20 L20,80'].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#e55039"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 2.9 + i * 0.2 }}
          />
        ))}
      </motion.svg>

      {/* טקסט "לא נמצא" */}
      <motion.div
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#00a35b',
          position: 'absolute',
          bottom: '25px',
          width: '100%',
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3.6, duration: 0.5, ease: "easeOut" }}
      >
        לא נמצא
      </motion.div>
    </div>
  );
};

export default NotFoundAnimation;