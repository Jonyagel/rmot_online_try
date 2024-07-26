// "use client"
// import React, { useEffect, useState } from 'react'
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import AddComment from './addComment';
// import { CldImage } from 'next-cloudinary';
// import Modal from 'react-bootstrap/Modal';

// // import './style.css';

// export const dynamic = 'auto';

// export default function CommentById(props: any) {
//   const [dataForum, setDataForum] = useState(props.forumData);
//   const [dataComment, setDataComment] = useState(props.commentAr);
//   // const [isHovered, setIsHovered] = useState(false);
//   const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
//   const [commentReplying, setCommentReplying] = useState({});
//   const [replay, setReplay] = useState(false);


//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     doApiGet();
//     doApiForum();
//   }, [])


//   const doApiGet = async () => {
//     let urlGet = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/comment/${props.idForum}`
//     const respGet = await fetch(urlGet, { cache: 'no-store' });
//     const dataGet = await respGet.json();
//     let commentAr = dataGet;
//     console.log(dataGet);
//     setDataComment(commentAr);
//   }

//   const doApiForum = async () => {
//     let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/${props.idForum}`
//     const resp = await fetch(url);
//     const data = await resp.json();
//     const ForumAr = data;
//     setDataForum(ForumAr);
//     console.log(data);

//   }


//   const formatPostAgo = (date: number): string => {
//     const timePosted = Date.now() - date;
//     const minutesAgo = Math.floor(timePosted / (1000 * 60));
//     if (minutesAgo < 1) return "עכשיו";
//     if (minutesAgo < 60) return `לפני ${minutesAgo} דקות`;
//     const hoursAgo = Math.floor(minutesAgo / 60);
//     if (hoursAgo < 24) return `לפני ${hoursAgo} שעות`;
//     const daysAgo = Math.floor(hoursAgo / 24);
//     if (daysAgo < 30) return `לפני ${daysAgo} ימים`;

//     const dateTest = new Date(date * 1000); // מכפיל ב-1000 אם הזמן בשניות
//     const formatter = new Intl.DateTimeFormat('he-IL', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     });

//     return formatter.format(date);
//   }

//   const handleCommentReply = (dataComment: any, userComment: any, commentId: any) => {
//     setCommentReplying({ dataComment, userComment, commentId })
//   }



