"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';

export const dynamic = 'auto';

export default function AddComment(props: any) {

  const [dataForum, setDataForum] = useState();
  const router = useRouter();
  const commentRef: any = useRef();

  useEffect(() => {

  }, [])



  const doApi = async (commentBody: any) => {
    if(props.replay === false) {
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
    props.doApiProps();
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


  const addComment = (e: any) => {
    e.preventDefault();
    const comment = commentRef.current.value;
    if (comment) {
      commentRef.current.value = null;
      doApi(comment);
      router.refresh();
      console.log(comment);
      props.setReplay(false);
    }
  }

  return (
    <div className='sticky-bottom'>
      <div className='bg-light rounded px-2 p-2 mx-2 shadow'>
        {props.replay &&
          <div className='bg-opacity-25 rounded shadow-sm mb-2 justify-content-between d-flex' style={{ background: 'rgb(230, 230, 230)', marginRight: "7.5%" }}>
            <div className='d-flex'>
              <div className='bg-dark rounded ms-2' style={{ width: "4px", height: "100%" }}> </div>
              <div className=''>
                <p className='fw-bold m-0'>{props.commentReplying.userComment}</p>
                <p className='m-0'>{props.commentReplying.dataComment}</p>
              </div>
            </div>
            <button onClick={() => {props.setReplay(false)}} className='btn mx-1' ><i className="bi bi-x-circle"></i></button>
          </div>
        }
        <div className='d-flex'>
          <button className='btn btn-light' ><i className="bi bi-paperclip"></i></button>
          <button className='btn btn-light' ><i className="bi bi-emoji-smile"></i></button>
          <form className='d-flex w-100' onSubmit={addComment}>
            <input ref={commentRef} type="text" placeholder='add a comment' className='form-control border-0 bg-light' />
            <button className='btn btn-light me-4'><p className="bi bi-send m-0" style={{ transform: 'rotate(225deg)' }}></p></button>
          </form>
        </div>
      </div>
    </div>
  )
}
