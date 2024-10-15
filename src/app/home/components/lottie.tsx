import React, { useEffect, useState } from 'react'
import { useLottie, useLottieInteractivity } from "lottie-react";

function Lottie(props:any) {
    const [height, setHeight] = useState(250); // הוספת מצב לגובה

    useEffect(() => {
        // קביעת הגובה בהתאם לגודל המסך
        const updateHeight = () => {
            setHeight(window.innerWidth < 768 ? 130 : 250);
        };
        updateHeight(); // עדכון גובה בהתחלה
        window.addEventListener('resize', updateHeight); // הוספת מאזין לאירוע שינוי גובה

        return () => {
            window.removeEventListener('resize', updateHeight); // ניקוי המאזין
        };
    }, []);

    const lottieOptions = {
        animationData: props.lottieNmae,
        autoplay: false,
    }
    const lottieObj = useLottie(lottieOptions, { height }) // שימוש בגובה מהמצב
    const lottieAnimation = useLottieInteractivity({
        lottieObj,
        mode: 'scroll',
        actions: [{
            visibility: [0.1, 0.4],
            type: 'seek',
            frames: [0, 25]
        }]
    })
    return lottieAnimation
}

export default Lottie
