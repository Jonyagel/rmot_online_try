"use client"

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { Button, Popover, Card } from 'react-bootstrap';
import { CldUploadButton } from 'next-cloudinary';
import EmojiPicker from 'emoji-picker-react';
import { EmojiStyle } from 'emoji-picker-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './addComment.css'

export const dynamic = 'auto';

export default function AddComment(props: any) {
  const router = useRouter();
  const commentRef: any = useRef();
  const [fileName, setFileName] = useState("");
  const [signIn, setSignIn] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [anonymous, setAnonymous] = useState(false);

  const onEmojiSelect = (emoji: any) => {
    commentRef.current.value += emoji.emoji;
    console.log(emoji);
  };

  const notify = () => toast.error("אתה צריך להירשם");

  // const popover = (
  //   <Popover id="popover-basic" className=''>
  //     <Popover.Body>
  //       <EmojiPicker onEmojiClick={onEmojiSelect} emojiStyle={EmojiStyle.GOOGLE} searchDisabled={true} width={240}
  //         height={400}
  //       />
  //     </Popover.Body>
  //   </Popover>
  // );

  const doApi = async (commentBody: any) => {
    if (props.replay === false) {
      props.commentReplying.commentId = null;
    }
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        forumMsgId: props.idForum,
        comment: commentBody,
        commentReplayId: props.commentReplying.commentId,
        commentReplayContent: props.commentReplying.dataComment,
        commentReplayUserName: props.commentReplying.userComment,
        anonymous
      }),
    });
    const data = await resp.json();
    console.log(data);
    props.doApiGet();
    getForum();
  }


  const getForum = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/${props.idForum}`
    const resp = await fetch(url);
    const data = await resp.json();
    const ForumAr = data;
    putForum(ForumAr.numOfComments + 1)

  }

  const putForum = async (updateForum: any) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/${props.idForum}`, {
      method: 'PUT',
      body: JSON.stringify({
        numOfComments: updateForum
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await resp.json();
    console.log(data);
    props.doApiForum();
  }


  const addComment = () => {
    const comment = commentRef.current.value;
    if (comment) {
      commentRef.current.value = null;
      doApi(comment);
      props.doApiGet();
      router.refresh();
      console.log(comment);
      props.setReplay(false);
      setFileName("");
    }
  }

  const checkSignIn = async () => {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkLogin`);
      const data = await resp.json();
      console.log(data);
      if (data.status === 401) {
        notify();
        setSignIn(false);
      }
      else if (data.status === 200) {
        setSignIn(true);
        addComment();
      }
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault(); // מונע את ברירת המחדל של שליחת הטופס
    checkSignIn();
    if (signIn) {
      addComment();
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // מונע מעבר שורה רגיל
      handleSubmit(e); // קורא לפונקציית השליחה שלך
    }
  };


  const handleExpand = (e: any) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
  };


  window.addEventListener('scroll', () => {
    setShowEmoji(false);
  });

  return (
    <div className='sticky-bottom mt-4 py-2'
      style={{
        background: "#fafcf9",
        boxShadow: "0px -10px 2px -1px #fafcf9, -10px 0 2px -1px #fafcf9, 10px 0 2px -1px #fafcf9"
      }}
    >
      <Card className='shadow-sm rounded add-comment-forum'>
        <Card.Body className='p-2'>
          {props.replay && (
            <Card className='mb-2 bg-light rounded' style={{ borderRight: 'solid #0275d8 6px' }}>
              <Card.Body className='py-2 px-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='overflow-hidden'>
                    <Card.Title className='h6 mb-1'>{props.commentReplying.userComment}</Card.Title>
                    <Card.Text className='text-muted small text-truncate' style={{ maxWidth: '250px' }}>
                      {props.commentReplying.dataComment}
                    </Card.Text>
                  </div>
                  <Button variant="link" className='text-muted p-0 ms-2' onClick={() => props.setReplay(false)}>
                    <i className="bi bi-x"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
          <div className='d-flex justify-content-between flex-column'>
            <div className='d-flex'>
              <div className='flex-grow-1'>
                <textarea
                  ref={commentRef}
                  onClick={() => setShowEmoji(false)}
                  onChange={handleExpand}
                  onKeyDown={handleKeyDown}
                  placeholder='הוסף תגובה'
                  className='form-control border-0 add-comment-forum-textarea'
                  maxLength={1000}
                  rows={1}
                  style={{ resize: 'none', minHeight: '38px', maxHeight: '200px', overflowY: 'auto' }}
                />
              </div>
              <div className='d-flex align-items-center '>
                <button type="submit" onClick={handleSubmit} className='btn send-comment-forum-btn ms-1'>
                  <i className="bi bi-send" style={{ transform: 'rotate(45deg)' }}></i>
                </button>
              </div>
            </div>
            {/* <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="anonymousCheck"
                  onChange={(e) => setAnonymous(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="anonymousCheck">
                  <small> העלה כאנונימי </small>
                </label>
              </div> */}
          </div>
        </Card.Body>
      </Card>
      <ToastContainer position="bottom-center" theme="colored" />
    </div>
  )
}