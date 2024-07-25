// "use client"

// import React, { useEffect, useState } from 'react'
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import AddQuestion from './addQuestion';
// import Link from 'next/link';
// import { CldImage } from 'next-cloudinary';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

// export const dynamic = 'force-dynamic';

// export default function ShowForum(props: any) {

//     const [addForum, setAddForum] = useState(false);
//     const [forum_ar, setForum_ar] = useState(props.forumData);

//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     // useEffect(() => {
//     //     props.doApi();
//     // }, [addForum])

//     async function doApi() {
//         let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum`;
//         const resp = await fetch(url, { cache: 'no-store' });
//         const data = await resp.json();
//         console.log(data);
//         setForum_ar(data);
//     }


//     const formatPostAgo = (date: number): string => {
//         const timePosted = Date.now() - date;
//         const minutesAgo = Math.floor(timePosted / (1000 * 60));
//         if (minutesAgo < 1) return "עכשיו";
//         if (minutesAgo < 60) return `לפני ${minutesAgo} דקות`;
//         const hoursAgo = Math.floor(minutesAgo / 60);
//         if (hoursAgo < 24) return `לפני ${hoursAgo} שעות`;
//         const daysAgo = Math.floor(hoursAgo / 24);
//         if (daysAgo < 30) return `לפני ${daysAgo} ימים`;

//         const dateTest = new Date(date * 1000); // מכפיל ב-1000 אם הזמן בשניות
//         const formatter = new Intl.DateTimeFormat('he-IL', {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit'
//         });

//         return formatter.format(date);
//     }

//     return (
//         <div className='container'>

//             <div className='tittle text-center d-flex align-items-center justify-content-center z-1 mt-3'>
//                 <p> תושבי רמות אחד בשביל השני<br />
//                     שואלים, עונים...וכו וכו מילים של רחלי...</p>
//             </div>
//             <AddQuestion setAddForum={setAddForum} addForum={addForum} doApi={doApi} />
//             <div>
//                 {forum_ar.map((item: any) => {
//                     return (
//                         <Link key={item._id} href={`/forum/comment/${item._id}`} className='link-underline link-underline-opacity-0 text-black'>
//                             <div className='bg-info rounded bg-opacity-25 pb-2 px-2 h-auto mb-4'>
//                                 <span className="text-dark top-0 start-100 translate-middle badge shadow-sm rounded-pill bg-white text-muted" style={{ zIndex: 1 }}>
//                                     {item.topic}
//                                 </span>
//                                 <div className='d-flex h-75 pt-2 rounded bg-light'>
//                                     <div className='name col-1 d-block text-center mt-4'>
//                                         <Link href={'/'} className='text-dark link-underline link-underline-opacity-0'> <div className='bg-indigo-400 rounded-full w-9 h-9 mx-auto text-center'>
//                                             <p>{item.userName[0]}</p>
//                                         </div>
//                                         </Link>
//                                         {/* <h1 className='mb-0'>
//                                         <i className="bi bi-person-circle "></i>
//                                     </h1> */}
//                                         <p>
//                                             {item.userName}
//                                         </p>
//                                     </div>
//                                     <div className='content col-9 p-2'>
//                                         <h5 className='mb-0' style={{ fontWeight: "bold" }}>
//                                             {item.tittle}
//                                         </h5>
//                                         <hr className='z-1' />
//                                         <p style={{ whiteSpace: "pre-wrap" }}>
//                                             {item.description}
//                                         </p>
//                                         <div className='flex'>
//                                             {item.fileName &&
//                                                 <CldImage
//                                                     src={item.fileName} // Use this sample image or upload your own via the Media Explorer
//                                                     width="100" // Transform the image: auto-crop to square aspect_ratio
//                                                     height="100"
//                                                     sizes="100vw"
//                                                     crop={{
//                                                         type: 'fill',
//                                                         source: true
//                                                     }}
//                                                     radius={100}
//                                                     alt='#'
//                                                     priority
//                                                     onClick={handleShow}
//                                                 />
//                                             }
//                                         </div>
//                                     </div>
//                                     <div className='time-msg col-2 d-flex justify-content-between px-4 align-items-end mb-2'>
//                                         <p className='mb-0'>
//                                             {formatPostAgo(item.date)}
//                                         </p>
//                                         <i className="bi bi-chat"> {item.numOfComments} </i>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Link>

