// "use client"
import React, { useState } from 'react';
import CommentById from './components/commentById';



export const dynamic = 'force-dynamic';

export default async function Comment(props: any) {


const doApi = async () => {
    let urlGet = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/comment/${props.params.id}`
    const respGet = await fetch(urlGet, { cache: 'no-store' });
    const dataGet = await respGet.json();
    let commentAr = dataGet;
    console.log(dataGet);
    return commentAr;
  }

  const doApiForum = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum/${props.params.id}`
    const resp = await fetch(url, { cache: 'no-store' });
    const data = await resp.json();
    const ForumAr = data;
    console.log(data);
    return ForumAr;

  }

  const initialData = await doApi();
  const initialForumData = await doApiForum();

  return (
    <div className='container '>
      {/* <ForumInComment idForum={props.params.id}/> */}
      <CommentById idForum={props.params.id} commentAr={initialData} forumData={initialForumData}/>
    </div>
  )
}


