// "use client"
// import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import './style.css';


// export default function StripCarousel() {
//     return (
//         <div className='container strip'>
//             <div className='mt-2' >
//             <Carousel className='w-75 rounded shadow mx-auto' >
//                 <Carousel.Item>
//                     <img src='/images/strip/neighborhood1.jpg' className='d-block w-100 rounded' style={{height:"50vh" }}></img>
//                     <Carousel.Caption className='bg-light bg-opacity-50 rounded text-dark'>
//                         <h3>First slide label</h3>
//                         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img src='/images/strip/neighborhood2.jpg' className='d-block w-100 rounded' style={{height:"50vh"}}></img>
//                     <Carousel.Caption className='bg-light bg-opacity-50 rounded text-dark'>
//                         <h3>Second slide label</h3>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img src='/images/strip/neighborhood3.jpg' className='d-block w-100 rounded' style={{height:"50vh"}}></img>

//                     <Carousel.Caption className='bg-light bg-opacity-50 rounded text-dark'>
//                         <h3>Third slide label</h3>
//                         <p>
//                             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//                         </p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//             </Carousel>
//             </div>
//         </div>
//     )
// }

"use client"
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './style.css';

export default function StripCarousel() {
    const carouselItems = [
        {
            image: '/images/strip/neighborhood1.jpg',
            title: 'First slide label',
            description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        },
        {
            image: '/images/strip/neighborhood2.jpg',
            title: 'Second slide label',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            image: '/images/strip/neighborhood3.jpg',
            title: 'Third slide label',
            description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        }
    ];

    return (
        <div className='container-fluid strip px-0'>
            <div className='mt-2'>
                <Carousel className='carousel-responsive rounded shadow mx-auto'>
                    {carouselItems.map((item, index) => (
                        <Carousel.Item key={index}>
                            <div className="carousel-image-container">
                                <img 
                                    src={item.image} 
                                    className='d-block w-100 rounded carousel-image' 
                                    alt={`Slide ${index + 1}`}
                                />
                            </div>
                            <Carousel.Caption className='bg-light bg-opacity-50 rounded text-dark'>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}