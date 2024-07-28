"use client"

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { Button, OverlayTrigger, Popover, Card } from 'react-bootstrap';
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

  const onEmojiSelect = (emoji: any) => {
    commentRef.current.value += emoji.emoji;
    console.log(emoji);
  };

  const notify = () => toast.error("אתה צריך להירשם");

  const popover = (
    <Popover id="popover-basic" className=''>
      <Popover.Body>
        <EmojiPicker onEmojiClick={onEmojiSelect} emojiStyle={EmojiStyle.GOOGLE} searchDisabled={true} width={240}
          height={400} 
          // hiddenEmojis={[ '1f600' ,  '1f601' ,  '1f602' ,"1f607","1f970"]}
          />
      </Popover.Body>
    </Popover>
  );

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
      }),
    });
    const data = await resp.json();
    console.log(data);
    props.doApiGet();
    // props.doApiForum();
    getForum();
  }


  const getForum = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/${props.idForum}`
    const resp = await fetch(url);
    const data = await resp.json();
    const ForumAr = data;
    // setDataForum(ForumAr.numOfComments + 1);
    putForum(ForumAr.numOfComments + 1)
    // console.log(dataForum);
    // console.log(data);
    // console.log((ForumAr.numOfComments + 1) + "fffffffff");

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

  const handleUpload = (result: any) => {
    if (result.event === 'success') {
      const publicId = result.info.public_id;
      const fileName = publicId.split('/').pop();
      console.log('Uploaded file name:', fileName);
      setFileName(fileName);
      toast.success(`הקובץ ${fileName} הועלה בהצלחה`);
    }
  };

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
      // setShowEmoji(false);
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
    <div className='sticky-bottom mt-4'>
      <Card className='shadow-sm'>
        <Card.Body>
          {props.replay && (
            <Card className='mb-3 bg-light'>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <Card.Title>{props.commentReplying.userComment}</Card.Title>
                    <Card.Text>{props.commentReplying.dataComment}</Card.Text>
                  </div>
                  <Button variant="light" onClick={() => props.setReplay(false)}>
                    <i className="bi bi-x-lg"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
          <div className='d-flex flex-column'>
            <div className='d-flex align-items-end mb-2'>
              <div className='d-flex align-items-center ms-2'>
                <CldUploadButton
                  className='btn btn-outline-primary me-2 border-0'
                  uploadPreset="my_upload_test"
                  onSuccess={handleUpload}
                  onError={(error) => {
                    console.error('Upload error:', error);
                    toast.error('העלאה נכשלה. ייתכן שהקובץ גדול מדי או בפורמט לא נתמך.');
                  }}
                  options={{
                    sources: ['local'],
                    maxFileSize: 5000000,
                    maxImageWidth: 2000,
                    maxImageHeight: 2000,
                    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                  }}
                >
                  <i className="bi bi-paperclip"></i>
                </CldUploadButton>
                <OverlayTrigger trigger="click" placement="top" overlay={popover} show={showEmoji}>
                  <Button variant="btn btn-outline-primary border-0" className='me-2' onClick={() => setShowEmoji(!showEmoji)}>
                    <i className="bi bi-emoji-smile"></i>
                  </Button>
                </OverlayTrigger>
              </div>
              <div className='flex-grow-1'>
                <textarea
                  ref={commentRef}
                  onClick={() => setShowEmoji(false)}
                  onChange={handleExpand}
                  onKeyDown={handleKeyDown}
                  placeholder='הוסף תגובה'
                  className='form-control'
                  maxLength={1000}
                  rows={1}
                  style={{ resize: 'none', minHeight: '38px', maxHeight: '200px', overflowY: 'auto' }}
                />
              </div>
              <div className='d-flex align-items-center ms-2'>
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                  <i className="bi bi-send" style={{ transform: 'rotate(45deg)' }}></i>
                </Button>
              </div>
            </div>
            {fileName && (
              <div className="mt-2">
                <small className="text-muted">
                  <i className="bi bi-file-earmark-image me-1"></i>
                  קובץ מצורף: {fileName}
                </small>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
      <ToastContainer position="bottom-center" theme="colored" />
    </div>
  )
}