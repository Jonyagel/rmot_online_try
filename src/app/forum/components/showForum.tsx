"use client"

import React, { useRef, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import AddQuestion from './addQuestion';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { Card, Badge, Popover, OverlayTrigger, Dropdown, Form, InputGroup, Modal, Col, Row } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import './showForum.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import TagFilter from './tagFilter';

export const dynamic = 'force-dynamic';

export default function ShowForum(props: any) {
    const [addForum, setAddForum] = useState(false);
    const [forum_ar, setForum_ar] = useState(props.forumData);
    const [sortBy, setSortBy] = useState('date');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [showAllTags, setShowAllTags] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [lengthOfForum, setLengthOfForum] = useState(10);
    const [loading, setLoading] = useState(2);

    const saerchRef = useRef<HTMLInputElement>(null);

    const getAllTags = () => {
        const allTags = new Set(forum_ar.map((post: any) => post.topic));
        return Array.from(allTags);
    };

    const onSearchClick = (e: any) => {
        e.preventDefault();
        doApi(1);
    };

    async function doApi(newPage: any) {
        const search = saerchRef.current?.value
        let url = `${process.env.NEXT_PUBLIC_API_URL}/api/forum?page=${newPage}&search=${search}`;
        const resp = await fetch(url, { cache: 'no-store' });
        const data = await resp.json();
        console.log(data);
        setForum_ar(data.data);
        setLengthOfForum(data.totalPages)
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
        setShowAllTags(false);
    };

    return (
        <div className='px-3'>
            <Row>
                <Col lg={2} className="d-none d-lg-block">
                    {/* אזור פרסומות שמאלי */}
                    <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/bookgif.webp' className='rounded' />
                        </div>
                    </div>
                </Col>
                <Col lg={8}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='title text-center mt-5'
                    >
                        <h2 className='my-4 text-3xl forum-title'>פורום תושבי רמות</h2>
                        {/* <p className='lead text-muted'>שואלים, עונים, ומחברים את הקהילה</p> */}
                    </motion.div>
                    <div  className='align-items-center justify-content-center'>
                        <div className='d-flex justify-content-end'>
                            <AddQuestion setAddForum={setAddForum} addForum={addForum} doApi={doApi} />
                        </div>

                        <div className="search-container-forum w-3/5   mx-auto">
                            <InputGroup>
                                <Form.Control
                                    placeholder="חיפוש בפורום"
                                    ref={saerchRef}
                                    className='rounded-end search-input'
                                />
                                <InputGroup.Text className='rounded-start search-button' onClick={(e: any) => (
                                    onSearchClick(e)
                                )}>   <FaSearch /></InputGroup.Text>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="my-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                        <TagFilter
                            getAllTags={getAllTags}
                            handleTopicClick={handleTopicClick}
                            selectedTopic={selectedTopic}
                        />
                        <div className='d-flex align-items-center'>
                            <Dropdown className="">
                                <Dropdown.Toggle variant="light" id="dropdown-sort" className='border' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: '150px' }}>
                                    <span>מיין לפי: {sortBy === 'date' ? 'תאריך' : 'תגובות'}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='text-end'>
                                    <Dropdown.Item onClick={() => setSortBy('date')}>תאריך</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSortBy('comments')}>תגובות</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <div className='row' >
                        <AnimatePresence>
                            {sortedAndFilteredPosts.map((item: any, index: number) => (
                                <React.Fragment key={item._id}>
                                    <motion.div
                                        className='col-12 mb-4'
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
                                                                className="rounded cursor-pointer"
                                                                alt='תמונה מצורפת'
                                                                placeholder="blur"
                                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                                                                loading='lazy'
                                                                format="auto"
                                                                quality="auto"
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // מונע ניווט ללינק
                                                                    setSelectedImage(item.fileName);
                                                                    setShowImageModal(true);
                                                                }}
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
                                    {(index + 1) % 6 === 0 && (
                                        <motion.div
                                            className='col-12 mb-4'
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Card className='forumCard shadow-sm hover-card position-relative' style={{ minHeight: '100px' }}>
                                                <Card.Body className='forumCardBody'>
                                                    <div className='text-center'>
                                                        <img src='/images/ads1top.jpg' alt="Advertisement" className="img-fluid" />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </motion.div>
                                    )}
                                </React.Fragment>
                            ))}
                        </AnimatePresence>
                    </div>
                    {hasMore && (
                        <div className="text-center mt-5 mb-6">
                            <motion.button
                                className="load-more-button px-4 py-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setLoading(loading + 1);
                                    console.log(loading);
                                    doApi(loading);
                                    if (lengthOfForum === forum_ar.length) {
                                        setHasMore(false);
                                    }
                                }}
                            >
                                הצג עוד
                                <motion.span
                                    className="chevron-icon"
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <FaChevronDown />
                                </motion.span>
                            </motion.button>
                        </div>
                    )}
                </Col >
                <Col lg={2} className="d-none d-lg-block ">
                    {/* אזור פרסומות ימני */}
                    <div className="ad-container">
                        <div className="ad-space">
                            <img src='/images/timegif.webp' className='rounded' />
                            {/* כאן תוכל להוסיף את קוד הפרסומת שלך */}
                        </div>
                    </div>
                </Col>
            </Row >

            <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>תמונה מצורפת</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CldImage
                        src={selectedImage}
                        width="800"
                        height="600"
                        sizes="100vw"
                        crop="fit"
                        className="img-fluid"
                        alt='תמונה מצורפת בגדול'
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                        loading='lazy'
                        format="auto"
                        quality="auto"
                    />
                </Modal.Body>
            </Modal>
        </div >
    )
}