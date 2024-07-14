"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ForumInComment from './components/forumInComment';
import AddComment from './components/addComment';
import CommentById from './components/commentById';



export const dynamic = 'auto';

export default function Comment(props: any) {

  

  return (
    <div className='container w-75 bg-info bg-opacity-25 rounded pb-2'>
      <ForumInComment idForum={props.params.id} />
      <CommentById idForum={props.params.id}/>
      <AddComment idForum={props.params.id}/>
    </div>
  )
}