//   return (
//     <div className=''>
//       <Modal show={show} onHide={handleClose}>
//         {/* <Modal.Header closeButton>
//       </Modal.Header> */}
//         <button onClick={handleClose} className="btn-close position-absolute top-0 end-0 m-2" aria-label="Close"></button>
//         <CldImage
//           src={dataForum.fileName} // Use this sample image or upload your own via the Media Explorer
//           width="900" // Transform the image: auto-crop to square aspect_ratio
//           height="900"
//           sizes="100vw"
//           crop={{
//             type: 'fill',
//             source: true
//           }}
//           radius={30}
//           alt='#'
//           priority
//           onClick={handleShow}
//         />
//         {/* <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer> */}
//       </Modal>
//       <div key={dataForum._id} className='rounded bg-opacity-25 px-2 h-auto mt-4 mb-2'>
//         <span className="text-dark top-0 start-100 translate-middle badge shadow-sm rounded-pill bg-white text-muted" style={{ zIndex: 1 }}>
//           {dataForum.topic}
//         </span>
//         <div className='d-flex h-75 pt-2 rounded bg-light'>
//           <div className='name col-1 d-block text-center mt-4'>
//             <div className='bg-indigo-400 rounded-full w-9 h-9 mx-auto text-center'>
//               <p>{dataForum.userName[0]}</p>
//             </div>
//             {/* <h1 className='mb-0'>
//               <i className="bi bi-person-circle "></i>
//             </h1> */}
//             <p>
//               {dataForum.userName}
//             </p>
//           </div>
//           <div className='content col-9 p-2'>
//             <h5 className='mb-0' style={{ fontWeight: "bold" }}>
//               {dataForum.tittle}
//             </h5>
//             <hr className='z-1' />
//             <p style={{ whiteSpace: "pre-wrap" }}>
//               {dataForum.description}
//             </p>
//             <div className='flex'>
//               {dataForum.fileName &&
//                 <CldImage
//                   src={dataForum.fileName} // Use this sample image or upload your own via the Media Explorer
//                   width="100" // Transform the image: auto-crop to square aspect_ratio
//                   height="100"
//                   sizes="100vw"
//                   crop={{
//                     type: 'fill',
//                     source: true
//                   }}
//                   radius={100}
//                   alt='hi'
//                   // priority
//                   onClick={() => { handleShow() }}
//                 />
//               }
//             </div>
//           </div>
//           <div className='time-msg col-2 d-flex justify-content-between px-4 align-items-end mb-2'>
//             <p className='mb-0'>
//               {formatPostAgo(dataForum.date)}
//             </p>
//             <i className="bi bi-chat"> {dataForum.numOfComments} </i>
//           </div>
//         </div>
//       </div>
//       {dataComment && dataComment.map((item: any) => {
//         return (
//           <div onMouseEnter={() => setHoveredCommentId(item._id)}
//             onMouseLeave={() => setHoveredCommentId(null)}
//             key={item._id} className='d-flex rounded bg-opacity-25 px-2 h-auto mb-2 me-auto justify-content-between w-100' style={{ width: "92%" }}>
//             <div className='align-content-center w-25 text-start ps-3'>
//               <button onClick={() => {
//                 handleCommentReply(item.comment, item.userName, item._id);
//                 setReplay(true)
//               }} className='comment_on_comment btn rounded-circle' style={{ opacity: hoveredCommentId === item._id ? 1 : 0 }}><i className="bi bi-arrow-90deg-left"></i></button>
//             </div>
//             <div className='bg-light rounded col-10 p-2'>
//               {item.commentReplayId &&
//                 <div className='bg-opacity-25 rounded shadow-sm mb-2 justify-content-between d-flex' style={{ background: 'rgb(230, 230, 230)', marginRight: "7.5%" }}>
//                   <div className='d-flex'>
//                     <div className='bg-dark rounded ms-2' style={{ width: "4px", height: "100%" }}> </div>
//                     <div className=''>
//                       <p className='fw-bold m-0'>{item.commentReplayUserName}</p>
//                       <p className='m-0'>{item.commentReplayContent}</p>
//                     </div>
//                   </div>
//                 </div>
//               }
//               <div className='d-flex '>
//                 <div className='name col-1 d-block text-center mt-4'>
//                   <div className='bg-indigo-400 rounded-full w-9 h-9 mx-auto text-center'>
//                     <p>{item.userName[0]}</p>
//                   </div>
//                   {/* <h1 className='mb-0'>
//                     <i className="bi bi-person-circle "></i>
//                   </h1> */}
//                   <p>
//                     {item.userName}
//                   </p>
//                 </div>
//                 <div className='content col-9 p-2'>
//                   <p style={{ whiteSpace: "pre-wrap" }}>
//                     {item.comment}
//                   </p>
//                 </div>
//                 <div className='time-msg col-2 d-flex justify-content-between px-4 align-items-end mb-2'>
//                   <p className='mb-0'>
//                     {formatPostAgo(item.date)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )

//       })}
//       {/* <AddComment idForum={props.idForum} doApiProps={doApi} doApiForum={doApiForum} commentReplying={commentReplying} replay={replay} setReplay={setReplay} /> */}
//       <AddComment doApiGet={doApiGet} doApiForum={doApiForum} idForum={props.idForum} dataComment={dataComment} dataForum={dataForum} commentReplying={commentReplying} replay={replay} setReplay={setReplay} />
//     </div>
//   )
// }

// "use client"
// import React, { useEffect, useState } from 'react'
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import AddComment from './addComment';
// import { CldImage } from 'next-cloudinary';
// import Modal from 'react-bootstrap/Modal';

// export const dynamic = 'auto';

