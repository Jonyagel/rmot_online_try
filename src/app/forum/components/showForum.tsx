"use client"

import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddQuestion from './addQuestion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { Card, Badge, Button, Popover, OverlayTrigger, Dropdown, Form, InputGroup, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import './showForum.css'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function ShowForum(props: any) {
    const [addForum, setAddForum] = useState(false);
    const [forum_ar, setForum_ar] = useState(props.forumData);
    const [show, setShow] = useState(false);
    const [sortBy, setSortBy] = useState('date');
    const [viewMode, setViewMode] = useState('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [showAllTags, setShowAllTags] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(props.totalPages);


    const popularTags = ['שאלה', 'עזרה', 'בעיה', 'תקלה'];



    const router = useRouter();

    const saerchRef = useRef<HTMLInputElement>(null);


    const getAllTags = () => {
        const allTags = new Set(forum_ar.map((post: any) => post.topic));
        return Array.from(allTags);
    };

    const showAllQuestions = () => {
        setSelectedTopic('');
        setSearchTerm('');
    };


    const onSearchClick = (e: any) => {
        e.preventDefault();
        const search = saerchRef.current?.value
        doApi(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            console.log(`Page ${newPage}`);
            doApi(newPage);
            window.scrollTo({
                top: 300,
                behavior: 'smooth'
            });
        }
    };

    async function doApi(newPage: any) {
        const search = saerchRef.current?.value
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum?page=${newPage - 1}&search=${search}`;
        const resp = await fetch(url, { cache: 'no-store' });
        const data = await resp.json();
        console.log(data);
        setForum_ar(data.data);
    }

    const formatPostAgo = (date: number): string => {
        const timePosted = Date.now() - date;
        const minutesAgo = Math.floor(timePosted / (1000 * 60));
        if (minutesAgo < 1) return "עכשיו";
        if (minutesAgo < 60) return `לפני ${minutesAgo} דקות`;
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) return `לפני ${hoursAgo} שעות`;
        const daysAgo = Math.floor(hoursAgo / 24);
        if (daysAgo < 30) return `לפני ${daysAgo} ימים`;

        const dateTest = new Date(date * 1000);
        const formatter = new Intl.DateTimeFormat('he-IL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        return formatter.format(date);
    }

    const popover = (userName: any) => {
        return (
            <Popover id="popover-basic" className='p-2'>
                <Popover.Header></Popover.Header>
                <h2>{userName}</h2>
            </Popover>
        )
    };

    const sortPosts = (posts: any, sortType: any) => {
        if (sortType === 'date') {
            return [...posts].sort((a, b) => b.date - a.date);
        } else if (sortType === 'comments') {
            return [...posts].sort((a, b) => b.numOfComments - a.numOfComments);
        }
        return posts;
    };

    const filteredPosts = forum_ar.filter((post: any) =>
        (post.tittle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedTopic ? post.topic === selectedTopic : true)
    );

    const sortedAndFilteredPosts = sortPosts(filteredPosts, sortBy);

    const handleTopicClick = (topic: any) => {
        if (selectedTopic === topic) {
            setSelectedTopic('');
        } else {
            setSelectedTopic(topic);
        }
    };

    return (
        <div className='container'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='title text-center mt-5'
            >
                <h2 className='display-4 fw-bold text-primary'>פורום תושבי רמות</h2>
                <p className='lead text-muted'>שואלים, עונים, ומחברים את הקהילה</p>
            </motion.div>

            <div className='d-flex justify-content-end mb-3'>
                <AddQuestion setAddForum={setAddForum} addForum={addForum} doApi={doApi} />
            </div>

            <div className='mb-3'>
                <InputGroup>
                    <Form.Control
                        placeholder="חיפוש בפורום"
                        ref={saerchRef}
                        className='rounded-end'
                    />
                    <InputGroup.Text className='rounded-start' onClick={(e: any) => (
                        onSearchClick(e)
                    )}><i className="bi bi-search"></i></InputGroup.Text>
                </InputGroup>
            </div>

            <div className="my-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div className='mb-3 mb-md-0'>
                    <Button variant="light" onClick={() => setShowAllTags(true)} className="me-2 border">
                        סנן לפי תגים
                    </Button>
                    <Button variant="primary" onClick={showAllQuestions}>
                        הצג את כל התגים
                    </Button>
                </div>

                <div className='d-flex align-items-center'>
                    <Dropdown className="me-2">
                        <Dropdown.Toggle variant="light" id="dropdown-sort" className='border' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: '150px' }}>
                            <span>מיין לפי: {sortBy === 'date' ? 'תאריך' : 'תגובות'}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='text-end'>
                            <Dropdown.Item onClick={() => setSortBy('date')}>תאריך</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortBy('comments')}>תגובות</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="d-none d-md-block"> {/* Hide on mobile, show on medium screens and up */}
                        <Button variant="outline-secondary" onClick={() => setViewMode('list')} className="me-2">
                            <i className="bi bi-list"></i>
                        </Button>
                        <Button variant="outline-secondary" onClick={() => setViewMode('grid')}>
                            <i className="bi bi-grid"></i>
                        </Button>
                    </div>
                </div>
            </div>

            <div className={`row ${viewMode === 'grid' ? 'row-cols-1 row-cols-md-2 row-cols-lg-3' : ''}`}>
                <AnimatePresence>
                    {sortedAndFilteredPosts.map((item: any) => (
                        <motion.div
                            className={`${viewMode === 'list' ? 'col-12' : ''} mb-4`}
                            key={item._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href={`/forum/comment/${item._id}`} className='text-decoration-none'>
                                <Card className='forumCard shadow-sm hover-card position-relative' style={{ minHeight: '100px' }}>
                                    <Card.Body className='forumCardBody'>
                                        <div className='d-flex justify-content-between align-items-start mb-3'>
                                            <div className='d-flex'>
                                                <OverlayTrigger
                                                    trigger="hover"
                                                    placement="top"
                                                    overlay={popover(item.userName)}
                                                >
                                                    <div className='text-center me-3'>
                                                        <div className='bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-1' style={{ width: '40px', height: '40px' }}>
                                                            <h5 className='m-0'>{item.userName[0]}</h5>
                                                        </div>
                                                        <small className='text-muted'>{item.userName}</small>
                                                    </div>
                                                </OverlayTrigger>
                                                <div className='d-flex flex-column justify-content-center'>
                                                    <h5 className='mb-0 fw-bold'>{item.tittle}</h5>
                                                    <Card.Text className='mt-2' style={{ whiteSpace: "pre-wrap" }}>
                                                        {item.description.length > 150
                                                            ? `${item.description.substring(0, 150)}...`
                                                            : item.description}
                                                    </Card.Text>
                                                </div>
                                            </div>
                                            <Badge bg='primary' className="ms-2 align-self-start top-0 end-20 translate-middle position-absolute">{item.topic}</Badge>
                                        </div>
                                        {item.fileName && (
                                            <div className="mb-3">
                                                <CldImage
                                                    src={item.fileName}
                                                    width="100"
                                                    height="100"
                                                    sizes="100vw"
                                                    crop="fill"
                                                    className="rounded"
                                                    alt='תמונה מצורפת'
                                                    placeholder="blur"
                                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                                                    loading='lazy'
                                                />
                                            </div>
                                        )}
                                        <div className='d-flex justify-content-end align-items-center'>
                                            <small className='me-2'>
                                                <i className="bi bi-chat-dots me-2"></i>
                                                {item.numOfComments} תגובות
                                            </small>
                                            <small className='text-muted'><i className="bi bi-clock me-2"></i>{formatPostAgo(item.date)}</small>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <nav aria-label="ניווט בין עמודים" className="mt-5">
                <ul className="pagination pagination-md justify-content-center flex-wrap">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link rounded-circle shadow-sm border-0 mx-1"
                            onClick={() => {
                                handlePageChange(currentPage - 1)
                            }}
                            aria-label="הקודם"
                            style={{ width: '40px', height: '40px', transition: 'all 0.3s' }}
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        const isCurrentPage = currentPage === pageNumber;
                        const isNearCurrent = Math.abs(currentPage - pageNumber) <= 2;

                        if (isNearCurrent || pageNumber === 1 || pageNumber === totalPages) {
                            return (
                                <li key={index} className={`page-item ${isCurrentPage ? 'active' : ''}`}>
                                    <button
                                        className={`page-link rounded-circle shadow-sm border-0 mx-1 ${isCurrentPage ? 'bg-primary text-white' : 'bg-light'}`}
                                        onClick={() => handlePageChange(pageNumber)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            transition: 'all 0.3s',
                                            transform: isCurrentPage ? 'scale(1.1)' : 'scale(1)'
                                        }}
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            );
                        } else if (isNearCurrent && (pageNumber === currentPage - 3 || pageNumber === currentPage + 3)) {
                            return <li key={index} className="page-item disabled"><span className="page-link border-0">...</span></li>;
                        }
                        return null;
                    })}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                            className="page-link rounded-circle shadow-sm border-0 mx-1"
                            onClick={() => {
                                handlePageChange(currentPage + 1)
                            }}
                            aria-label="הבא"
                            style={{ width: '40px', height: '40px', transition: 'all 0.3s' }}
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    </li>
                </ul>
            </nav>

            <Modal show={showAllTags} onHide={() => setShowAllTags(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className="w-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <span>כל התגים</span>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='forumModalBody'>
                    {getAllTags().map((tag: any) => (
                        <Badge
                            key={tag}
                            bg={'secondary'}
                            className="me-2 mb-2"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                handleTopicClick(tag);
                                setShowAllTags(false);
                            }}
                        >
                            {tag}
                        </Badge>
                    ))}
                </Modal.Body>
            </Modal>
        </div >
    )
}