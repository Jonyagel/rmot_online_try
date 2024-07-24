// "use client"
// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// export default function CardCategory() {
//     return (
//         <div>
//             <div className='flex flex-wrap mt-4 justify-center'>
//                 <div className='w-1/5  border-2 shadow-inner drop-shadow-lg rounded-lg m-2'>
//                     <Card className='' style={{ height: "100%" }}>
//                         <Card.Img variant="top" src="/images/category/technology.jpg" />
//                         <Card.Body>
//                             <Card.Title><h3 className='font-extrabold'>טכנולגיה</h3></Card.Title>
//                             <Card.Text>
//                                 Some quick
//                             </Card.Text>
//                         </Card.Body>
//                         <Button className='m-2' variant="primary">Go somewhere</Button>
//                     </Card>
//                 </div>
//                 <div className='w-1/5  border-2 shadow-inner drop-shadow-lg rounded-lg m-2'>
//                     <Card className='h-auto'>
//                         <Card.Img variant="top" src="/images/category/food.jpg" />
//                         <Card.Body>
//                             <Card.Title><h3 className='font-extrabold'>אוכל</h3></Card.Title>
//                             <Card.Text>
//                                 Some quick example text to build on the card title and make up the
//                                 bulk of the card's content.
//                             </Card.Text>

//                         </Card.Body>
//                         <Button className='m-2' variant="primary">Go somewhere</Button>
//                     </Card></div>
//                 <div className='w-1/5  border-2 shadow-inner drop-shadow-lg rounded-lg m-2'>
//                     <Card className='h-auto'>
//                         <Card.Img variant="top" src="/images/category/home.jpg" />
//                         <Card.Body>
//                             <Card.Title><h3 className='font-extrabold'>נדל"ן</h3></Card.Title>
//                             <Card.Text>
//                                 Some quick example text to build on the card title and make up the
//                                 bulk of the card's content.
//                             </Card.Text>

//                         </Card.Body>
//                         <Button className='m-2' variant="primary">Go somewhere</Button>
//                     </Card></div>
//                 <div className='w-1/5  border-2 shadow-inner drop-shadow-lg rounded-lg m-2'>
//                     <Card className='h-auto'>
//                         <Card.Img variant="top" src="/images/category/game.jpg" />
//                         <Card.Body>
//                             <Card.Title><h3 className='font-extrabold'>פנאי</h3></Card.Title>
//                             <Card.Text>
//                                 Some quick example text to build on the card title and make up the
//                                 bulk of the card's content.
//                             </Card.Text>

//                         </Card.Body>
//                         <Button className='m-2' variant="primary">Go somewhere</Button>
//                     </Card></div>
//                 <div className='w-1/5  border-2 shadow-inner drop-shadow-lg rounded-lg m-2'>
//                     <Card className='h-auto'>
//                         <Card.Img variant="top" src="/images/category/chair.jpg" />
//                         <Card.Body>
//                             <Card.Title><h3 className='font-extrabold'>רהיטים</h3></Card.Title>
//                             <Card.Text>
//                                 Some quick example text to build on the card title and make up the
//                                 bulk of the card's content.
//                             </Card.Text>

//                         </Card.Body>
//                         <Button className='m-2' variant="primary">Go somewhere</Button>
//                     </Card></div>
//                 <div className='w-1/5  border-2 shadow-inner drop-shadow-lg rounded-lg m-2'>
//                     <Card className='h-auto'>
//                         <Card.Img variant="top" src="/images/category/beach.jpg" />
//                         <Card.Body>
//                             <Card.Title><h3 className='font-extrabold'>נופש</h3></Card.Title>
//                             <Card.Text>
//                                 Some quick example text to build on the card title and make up the
//                                 bulk of the card's content.
//                             </Card.Text>

//                         </Card.Body>
//                         <Button className='m-2' variant="primary">Go somewhere</Button>
//                     </Card></div>

//             </div>
//         </div>
//     )
// }

"use client"
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

export default function CardCategory() {
    const categories = [
        { title: "טכנולגיה", image: "/images/category/technology.jpg", text: "Some quick" },
        { title: "אוכל", image: "/images/category/food.jpg", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
        { title: 'נדל"ן', image: "/images/category/home.jpg", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
        { title: "פנאי", image: "/images/category/game.jpg", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
        { title: "רהיטים", image: "/images/category/chair.jpg", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
        { title: "נופש", image: "/images/category/beach.jpg", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
    ];

    return (
        <Container fluid className="mt-4">
            <Row className="justify-content-center">
                {categories.map((category, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4">
                        <Card className="h-100 shadow">
                            <Card.Img variant="top" src={category.image} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title><h3 className="font-weight-bold">{category.title}</h3></Card.Title>
                                <Card.Text className="flex-grow-1">
                                    {category.text}
                                </Card.Text>
                                <Button variant="primary" className="mt-auto">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
