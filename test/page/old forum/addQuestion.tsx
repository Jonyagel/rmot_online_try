// "use client"

// import { useRouter } from 'next/navigation';
// import React, { useEffect, useRef, useState } from 'react';
// import { CldImage } from 'next-cloudinary';
// import { CldUploadButton } from 'next-cloudinary';
// import { sources } from 'next/dist/compiled/webpack/webpack';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// export const dynamic = 'auto';
// export default function AddQuestion(props: any) {
//     const router = useRouter();
//     const topicRef: any = useRef();
//     const tittleRef: any = useRef();
//     const descriptionRef: any = useRef();
//     const [signIn, setSignIn] = useState(false);

//     const [addForum, setAddForum] = useState(false);
//     // const [fileNameAr, setFileName] = useState([]);
//     const [fileName, setFileName] = useState("");
//     // let fileNameAr:any = [];

//     const notify = () => toast.error("אתה צריך להירשם");


//     const doApi = async (e: any) => {
//         e.preventDefault();

//         const topic = topicRef.current.value;
//         const tittle = tittleRef.current.value;
//         const description = descriptionRef.current.value;
//         const numOfComments = 0

//         // console.log(topic, tittle, description);
//         try {
//             const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum`, {
//                 method: 'POST',
//                 body: JSON.stringify({ topic, tittle, description, numOfComments, fileName }),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             const data = await resp.json();
//             console.log(data);
//             // console.log(topic, tittle, description);
//             openForm()
//             props.doApi();
//             router.push('/forum');
//             props.setAddForum(!props.addForum)
//         }
//         catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     const checkSignIn = async () => {
//         try {
//             const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkLogin`);
//             const data = await resp.json();
//             console.log(data);
//             if (data.status === 401) {
//                 notify();
//                 setSignIn(false);
//             }
//             else {
//                 setSignIn(true);
//                 openForm();
//             }
//         }
//         catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     const handleUpload = (result: any) => {
//         if (result.event === 'success') {
//             const publicId = result.info.public_id;
//             // Extract the file name from the public_id
//             const fileName = publicId.split('/').pop(); // Extracts the file name
//             console.log('Uploaded file name:', fileName);
//             // setFileName(fileName);
//             setFileName(fileName);
//             // fileNameAr.push(fileName);
//             // console.log('File uploaded successfully' + fileNameAr);
//         }
//     };

//     const closeForm = () => {
//         setAddForum(false);
//     }


//     const openForm = () => {
//         setAddForum(!addForum);
//     }

//     return (
//         <div>
//             <button onClick={() => {
//                 checkSignIn();
//                 if (signIn) {
//                     openForm();
//                 }
//             }} className='btn btn-info rounded-circle shadow-sm m-4 w-auto'>
//                 <h2 className=" bi bi-plus-lg w-auto m-2"></h2>
//             </button>

//             {addForum && (
//                 <div className='position-fixed top-0 start-0 bg-dark bg-opacity-25 vw-100 vh-100 container-fluid justify-content-center align-content-center z-2'>
//                     <div className='bg-info w-25 vh-50 mx-auto text-center p-5 rounded-4 shadow position-relative'>
//                         <button onClick={closeForm} className="btn-close position-absolute top-0 end-0 m-2" aria-label="Close"></button>
//                         <form onSubmit={doApi}>
//                             <div className="form-floating m-4">
//                                 <select ref={topicRef} className="form-select">
//                                     <option defaultValue="שאלה">שאלה</option>
//                                     <option defaultValue="עזרה">עזרה</option>
//                                     <option defaultValue="בעיה">בעיה</option>
//                                     <option defaultValue="תקלה">תקלה</option>
//                                 </select>
//                                 <label >בחר נושא</label>
//                             </div>
//                             <div className="form-floating mb-3 m-4">
//                                 <input ref={tittleRef} type="text" className="form-control" />
//                                 <label >כותרת</label>
//                             </div>
//                             <div className="form-floating m-4">
//                                 <textarea ref={descriptionRef} className="form-control" ></textarea>
//                                 <label>תוכן</label>
//                             </div>

//                             <div className="container text-center m-2">
//                                 <div className="row">
//                                     <div className="col">
//                                         <CldUploadButton className='btn btn-light' uploadPreset="my_upload_test" onSuccess={handleUpload}
//                                             onError={(error) => {
//                                                 console.error('Upload error:', error);
//                                                 // Here you can show an error message to the user
//                                                 alert('Upload failed. The file might be too large or of an unsupported format.');
//                                             }}
//                                             options={{
//                                                 sources: ['local'],
//                                                 maxFileSize: 5000000, // 5MB in bytes
//                                                 maxImageWidth: 2000, // Optional: limit image width
//                                                 maxImageHeight: 2000, // Optional: limit image height
//                                                 clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'], // Optional: limit file types
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="col">

