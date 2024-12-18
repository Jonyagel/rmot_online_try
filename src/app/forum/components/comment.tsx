"use client"
import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddComment from './addComment';
import { CldImage } from 'next-cloudinary';
import { Card, Badge, Button, Modal } from 'react-bootstrap';
import './comment.css'
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const dynamic = 'auto';

export default function CommentById(props: any) {
  const [dataForum, setDataForum] = useState(props.forumData);
  const [dataComment, setDataComment] = useState(props.commentAr);
  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);
  const [commentReplying, setCommentReplying] = useState({});
  const [replay, setReplay] = useState(false);
  const [show, setShow] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0)
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
    const formatter = new Intl.DateTimeFormat('he-IL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    return formatter.format(date);
  }

  const handleCommentReply = (dataComment: any, userComment: any, commentId: any) => {
    setCommentReplying({ dataComment, userComment, commentId })
  }

  return (
    <div className='container'>
      {/* <motion.div
        className='text-center'
      > */}
      {/* <div className="header-container text-white my-auto rounded-bottom shadow-sm"> */}
      {/* <p className="tittle-heeder">תגובות</p> */}
      {/* </div> */}
      {/* </motion.div> */}
      {/* <Modal show={show} onHide={handleClose} centered size="lg">
        {dataForum && (
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
        )}
      </Modal> */}


      <Card className='shadow-sm mb-3 mt-3 rounded mx-auto' style={{ width: '100%' }}>
        {dataForum && (
          <Card.Body>
            <div className='d-flex justify-content-between align-items-start mb-3'>
              <div className='d-flex'>
                <div className='text-center me-3' style={{ width: '70px' }}>
                  <div className='text-white font-extrabold rounded-circle mx-auto d-flex align-items-center justify-content-center mb-1' style={{ width: '40px', height: '40px', background: '#00a35b' }}>
                    <h5 className='m-0'>{dataForum.userName[0]}</h5>
                  </div>
                  <small className='text-muted'>{dataForum.userName}</small>
                </div>
                <div className='d-flex flex-column justify-content-center'>
                  <h5 className='mb-0 fw-bold'>{dataForum.title}</h5>
                  <Card.Text className='mt-2' style={{ whiteSpace: "pre-wrap" }}>
                    {dataForum.description}
                  </Card.Text>
                </div>
              </div>
              <div className="badge-forum align-self-start end-4 top-4 position-absolute shadow-sm rounded px-1 border" style={{ color: '#00a35b', background: '#ffffff', fontSize: '13px' }}>{dataForum.topic}</div>
            </div>
            {/* {dataForum.fileName && (
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
                />
              </div>
            )} */}
            <div className='d-flex justify-content-end align-items-center'>

              <small className='me-2 text-muted'>
                <i className="bi bi-chat-dots me-2"></i>
                {dataForum.numOfComments} תגובות
              </small>
              <small className='text-muted'><i className="bi bi-clock me-1"></i>{formatPostAgo(dataForum.date)}</small>
            </div>
          </Card.Body>
        )}
      </Card>

      <div className="d-flex flex-column align-items-end mx-auto comment-card" style={{ width: '100%' }}>
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
                  {/* {item.fileName && (
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
                  )} */}
                </div>
                <div className='d-flex justify-content-end align-items-end'>
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