// export default function CommentById(props: any) {
//   const [dataForum, setDataForum] = useState(props.forumData);
//   const [dataComment, setDataComment] = useState(props.commentAr);
//   const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
//   const [commentReplying, setCommentReplying] = useState({});
//   const [replay, setReplay] = useState(false);
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     doApiGet();
//     doApiForum();
//   }, [])

//   const doApiGet = async () => {
//     let urlGet = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/comment/${props.idForum}`
//     const respGet = await fetch(urlGet, { cache: 'no-store' });
//     const dataGet = await respGet.json();
//     setDataComment(dataGet);
//   }

//   const doApiForum = async () => {
//     let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/${props.idForum}`
//     const resp = await fetch(url);
//     const data = await resp.json();
//     setDataForum(data);
//   }

//   const formatPostAgo = (date: number): string => {
//     const timePosted = Date.now() - date;
//     const minutesAgo = Math.floor(timePosted / (1000 * 60));
//     if (minutesAgo < 1) return "עכשיו";
//     if (minutesAgo < 60) return `לפני ${minutesAgo} דקות`;
//     const hoursAgo = Math.floor(minutesAgo / 60);
//     if (hoursAgo < 24) return `לפני ${hoursAgo} שעות`;
//     const daysAgo = Math.floor(hoursAgo / 24);
//     if (daysAgo < 30) return `לפני ${daysAgo} ימים`;

//     const dateTest = new Date(date);
//     const formatter = new Intl.DateTimeFormat('he-IL', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit'
//     });

//     return formatter.format(dateTest);
//   }

//   const handleCommentReply = (dataComment: any, userComment: any, commentId: any) => {
//     setCommentReplying({ dataComment, userComment, commentId })
//   }

//   return (
//     <div className='container-fluid px-2 px-md-3'>
//       <Modal show={show} onHide={handleClose} centered>
//         <button onClick={handleClose} className="btn-close position-absolute top-0 end-0 m-2 z-3" aria-label="Close"></button>
//         <CldImage
//           src={dataForum.fileName}
//           width="900"
//           height="900"
//           sizes="100vw"
//           crop={{
//             type: 'fill',
//             source: true
//           }}
//           radius={30}
//           alt='Forum Image'
//           priority
//         />
//       </Modal>

//       <div key={dataForum._id} className='rounded bg-opacity-25 px-2 h-auto mt-4 mb-2'>
//         <span className="text-dark top-0 start-100 translate-middle badge shadow-sm rounded-pill bg-white text-muted" style={{ zIndex: 1 }}>
//           {dataForum.topic}
//         </span>
//         <div className='row pt-2 rounded bg-light'>
//           <div className='col-12 col-md-1 text-center mt-4'>
//             <div className='bg-indigo-400 rounded-circle d-inline-block' style={{ width: '2.5rem', height: '2.5rem', lineHeight: '2.5rem' }}>
//               <p className='m-0'>{dataForum.userName[0]}</p>
//             </div>
//             <p className='mt-2'>{dataForum.userName}</p>
//           </div>
//           <div className='col-12 col-md-9 p-2'>
//             <h5 className='mb-0 fw-bold'>{dataForum.tittle}</h5>
//             <hr />
//             <p style={{ whiteSpace: "pre-wrap" }}>{dataForum.description}</p>
//             {dataForum.fileName &&
//               <div className='text-center'>
//                 <CldImage
//                   src={dataForum.fileName} // Use this sample image or upload your own via the Media Explorer
//                   width="100" // Transform the image: auto-crop to square aspect_ratio
//                   height="100"
//                   sizes="100vw"
//                   crop={{
//                     type: 'fill',
//                     source: true
//                   }}
//                   radius={100}
//                   alt='hi'
//                   // priority
//                   onClick={() => { handleShow() }}
//                 />
//               </div>
//             }
//           </div>
//           <div className='col-12 col-md-2 d-flex justify-content-between px-4 align-items-end mb-2'>
//             <p className='mb-0'>{formatPostAgo(dataForum.date)}</p>
//             <i className="bi bi-chat"> {dataForum.numOfComments} </i>
//           </div>
//         </div>
//       </div>

