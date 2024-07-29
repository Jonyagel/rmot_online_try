"use client"

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { CldUploadButton } from 'next-cloudinary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './addQuestion.css'

export const dynamic = 'auto';

export default function AddQuestion(props: any) {
    const router = useRouter();
    const topicRef = useRef<HTMLSelectElement>(null);
    const tittleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [signIn, setSignIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fileName, setFileName] = useState("");
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    const notify = () => toast.error("אתה צריך להירשם");

    const doApi = async (e: React.FormEvent) => {
        e.preventDefault();

        const topic = topicRef.current?.value;
        const tittle = tittleRef.current?.value;
        const description = descriptionRef.current?.value;
        const numOfComments = 0;

        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum`, {
                method: 'POST',
                body: JSON.stringify({ topic, tittle, description, numOfComments, fileName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await resp.json();
            console.log(data);
            handleClose();
            props.doApi();
            router.push('/forum');
            props.setAddForum(!props.addForum);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const checkSignIn = async () => {
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkLogin`);
            const data = await resp.json();
            if (data.status === 401) {
                notify();
                setSignIn(false);
            } else {
                setSignIn(true);
                handleShow();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleUploadTwo = (result: any) => {
        if (result.event === 'success') {
            const publicId = result.info.public_id;
            const fileName = publicId.split('/').pop();
            setFileName(fileName);
            setUploadedImageUrl(result.info.secure_url); // שמירת ה-URL של התמונה שהועלתה
            toast.success('התמונה הועלתה בהצלחה');
        }
    };

    const handleUpload = (result: any) => {
        if (result.event === 'success') {
            const publicId = result.info.public_id;
            const fileName = publicId.split('/').pop();
            setFileName(fileName);
            toast.success('התמונה הועלתה בהצלחה');
        }
    };

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <Button variant="primary" className="rounded-circle shadow-sm m-4" onClick={checkSignIn}>
                <i className="bi bi-plus-lg fs-4"></i>
            </Button>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header>
                    <div className="w-100 d-flex justify-content-between align-items-start">
                        <Modal.Title>הוספת שאלה חדשה</Modal.Title>
                        <Button variant="link" onClick={handleClose} className="close-button p-0">
                            <i className="bi bi-x-lg"></i>
                        </Button>
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
                            <Form.Control ref={tittleRef} type="text" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>תוכן</Form.Label>
                            <Form.Control ref={descriptionRef} as="textarea" rows={3} required />
                        </Form.Group>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Group className="mb-3">
                                <Form.Label>תמונה</Form.Label>
                                <div className="d-flex align-items-center">
                                    <CldUploadButton
                                        className='btn btn-outline-secondary me-2'
                                        uploadPreset="my_upload_test"
                                        onSuccess={handleUploadTwo}
                                        onError={(error) => {
                                            console.error('Upload error:', error);
                                            toast.error('העלאה נכשלה. ייתכן שהקובץ גדול מדי או בפורמט לא נתמך.');
                                        }}
                                        options={{
                                            sources: ['local'],
                                            maxFileSize: 5000000,
                                            maxImageWidth: 2000,
                                            maxImageHeight: 2000,
                                            clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                                        }}
                                    >
                                        <i className="bi bi-image me-2"></i>
                                        העלאת תמונה
                                    </CldUploadButton>
                                    {uploadedImageUrl && (
                                        <div className="position-relative ms-2">
                                            <img
                                                src={uploadedImageUrl}
                                                alt="תמונה שהועלתה"
                                                className="img-thumbnail"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="position-absolute top-0 start-100 translate-middle rounded-circle p-1"
                                                onClick={() => {
                                                    setUploadedImageUrl("");
                                                    setFileName("");
                                                }}
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Form.Group>
                            <Button type="submit" variant="primary">
                                <i className="bi bi-send me-2"></i>
                                שלח
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastContainer position="bottom-center" theme="colored" />
        </>
    )
}