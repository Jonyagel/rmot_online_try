import React from 'react'
import AcordionShops from './components/info'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';

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

    const doApiMosads = async () => {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/mosads`;
        const resp = await fetch(url, { cache: 'no-store' })
        const data = await resp.json();
        console.log(data);
        // setCardsAr(data)
        return data;
    }

    const initialDataShop = await doApi();
    const initialDataGmach = await doApiGmach();
    const initialDataMosads = await doApiMosads();

    return (
        <>
            <Head>
                <title>רמות - רמת שלמה - חנויות ועסקים</title>
                <meta name="description" content="רשימת העסקים, החנויות והשירותים בשכונה" />
                <meta name="keywords" content="חנויות, עסקים, רמות, רמת שלמה, שירותים" />
                <meta name="author" content="קהילאפ" />
                <meta property="og:title" content="רמות - רמת שלמה - חנויות ועסקים" />
                <meta property="og:description" content="רשימת העסקים, החנויות והשירותים בשכונה" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:image" content="https://asset.cloudinary.com/dglbrzbi1/52834b06603fe25209ec481073d6b5aa" />
                {/* הוספת תגיות נוספות */}
            </Head>
            <div className='' style={{ minHeight: '100vh' }}>
                {/* <StripCarousel /> */}
                {/* <CardCategory /> */}
                <AcordionShops shopsData={initialDataShop} gmachData={initialDataGmach} MosadsData={initialDataMosads} />
            </div>
        </>

    )
}