//       {dataComment && dataComment.map((item: any) => (
//         <div
//           key={item._id}
//           className='row rounded bg-opacity-25 px-2 h-auto mb-2 mx-0'
//           onMouseEnter={() => setHoveredCommentId(item._id)}
//           onMouseLeave={() => setHoveredCommentId(null)}
//         >
//           <div className='col-12 col-md-2 text-start ps-3 mb-2 mb-md-0 flex align-items-center justify-content-end'>
//             <button
//               onClick={() => {
//                 handleCommentReply(item.comment, item.userName, item._id);
//                 setReplay(true);
//               }}
//               className='comment_on_comment btn rounded-circle '
//               style={{ opacity: hoveredCommentId === item._id ? 1 : 0 }}
//             >
//               <i className="bi bi-arrow-90deg-left"></i>
//             </button>
//           </div>
//           <div className='col-12 col-md-10 bg-light rounded p-2'>
//             {item.commentReplayId &&
//               <div className='bg-opacity-25 rounded shadow-sm mb-2 p-2' style={{ background: 'rgb(230, 230, 230)' }}>
//                 <p className='fw-bold m-0'>{item.commentReplayUserName}</p>
//                 <p className='m-0'>{item.commentReplayContent}</p>
//               </div>
//             }
//             <div className='row'>
//               <div className='col-2 col-md-1 text-center'>
//                 <div className='bg-indigo-400 rounded-circle d-inline-block' style={{ width: '2rem', height: '2rem', lineHeight: '2rem' }}>
//                   <p className='m-0'>{item.userName[0]}</p>
//                 </div>
//                 <p className='mt-1 small'>{item.userName}</p>
//               </div>
//               <div className='col-10 col-md-9'>
//                 <p style={{ whiteSpace: "pre-wrap" }}>{item.comment}</p>
//               </div>
//               <div className='col-12 col-md-2 text-end'>
//                 <p className='mb-0 small'>{formatPostAgo(item.date)}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       <AddComment
//         doApiGet={doApiGet}
//         doApiForum={doApiForum}
//         idForum={props.idForum}
//         dataComment={dataComment}
//         dataForum={dataForum}
//         commentReplying={commentReplying}
//         replay={replay}
//         setReplay={setReplay}
//       />
//     </div>
//   )
// }

"use client"
import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddComment from './addComment';
import { CldImage } from 'next-cloudinary';
import { Card, Badge, Button, Modal } from 'react-bootstrap';
import './commentById.css'
import Link from 'next/link';

export const dynamic = 'auto';

