import React, { Suspense, use, useEffect } from 'react';
import ShopCards from './components/info';
import type { Metadata } from 'next';
import Loading from './loading';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const metadata: Metadata = {
  title: 'רמות - רמת שלמה - חנויות ועסקים',
  description: 'רשימת העסקים, החנויות והשירותים בשכונה',
  keywords: 'חנויות, עסקים, רמות, רמת שלמה, שירותים',
  authors: [{ name: 'על המקום' }],
  openGraph: {
    title: 'רמות - רמת שלמה - חנויות ועסקים',
    description: 'רשימת העסקים, החנויות והשירותים בשכונה',
    type: 'website',
    url: 'https://ramot-online-try.vercel.app/neighborhoodInfo',
    images: [{
      url: 'https://asset.cloudinary.com/dglbrzbi1/52834b06603fe25209ec481073d6b5aa',
      alt: 'רמות רמת שלמה'
    }]
  }
};


export const dynamic = 'force-dynamic';

export default async function NeighborhoodInfo() {

  const doApi = async (endpoint: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`;
    const resp = await fetch(url, { cache: 'no-store' });
    const data = await resp.json();
    return data;
  };

  const initialData = await doApi('shops');

  return (
    <Suspense fallback={<Loading />}>
      <main>
        <ShopCards
          doApi={initialData}
        />
      </main>
    </Suspense>
  );
}

// Cache for 24 hours
export const revalidate = 86400;