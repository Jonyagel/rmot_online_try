import React from 'react'
// import StripCarousel from '../home/components/stripCarousel'
// import CardCategory from './components/cardCategory'
import AcordionShops from './components/acordionShops'
import 'bootstrap-icons/font/bootstrap-icons.css';

export const dynamic = 'force-dynamic';


export default async function NeighborhoodInfo() {

    const doApi = async () => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/shops`;
        const resp = await fetch(url, { cache: 'no-store' })
        const data = await resp.json();
        console.log(data);
        return data;
    }

    const initialData = await doApi();

    return (
        <div className='container'>
            {/* <StripCarousel /> */}
            {/* <CardCategory /> */}
           <AcordionShops shopsData={initialData} />
        </div>
    )
}