export default function CommentById(props: any) {
  const [dataForum, setDataForum] = useState(props.forumData);
  const [dataComment, setDataComment] = useState(props.commentAr);
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
  const [commentReplying, setCommentReplying] = useState({});
  const [replay, setReplay] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    doApiGet();
    doApiForum();
  }, [])

  const doApiGet = async () => {
    let urlGet = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/comment/${props.idForum}`
    const respGet = await fetch(urlGet, { cache: 'no-store' });
    const dataGet = await respGet.json();
    setDataComment(dataGet);
  }

  const scrollToComment = (commentId: any) => {
    const element = document.getElementById(commentId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight');
      setTimeout(() => element.classList.remove('highlight'), 2000);
    }
  }

  const doApiForum = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/${props.idForum}`
    const resp = await fetch(url);
    const data = await resp.json();
    setDataForum(data);
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

    const dateTest = new Date(date);
    const formatter = new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    return formatter.format(dateTest);
  }

  const handleCommentReply = (dataComment: any, userComment: any, commentId: any) => {
    setCommentReplying({ dataComment, userComment, commentId })
  }

  return (
    <div className='container mt-5'>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body className="p-0">
          <button onClick={handleClose} className="btn-close position-absolute top-0 end-0 m-3 z-3" aria-label="Close"></button>
          <CldImage
            src={dataForum.fileName}
            width="900"
            height="900"
            sizes="100vw"
            crop={{
              type: 'fill',
              source: true
            }}
            className="rounded"
            alt='Forum Image'
            priority
          />
        </Modal.Body>
      </Modal>

        <Card className='shadow-sm hover-card mb-3'>
          <Card.Body>
            <div className='d-flex justify-content-between align-items-start mb-3'>
              <div className='d-flex'>
                <div className='text-center me-3'>
                  <div className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-1' style={{ width: '40px', height: '40px' }}>
                    <h5 className='m-0'>{dataForum.userName[0]}</h5>
                  </div>
                  <small className='text-muted'>{dataForum.userName}</small>
                </div>
                <div className='d-flex flex-column justify-content-center'>
                  <h5 className='mb-0 fw-bold'>{dataForum.tittle}</h5>
                  <Card.Text className='mt-2' style={{ whiteSpace: "pre-wrap" }}>
                    {dataForum.description}
                  </Card.Text>
                </div>
              </div>
              <Badge bg='secondary' className="ms-2 align-self-start">{dataForum.topic}</Badge>
            </div>
            {dataForum.fileName && (
              <div className="mb-3">
                <CldImage
                  src={dataForum.fileName}
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
                  onClick={handleShow}
                />
              </div>
            )}
            <div className='d-flex justify-content-between align-items-center'>
              <div >
                <i className="bi bi-chat-dots me-2"></i>
                {dataForum.numOfComments} תגובות
              </div>
              <small className='text-muted'><i className="bi bi-clock me-1"></i>{formatPostAgo(dataForum.date)}</small>
            </div>
          </Card.Body>
        </Card>

      <div className="d-flex flex-column align-items-end">
        {dataComment && dataComment.map((item: any) => (
          <Card
            key={item._id}
            id={`comment-${item._id}`}
            className="mb-3 shadow-sm hover-card position-relative"
            onMouseEnter={() => setHoveredCommentId(item._id)}
            onMouseLeave={() => setHoveredCommentId(null)}
            style={{ width: '95%' }}
          >
            <Card.Body>
              {item.commentReplayId &&
                <Card
                  className="bg-light mb-3 border-0 cursor-pointer"
                  onClick={() => scrollToComment(`comment-${item.commentReplayId}`)}
                >
                  <Card.Body className="p-2">
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <div className='bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center' style={{ width: '30px', height: '30px' }}>
                          <h6 className='m-0'>{item.commentReplayUserName[0]}</h6>
                        </div>
                      </div>
                      <div>
                        <h6 className="mb-0 font-weight-bold">{item.commentReplayUserName}</h6>
                        <p className="mb-0 text-muted small">{item.commentReplayContent}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              }
              <div className="d-flex">
                <div className="me-3">
                  <div className='bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center' style={{ width: '40px', height: '40px' }}>
                    <h5 className='m-0'>{item.userName[0]}</h5>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 font-bold">{item.userName}</h6>
                  <p className="mb-1" style={{ whiteSpace: "pre-wrap" }}>{item.comment}</p>
                  {item.fileName && (
                    <div className="mt-2 mb-2">
                      <CldImage
                        src={item.fileName}
                        width="200"
                        height="200"
                        sizes="100vw"
                        crop={{
                          type: 'fill',
                          source: true
                        }}
                        className="rounded cursor-pointer"
                        alt='Comment Image'
                        onClick={handleShow}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>{formatPostAgo(item.date)}
                  </small>
                </div>
              </div>
            </Card.Body>
            <Button
              variant="link"
              className="position-absolute"
              style={{
                top: '50%',
                right: '-40px',
                transform: 'translateY(-50%)',
                opacity: hoveredCommentId === item._id ? 1 : 0,
                transition: 'opacity 0.3s ease',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: '#6c757d'
              }}
              onClick={() => {
                handleCommentReply(item.comment, item.userName, item._id);
                setReplay(true);
              }}
            >
              <i className="bi bi-reply"></i>
            </Button>
          </Card>
        ))}
      </div>

      <AddComment
        doApiGet={doApiGet}
        doApiForum={doApiForum}
        idForum={props.idForum}
        dataComment={dataComment}
        dataForum={dataForum}
        commentReplying={commentReplying}
        replay={replay}
        setReplay={setReplay}
      />
    </div>
  )
}
