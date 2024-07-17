// "use client"

import React, { useState } from 'react';
import ForumInComment from './components/forumInComment';
import CommentById from './components/commentById';



// export const dynamic = 'auto';

export default function Comment(props: any) {

  // const [forumUpdate, setForumUpdate] = useState(false);

  

  return (
    <div className='container w-75 bg-info bg-opacity-25 rounded pb-2'>
      {/* <ForumInComment idForum={props.params.id}/> */}
      <CommentById idForum={props.params.id}/>
    </div>
  )
}


