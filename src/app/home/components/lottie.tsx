import React from 'react'
import { useLottie, useLottieInteractivity } from "lottie-react";




function Lottie(props:any) {
    const lottieOptions = {
        animationData: props.lottieNmae,
        autoplay: false,
    }
    const lottieObj = useLottie(lottieOptions, { height:250 })
    const lottieAnimation = useLottieInteractivity({
        lottieObj,
        mode: 'scroll',
        actions: [{
            visibility: [0.1, 0.5],
            type: 'seek',
            frames: [0, 25]
        }]
    })
    return lottieAnimation
}

export default Lottie
