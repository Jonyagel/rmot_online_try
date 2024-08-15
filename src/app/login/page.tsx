'use client'
import React, { useEffect, useState } from 'react'
import LoginForm from './components/loginForm';
// import { cookies } from 'next/headers'
import Signup from './components/signup';
import { useSession } from 'next-auth/react';


export const dynamic = 'auto';


export default function LoginPage() {
    const { data: session } = useSession();
    const [signIn, setSignIn] = useState(false);
    const [googleUser, setGoogleUser] = useState();
    useEffect(() => {
        // doApiGoogle();
        checkSignIn();
    }, []);

    const checkSignIn = async () => {
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkLogin`);
            const data = await resp.json();
            if (data.status === 401) {
                // notify();
                setSignIn(false);
            } else {
                setSignIn(true);
                // handleShow();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    // let googleUser;
    // const doApiGoogle = async () => {
    //     const url = `${process.env.NEXT_PUBLIC_API_URL}/api/getAuthUser`;
    //     const resp = await fetch(url, { cache: 'no-store' });
    //     const data = await resp.json();
    //     console.log(data);
    //     // googleUser = data.user
    //     setGoogleUser(data);
    // }
    // let isCookies: any = false

    // if (cookies().has("token")) {
    //     isCookies = true
    // }

    return (
        <div className=''>
                { signIn=== true || session ? <LoginForm /> : <Signup />
            }
            {/* <LoginForm /> */}
        </div>
    )
}
