// "use client"

// import React, { useRef } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/navigation'

// export const dynamic = 'auto';


// export default function Signup() {
//     const router = useRouter();

//     let nameRef: any = useRef()
//     let emailRef: any = useRef()
//     let passRef: any = useRef()


//     const doApi = async (e: any) => {
//         e.preventDefault();

//         const name = nameRef.current.value;
//         const email = emailRef.current.value;
//         const password = passRef.current.value;


//         const resp = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/users`,{
//             method: 'POST',
//             body:JSON.stringify( { name, email, password }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         const data = await resp.json();
//         console.log(data);
//         router.push('/')
//     }




//     return (
//         <div>
//             <div className='w-50 bg-secondary bg-opacity-50 mx-auto text-center rounded shadow p-3'>
//                 <form onSubmit={doApi} className='w-50 mx-auto'>
//                     <label>name:</label>
//                     <input ref={nameRef} className='form-control mx-auto mb-3' type='text' placeholder='enter your name...'></input>
//                     <label>email:</label>
//                     <input ref={emailRef} className='form-control mx-auto mb-3' type='email' placeholder='enter your email...'></input>
//                     <label>password:</label>
//                     <input ref={passRef} className='form-control mx-auto mb-3' type='password' placeholder='enter your password...'></input>
//                     <button className='btn btn-danger' type='submit' onSubmit={doApi}>send</button>
//                 </form>
//             </div>
//         </div>
//     )
// }


"use client"

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import './signup.css'; // CSS מותאם אישית
import Link from 'next/link';

export const dynamic = 'auto';

export default function Signup() {
  const router = useRouter();

  const nameRef: any = useRef();
  const emailRef: any = useRef();
  const passRef: any = useRef();

  const doApi = async (e: any) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await resp.json();
    console.log(data);
    router.push('/');
  }

  return (
    <div className='signup-container'>
      <div className='signup-form bg-light shadow p-5 rounded'>
        <h2 className='text-center mb-2'>Join us today</h2>
        <p className='text-center mb-4'>Please enter your details to create an account.</p>
        <form onSubmit={doApi}>
          <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input ref={nameRef} className='form-control' type='text' placeholder='Enter your name' required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input ref={emailRef} className='form-control' type='email' placeholder='Enter your email' required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input ref={passRef} className='form-control' type='password' placeholder='Password' required />
          </div>
          <button className='btn btn-primary w-100 mb-3' type='submit'>Sign Up</button>
          <button className='btn btn-outline-dark w-100 block' type='button'>
            <i className="bi bi-google"></i>
            <p className='m-0'>Sign up with Google</p>  
          </button>
        </form>
        <p className='text-center mt-3'>
          Already have an account? <Link href='/login' className='text-decoration-none'>Login here</Link>
        </p>
      </div>
    </div>
  );
}

