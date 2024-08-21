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

    const doApiGmach = async () => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/gmach`;
        const resp = await fetch(url, { cache: 'no-store' })
        const data = await resp.json();
        console.log(data);
        // setCardsAr(data)
        return data;
    }

    const initialDataShop = await doApi();
    const initialDataGmach = await doApiGmach();

    return (
        <div className='' style={{ minHeight: '100vh' }}>
            {/* <StripCarousel /> */}
            {/* <CardCategory /> */}
           <AcordionShops shopsData={initialDataShop} gmachData={initialDataGmach} />
        </div>
    )
}
