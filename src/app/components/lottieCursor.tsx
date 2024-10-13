import React from 'react'
import { useLottie, useLottieInteractivity } from "lottie-react";




function LottieCursor(props:any) {
    const lottieOptions = {
        animationData: props.lottieNmae,
        autoplay: false,
    }
    const lottieObj = useLottie(lottieOptions, { height: 50 })
    const lottieAnimation = useLottieInteractivity({
        lottieObj,
        mode: 'cursor',
        actions: [{
            position:{ x:[0, 1], y:[0,1]},
            type: 'play',
            frames: [0, 25]
        }]
    })
    return lottieAnimation
}

export default LottieCursor