//                     )
//                 })}

//             </div>

//         </div>
//     )
// }


// "use client"

// import React, { useEffect, useState } from 'react'
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import AddQuestion from './addQuestion';
// import Link from 'next/link';
// import { CldImage } from 'next-cloudinary';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Popover from 'react-bootstrap/Popover';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

// export const dynamic = 'force-dynamic';

// export default function ShowForum(props: any) {
//     const [addForum, setAddForum] = useState(false);
//     const [forum_ar, setForum_ar] = useState(props.forumData);
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     async function doApi() {
//         let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum`;
//         const resp = await fetch(url, { cache: 'no-store' });
//         const data = await resp.json();
//         console.log(data);
//         setForum_ar(data);
//     }

//     const formatPostAgo = (date: number): string => {
//         const timePosted = Date.now() - date;
//         const minutesAgo = Math.floor(timePosted / (1000 * 60));
//         if (minutesAgo < 1) return "עכשיו";
//         if (minutesAgo < 60) return `לפני ${minutesAgo} דקות`;
//         const hoursAgo = Math.floor(minutesAgo / 60);
//         if (hoursAgo < 24) return `לפני ${hoursAgo} שעות`;
//         const daysAgo = Math.floor(hoursAgo / 24);
//         if (daysAgo < 30) return `לפני ${daysAgo} ימים`;

//         const dateTest = new Date(date * 1000); // מכפיל ב-1000 אם הזמן בשניות
//         const formatter = new Intl.DateTimeFormat('he-IL', {
//             year: 'numeric',
//             month: '2-digit',
//             day: '2-digit'
//         });

//         return formatter.format(date);
//     }

//     const popover = (userName:any) => {
//         return(
//         <Popover id="popover-basic">
//             <Popover.Header></Popover.Header>
//             <h1>{userName}</h1>

//         </Popover>
//         )
//     };

//     return (
//         <div className='container'>
//             <div className='title text-center mt-3 mb-4'>
//                 <p className='h5'> תושבי רמות אחד בשביל השני<br />
//                     שואלים, עונים...וכו וכו מילים של רחלי...</p>
//             </div>
//             <AddQuestion setAddForum={setAddForum} addForum={addForum} doApi={doApi} />
//             <div className='row'>
//                 {forum_ar.map((item: any) => {
//                     return (
//                         <div className='col-12 mb-4' key={item._id}>
//                             <Link href={`/forum/comment/${item._id}`} className='link-underline link-underline-opacity-0 text-black'>
//                                 <div className='bg-info rounded bg-opacity-25 p-4 pb-2 h-100 position-relative'>
//                                     <span className="position-absolute top-0 start-110 translate-middle badge rounded-pill bg-white text-muted">
//                                         {item.topic}
//                                     </span>
//                                     <div className='row h-100 bg-light rounded p-2'>
//                                         <div className='col-2 col-md-1 text-center'>
//                                             <OverlayTrigger trigger="hover" placement="top" overlay={popover(item.userName)}>
//                                                 <div className='text-dark link-underline link-underline-opacity-0'>
//                                                     <div className='bg-indigo-400 rounded-circle d-flex align-items-center justify-content-center mx-auto' style={{ width: '40px', height: '40px' }}>
//                                                         <p className='m-0'>{item.userName[0]}</p>
//                                                     </div>
//                                                 </div>
//                                             </OverlayTrigger>

//                                             <p className='small mt-2 d-none d-md-block'>
//                                                 {item.userName}
//                                             </p>
//                                         </div>
//                                         <div className='col-10 col-md-9'>
//                                             <h5 className='mb-2 fw-bold'>
//                                                 {item.tittle}
//                                             </h5>
//                                             <hr className='my-2' />
//                                             <p className='mb-2' style={{ whiteSpace: "pre-wrap" }}>
//                                                 {item.description}
//                                             </p>
//                                             {item.fileName &&
//                                                 <CldImage
//                                                     src={item.fileName}
//                                                     width="100"
//                                                     height="100"
//                                                     sizes="100vw"
//                                                     crop={{
//                                                         type: 'fill',
//                                                         source: true
//                                                     }}
//                                                     className="rounded-circle"
//                                                     alt='תמונה מצורפת'
//                                                     priority
//                                                     onClick={handleShow}
//                                                 />
//                                             }
//                                         </div>
//                                         <div className='col-12 col-md-2 d-flex justify-content-between align-items-end mt-2 mt-md-0'>
//                                             <p className='mb-0 small'>
//                                                 {formatPostAgo(item.date)}
//                                             </p>
//                                             <span><i className="bi bi-chat"></i> {item.numOfComments}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }

"use client"

import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddQuestion from './addQuestion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { Card, Badge, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './showForum.css'

export const dynamic = 'force-dynamic';

export default function ShowForum(props: any) {
    const [addForum, setAddForum] = useState(false);
    const [forum_ar, setForum_ar] = useState(props.forumData);

    const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    
        async function doApi() {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum`;
            const resp = await fetch(url, { cache: 'no-store' });
            const data = await resp.json();
            console.log(data);
            setForum_ar(data);
        }
    
        const formatPostAgo = (date: number): string => {
            const timePosted = Date.now() - date;
            const minutesAgo = Math.floor(timePosted / (1000 * 60));
            if (minutesAgo < 1) return "עכשיו";
            if (minutesAgo < 60) return `לפני ${minutesAgo} דקות`;
            const hoursAgo = Math.floor(minutesAgo / 60);
            if (hoursAgo < 24) return `לפני ${hoursAgo} שעות`;
            const daysAgo = Math.floor(hoursAgo / 24);
            if (daysAgo < 30) return `לפני ${daysAgo} ימים`;
    
            const dateTest = new Date(date * 1000); // מכפיל ב-1000 אם הזמן בשניות
            const formatter = new Intl.DateTimeFormat('he-IL', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
    
            return formatter.format(date);
        }
    
        const popover = (userName:any) => {
            return(
            <Popover id="popover-basic" className='p-2'>
                <Popover.Header></Popover.Header>
                <h2>{userName}</h2>
    
            </Popover>
            )
        };
    

    return (
        <div className='container'>
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='title text-center mt-5 mb-4'
            >
                <h2 className='display-4 fw-bold text-primary'>פורום תושבי רמות</h2>
                <p className='lead text-muted'>שואלים, עונים, ומחברים את הקהילה</p>
            </motion.div>
            
            <AddQuestion setAddForum={setAddForum} addForum={addForum} doApi={doApi} />
            
            <div className='row'>
                {forum_ar.map((item: any) => (
                    <motion.div 
                        className='col-12 mb-4' 
                        key={item._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link href={`/forum/comment/${item._id}`} className='text-decoration-none'>
                            <Card className='shadow-sm hover-card'>
                                <Card.Body>
                                    <Badge bg="info" className="mb-2">{item.topic}</Badge>
                                    <div className='d-flex align-items-center mb-3'>
                                        <OverlayTrigger
                                            trigger="hover"
                                            placement="top"
                                            overlay={popover(item.userName)}
                                        >
                                            <div className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3' style={{ width: '50px', height: '50px' }}>
                                                <h4 className='m-0'>{item.userName[0]}</h4>
                                            </div>
                                        </OverlayTrigger>
                                        <div>
                                            <h5 className='mb-0 fw-bold'>{item.tittle}</h5>
                                            <small className='text-muted'>{formatPostAgo(item.date)}</small>
                                        </div>
                                    </div>
                                    <Card.Text className='mb-3' style={{ whiteSpace: "pre-wrap" }}>
                                        {item.description}
                                    </Card.Text>
                                    {item.fileName && (
                                        <CldImage
                                            src={item.fileName}
                                            width="100"
                                            height="100"
                                            sizes="100vw"
                                            crop={{
                                                type: 'fill',
                                                source: true
                                            }}
                                            className="rounded"
                                            alt='תמונה מצורפת'
                                            priority
                                        />
                                    )}
                                    <div className='d-flex justify-content-between align-items-center mt-3'>
                                        <Button variant="outline-primary" size="sm">
                                            <i className="bi bi-chat-dots me-2"></i>
                                            {item.numOfComments} תגובות
                                        </Button>
                                        <small className='text-muted'>
                                            <i className="bi bi-clock me-1"></i>
                                            {formatPostAgo(item.date)}
                                        </small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}