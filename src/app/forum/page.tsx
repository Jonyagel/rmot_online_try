import React from 'react';
import ShowForum from './components/showForum';

export const dynamic = 'force-dynamic';



export default async function Forum() {
    

  const  doApi = async () => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum`;
        const resp = await fetch(url, { cache: 'no-store' });
        const data = await resp.json();
        console.log(data);
        return data;
    }


    const initialData = await doApi();


  

    return (
        <div className=''>
            <ShowForum forumData={initialData.data} totalPages={initialData.totalPages}/>
          

        </div>
    )
}
