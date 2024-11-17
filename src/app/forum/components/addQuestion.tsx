"use client"

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { Button, CloseButton, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './addQuestion.css'
import { useSession } from 'next-auth/react';

export const dynamic = 'auto';

export default function AddQuestion(props: any) {
    const { data: session } = useSession();
    const router = useRouter();
    const topicRef = useRef<HTMLSelectElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [signIn, setSignIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState("");
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    const notify = () => toast.error("אתה צריך להירשם", {
        position: 'top-left',
        theme: 'light'
    });

    const doApi = async (e: React.FormEvent) => {
        e.preventDefault();

        const topic = topicRef.current?.value;
        const title = titleRef.current?.value;
        const description = descriptionRef.current?.value;
        const numOfComments = 0;

        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum`, {
                method: 'POST',
                body: JSON.stringify({ topic, title, description, numOfComments, anonymous }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            console.log(data);
            handleClose();
            props.doApi();
            setShowModal(false);
            setUploadedImageUrl('');
            router.push('/forum');
            props.setAddForum(!props.addForum);
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const checkSignIn = async () => {
        if (session) {
            setSignIn(true);
            handleShow();
        }
        else {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkLogin`);
                const data = await resp.json();
                if (data.status === 401) {
                    notify();
                    setSignIn(false);
                } else if (data.status === 200) {
                    setSignIn(true);
                    handleShow();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div>
            <button
                className="btn btn-add-forum rounded border"
                onClick={checkSignIn}
                style={{ maxHeight: '36px' }}>
                הוסף פורום
            </button>
            <Modal show={showModal} onHide={handleClose} centered className='addForumModal'>
                <Modal.Header className="">
                    <div className="w-100 d-flex justify-content-between align-items-center">
                        <Modal.Title>הוספת פורום</Modal.Title>                     
                        <CloseButton className='closeModal' onClick={handleClose} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={doApi}>
                        <Form.Group className="mb-3">
                            <Form.Label>בחר נושא</Form.Label>
                            <Form.Select ref={topicRef} required>
                                <option value="שאלה">שאלה</option>
                                <option value="עזרה">עזרה</option>
                                <option value="בעיה">בעיה</option>
                                <option value="תקלה">תקלה</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>כותרת</Form.Label>
                            <Form.Control ref={titleRef} type="text" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>תוכן</Form.Label>
                            <Form.Control ref={descriptionRef} as="textarea" rows={3} required />
                        </Form.Group>
                        <div></div>
                        <Form.Group className="mb-3">
                            <div className="d-flex align-items-center">
                                <Form.Check
                                    type="checkbox"
                                    label="העלה כאנונימי"
                                    id="anonymousCheck"
                                    onChange={(e) => setAnonymous(e.target.checked)}
                                />
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip className="custom-tooltip">
                                            <p> השם שלך יוצג כאנונימי למשתמשים אחרים, אך ישמר במערכת</p>
                                        </Tooltip>
                                    }
                                >
                                    <i className="bi bi-info-circle ms-2" style={{ cursor: 'pointer' }}></i>
                                </OverlayTrigger>
                            </div>
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className='pt-3 ms-auto'>
                                <Button onClick={handleClose} className="me-2 border bg-light text-black py-2 px-3">
                                    ביטול
                                </Button>
                                <Button type="submit" className='py-2 px-3'>
                                    שלח
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastContainer position="bottom-center" theme="colored" />
        </div>
    )
}