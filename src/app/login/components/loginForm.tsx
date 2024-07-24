// "use client"

// import React, { useRef } from 'react'
// import { useRouter } from 'next/navigation';

// export const dynamic = 'auto';

// export default function LoginForm() {

//   const router = useRouter();

//   let emailRef: any = useRef()
//   let passRef: any = useRef()


//   const doApi = async (e: any) => {
//     e.preventDefault();

//     const email:any = emailRef.current.value;
//     const password:any = passRef.current.value;




//     const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,{
//       method: 'POST',
//       body:JSON.stringify({ email, password }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     const data = await resp.json();
//     console.log(data);
//     router.push('/')
//   }




//   return (
//     <div>
//       <div className='w-50 bg-secondary bg-opacity-50 mx-auto text-center rounded shadow p-3'>
//         <form onSubmit={doApi} className='w-50 mx-auto'>
//           <label>email:</label>
//           <input ref={emailRef} className='form-control mx-auto mb-3' type='email' placeholder='enter your email...'></input>
//           <label>password:</label>
//           <input ref={passRef} className='form-control mx-auto mb-3' type='password' placeholder='enter your password...'></input>
//           <button className='btn btn-danger' type='submit' onSubmit={doApi}>send</button>
//         </form>
//       </div>
//     </div>
//   )
// }

"use client"

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import './loginForm.css'; // CSS מותאם אישית
import Link from 'next/link';

export const dynamic = 'auto';

export default function LoginForm() {
  const router = useRouter();

  const emailRef:any = useRef();
  const passRef:any = useRef();

  const doApi = async (e:any) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passRef.current.value;

    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await resp.json();
    console.log(data);
    router.push('/');
  }

  return (
    <div className='login-container'>
      <div className='login-form bg-light shadow p-5 rounded'>
        <h2 className='text-center mb-2'>Welcome back</h2>
        <p className='text-center mb-4'>Welcome back! Please enter your details.</p>
        <form onSubmit={doApi}>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input ref={emailRef} className='form-control' type='email' placeholder='Enter your email' required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input ref={passRef} className='form-control' type='password' placeholder='Password' required />
          </div>
          <div className='text-end mb-3'>
            <Link href='#' className='text-decoration-none'>Forgot password</Link>
          </div>
          <button className='btn btn-primary w-100 mb-3' type='submit'>Login</button>
          <button className='btn btn-outline-dark w-100 block'>
          <i className="bi bi-google"></i>
          <p className='m-0'>Sign in with Google</p>  
          </button>
        </form>
        <p className='text-center mt-3'>
          Don't have an account? <Link href='#' className='text-decoration-none'>Sign up for free</Link>
        </p>
      </div>
    </div>
  );
}
