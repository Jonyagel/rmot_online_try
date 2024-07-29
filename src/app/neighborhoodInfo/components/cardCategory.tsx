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
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledCard = styled(motion(Card))`
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  }
`;

const CategoryTitle = styled.h3`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const CategoryText = styled.p`
  font-size: 0.9rem;
  color: #6c757d;
`;

// const StyledButton = styled(Button)`
//   background-color: #007bff;
//   border: none;
//   transition: all 0.3s ease;

//   &:hover, &:focus {
//     background-color: #0056b3;
//     transform: scale(1.05);
//   }
// `;

export default function CardCategory() {
    const categories = [
        { title: "טכנולוגיה", image: "/images/category/technology.jpg", text: "חדשנות וקדמה" },
        { title: "אוכל", image: "/images/category/food.jpg", text: "טעמים וריחות מכל העולם" },
        { title: 'נדל"ן', image: "/images/category/home.jpg", text: "בית חלומותיך מחכה לך" },
        { title: "פנאי", image: "/images/category/game.jpg", text: "זמן איכות למשפחה ולחברים" },
        { title: "רהיטים", image: "/images/category/chair.jpg", text: "עיצוב הבית בסטייל" },
        { title: "נופש", image: "/images/category/beach.jpg", text: "חופשות מהחלומות" },
    ];

    return (
        <Container fluid className="mt-5 px-4">
            <Row className="justify-content-center">
                {categories.map((category, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4">
                        <StyledCard
                            className="h-100 border-0 rounded-lg overflow-hidden"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Card.Img variant="top" src={category.image} />
                            <Card.Body className="d-flex flex-column">
                                <CategoryTitle>{category.title}</CategoryTitle>
                                <CategoryText className="flex-grow-1">
                                    {category.text}
                                </CategoryText>
                                <Button variant="primary" className="mt-auto">
                                    גלה עוד
                                </Button>
                            </Card.Body>
                        </StyledCard>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