//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col">

//                                     </div>
//                                     <div className="col">

//                                     </div>
//                                     <div className="col">
//                                         <button type="submit" className="btn btn-light w-100">שלח</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>

//                 </div>
//             )}
//             <ToastContainer theme="colored" />
//         </div>
//     )
// }
// "use client"

// import { useRouter } from 'next/navigation';
// import React, { useRef, useState } from 'react';
// import { CldUploadButton } from 'next-cloudinary';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const dynamic = 'auto';

// export default function AddQuestion(props: any) {
//     const router = useRouter();
//     const topicRef = useRef<HTMLSelectElement>(null);
//     const tittleRef = useRef<HTMLInputElement>(null);
//     const descriptionRef = useRef<HTMLTextAreaElement>(null);
//     const [signIn, setSignIn] = useState(false);
//     const [addForum, setAddForum] = useState(false);
//     const [fileName, setFileName] = useState("");

//     const notify = () => toast.error("אתה צריך להירשם");

//     const doApi = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const topic = topicRef.current?.value;
//         const tittle = tittleRef.current?.value;
//         const description = descriptionRef.current?.value;
//         const numOfComments = 0;

//         try {
//             const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum`, {
//                 method: 'POST',
//                 body: JSON.stringify({ topic, tittle, description, numOfComments, fileName }),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             const data = await resp.json();
//             console.log(data);
//             closeForm();
//             props.doApi();
//             router.push('/forum');
//             props.setAddForum(!props.addForum);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     const checkSignIn = async () => {
//         try {
//             const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkLogin`);
//             const data = await resp.json();
//             if (data.status === 401) {
//                 notify();
//                 setSignIn(false);
//             } else {
//                 setSignIn(true);
//                 openForm();
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     const handleUpload = (result: any) => {
//         if (result.event === 'success') {
//             const publicId = result.info.public_id;
//             const fileName = publicId.split('/').pop();
//             setFileName(fileName);
//         }
//     };

//     const closeForm = () => setAddForum(false);
//     const openForm = () => setAddForum(!addForum);

//     return (
//         <div>
//             <button onClick={checkSignIn} className='btn btn-info rounded-circle shadow-sm m-4'>
//                 <i className="bi bi-plus-lg fs-4"></i>
//             </button>

//             {addForum && (
//                 <div className='position-fixed top-0 start-0 bg-dark bg-opacity-25 vw-100 vh-100 d-flex justify-content-center align-items-center z-2'>
//                     <div className='bg-info p-4 rounded-4 shadow position-relative' style={{ maxWidth: '90%', width: '500px' }}>
//                         <button onClick={closeForm} className="btn-close  top-0 end-0" aria-label="Close"></button>
//                         <form onSubmit={doApi} className="needs-validation" noValidate>
//                             <div className="mb-3">
//                                 <label htmlFor="topic" className="form-label">בחר נושא</label>
//                                 <select ref={topicRef} id="topic" className="form-select" required>
//                                     <option value="שאלה">שאלה</option>
//                                     <option value="עזרה">עזרה</option>
//                                     <option value="בעיה">בעיה</option>
//                                     <option value="תקלה">תקלה</option>
//                                 </select>
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="tittle" className="form-label">כותרת</label>
//                                 <input ref={tittleRef} type="text" className="form-control" id="tittle" required />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="description" className="form-label">תוכן</label>
//                                 <textarea ref={descriptionRef} className="form-control" id="description" rows={3} required></textarea>
//                             </div>
//                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                 <CldUploadButton
//                                     className='btn btn-light'
//                                     uploadPreset="my_upload_test"
//                                     onSuccess={handleUpload}
//                                     onError={(error) => {
//                                         console.error('Upload error:', error);
//                                         alert('Upload failed. The file might be too large or of an unsupported format.');
//                                     }}
//                                     options={{
//                                         sources: ['local'],
//                                         maxFileSize: 5000000,
//                                         maxImageWidth: 2000,
//                                         maxImageHeight: 2000,
//                                         clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
//                                     }}
//                                 >
//                                     העלאת תמונה
//                                 </CldUploadButton>
//                                 <button type="submit" className="btn btn-primary">שלח</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             <ToastContainer theme="colored" />
//         </div>
//     )
// }