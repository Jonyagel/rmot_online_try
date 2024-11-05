import React from 'react'
import AcordionShops from './components/info'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Head from 'next/head';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
    const doApi = async (endpoint: string) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`;
        const resp = await fetch(url, { cache: 'no-store' });
        const data = await resp.json();
        return data;
    };

    const initialDataShop = await doApi('shops');
    const initialDataGmach = await doApi('gmach');
    const initialDataMosads = await doApi('mosads');

    return {
        props: {
            initialDataShop,
            initialDataGmach,
            initialDataMosads,
        },
        revalidate: 86400, // עדכון כל 24 שעות (86400 שניות)
    };
};

export default function NeighborhoodInfo({ initialDataShop, initialDataGmach, initialDataMosads }:any) {
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
                <meta property="og:url" content="https://ramot-online-try.vercel.app/neighborhoodInfo" />
                <meta property="og:image" content="https://asset.cloudinary.com/dglbrzbi1/52834b06603fe25209ec481073d6b5aa" />
            </Head>
            <div className='' style={{ minHeight: '100vh' }}>
                <AcordionShops shopsData={initialDataShop} gmachData={initialDataGmach} MosadsData={initialDataMosads} />
            </div>
        </>
    );
}
