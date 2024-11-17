import { CldImage } from 'next-cloudinary'
import React, { useMemo, useState } from 'react'
import { Accordion, Carousel, CloseButton, Modal } from 'react-bootstrap'
import Maps from './maps';
import Link from 'next/link';

interface Card {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    images: string[];
    logo?: string;
    hours: OpeningHours;
}

type TimeSlot = { open: string; close: string; note?: string };

type Day = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

type OpeningHours = { [key in Day]: TimeSlot[] };

const daysInHebrew: { [key in Day]: string } = {
    sunday: 'א',
    monday: 'ב',
    tuesday: 'ג',
    wednesday: 'ד',
    thursday: 'ה',
    friday: 'ו',
    saturday: 'שבת'
};

type DayKey = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

// Types for ModalInfoCard props
interface ModalInfoCardProps {
    showModalDetailShop: boolean;
    setShowModalDetailShop: (show: boolean) => void;
    selectedCard: Card | null;
    setSelectedCard: (card: Card | null) => void;
    // isOpenNow: boolean; // Changed from function to boolean
}

const ModalInfoCard: React.FC<ModalInfoCardProps> = ({
    showModalDetailShop,
    setShowModalDetailShop,
    selectedCard,
    setSelectedCard,
    // isOpenNow
}) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const closeModal = () => {
        setIsAccordionOpen(false)
        setSelectedCard(null);
        setShowModalDetailShop(false)
        // הסרת הפרמטר מה-URL בסגירת המודל
        const url = new URL(window.location.href);
        url.searchParams.delete('cardId');
        window.history.pushState({}, '', url.toString());
    };


    const isDayOfWeek = (day: string): day is Day => {
        const validDays: Day[] = [
            'sunday', 'monday', 'tuesday',
            'wednesday', 'thursday', 'friday', 'saturday'
        ];
        return validDays.includes(day as Day);
    };

    const calculateIsOpenNow = (hours: OpeningHours): boolean => {
        try {
            const now = new Date();
            const currentDay = now.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();

            if (!isDayOfWeek(currentDay)) {
                console.error(`Invalid day: ${currentDay}`);
                return false;
            }

            const currentTime = now.toTimeString().slice(0, 5);
            const todayHours: TimeSlot[] = hours[currentDay] || [];

            return todayHours.some(hour =>
                hour.open <= currentTime && hour.close >= currentTime
            );
        } catch (error) {
            console.error('Error checking opening hours:', error);
            return false;
        }
    };

    // const isCurrentlyOpen = useMemo(() => selectedCard ? calculateIsOpenNow(selectedCard.hours) : false, [selectedCard]);

    const renderGroupedHours = (hours: OpeningHours) => {
        const groupedHours = groupHours(hours);

        return groupedHours.flatMap((group) =>
            Object.entries(group).flatMap(([timeRange, dayGroups]) =>
                dayGroups.map(({ days, note }) => ({
                    days: days.map(day => translateDay(day)).join(', '),
                    timeRange,
                    note
                }))
            )
        );
    };



    function translateDay(day: DayKey): string {
        return daysInHebrew[day];
    }

    const groupHours = (hours: OpeningHours) => {
        const daysOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as Day[];
        const grouped: { [key: string]: { days: Day[], note?: string }[] }[] = [];

        daysOrder.forEach((day) => {
            if (hours[day]) {
                hours[day].forEach(slot => {
                    const timeRange = `${slot.open} - ${slot.close}`;
                    const lastGroup = grouped[grouped.length - 1];

                    if (lastGroup && lastGroup[timeRange] && lastGroup[timeRange][lastGroup[timeRange].length - 1].days[lastGroup[timeRange][lastGroup[timeRange].length - 1].days.length - 1] === daysOrder[daysOrder.indexOf(day) - 1]) {
                        lastGroup[timeRange][lastGroup[timeRange].length - 1].days.push(day);
                        if (slot.note) {
                            lastGroup[timeRange][lastGroup[timeRange].length - 1].note = slot.note;
                        }
                    } else {
                        if (!grouped[grouped.length - 1] || !grouped[grouped.length - 1][timeRange]) {
                            grouped.push({ [timeRange]: [{ days: [day], note: slot.note }] });
                        } else {
                            grouped[grouped.length - 1][timeRange].push({ days: [day], note: slot.note });
                        }
                    }
                });
            }
        });

        return grouped;
    };

    return (
        <div>
            <Modal show={showModalDetailShop} onHide={closeModal} className='rounded overflow-y-auto p-0'>
                <Modal.Body className='rounded' style={{ maxHeight: '85vh', overflowY: 'auto'}}>
                    <CloseButton className='closeModal' onClick={closeModal} />
                    {selectedCard && (
                        <div className="p-2 rounded" style={{ background: '#fafcf9' }}>
                            <div className="flex flex-col md:flex-col">
                                <div>
                                    {selectedCard.images[0] && (
                                        <div className="">
                                            <Carousel className="custom-carousel" touch={true}>
                                                {selectedCard.images.map((image: any, index: any) => (
                                                    <Carousel.Item key={index}>
                                                        <CldImage
                                                            src={image}
                                                            width="600"
                                                            height="700"
                                                            crop="fill"
                                                            gravity="auto"
                                                            className="object-contain rounded shadow-sm"
                                                            alt={`${selectedCard.name} - תמונה ${index + 1}`}
                                                            loading="lazy"
                                                            style={{ height: '40vh' }}
                                                        />
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="p-2 pt-0">
                                        <div className="flex items-center my-4">
                                            <div className='mb-auto'>
                                                {selectedCard.logo && (
                                                    <CldImage
                                                        src={selectedCard.logo}
                                                        width="50"
                                                        height="50"
                                                        className="rounded-circle"
                                                        alt={`${selectedCard.name} לוגו`}
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <span className="font-bold ms-2">{selectedCard.name}</span>
                                                <p className="text-gray-600 ms-2">{selectedCard.description}</p>
                                            </div>
                                        </div>
                                        <Accordion>
                                            <Accordion.Item eventKey='0' className='border-0'>
                                                <Accordion.Header
                                                    className="flex align-items-center"
                                                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                                                >
                                                    <div className='flex justify-content-center align-items-center' style={{ width: '50px', height: '40px' }}>
                                                        <i className="bi bi-geo-alt text-gray-600"></i>
                                                    </div>
                                                    <span className="hover:text-green-500 ms-2">{selectedCard.address}</span>
                                                </Accordion.Header>
                                                <Accordion.Body style={{ background: '#fafcf9' }}>
                                                    <div className=''>
                                                        {isAccordionOpen && <Maps card={selectedCard} />}
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                        <div className="flex align-items-center">
                                            <div className='flex justify-content-center align-items-center' style={{ width: '50px', height: '40px' }}>
                                                <i className="bi bi-telephone text-gray-600"></i>
                                            </div>
                                            <Link href={`tel:${selectedCard.phone}`} className="hover:text-green-500 ms-2">{selectedCard.phone}</Link>
                                        </div>
                                        <div className="flex align-items-center ">
                                            <div className='flex justify-content-center align-items-center' style={{ width: '50px', height: '40px' }}>
                                                <i className="bi bi-envelope text-gray-600"></i>
                                            </div>
                                            <Link href={`mailto:${selectedCard.email}`} className="hover:text-green-500 ms-2">{selectedCard.email}</Link>
                                        </div>
                                        {selectedCard.website && (
                                            <div className="flex align-items-center ">
                                                <div className='flex justify-content-center align-items-center' style={{ width: '50px', height: '40px' }}>
                                                    <i className="bi bi-globe text-gray-600"></i>
                                                </div>
                                                <Link href={selectedCard.website} target="_blank" rel="noopener noreferrer" className="hover:text-green-500  ms-2">
                                                    {selectedCard.website}
                                                </Link>
                                            </div>
                                        )}
                                        {selectedCard.hours.sunday && (
                                            <Accordion className="business-hours-accordion">
                                                <Accordion.Item eventKey='0'>
                                                    <Accordion.Header>
                                                        <div className='hours-icon-wrapper'>
                                                            <i className="bi bi-clock"></i>
                                                        </div>
                                                        <span className='hours-title'>שעות פעילות</span>
                                                        <div className="status-indicator">
                                                            {calculateIsOpenNow(selectedCard.hours) ? (
                                                                <span className="status-badge status-open">
                                                                    <i className="bi bi-circle-fill me-1"></i>
                                                                    פתוח עכשיו
                                                                </span>
                                                            ) : (
                                                                <span className="status-badge status-closed">
                                                                    <i className="bi bi-circle-fill me-1"></i>
                                                                    סגור עכשיו
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <table className="hours-table">
                                                            <tbody>
                                                                {renderGroupedHours(selectedCard.hours).map((row: any, index: any) => (
                                                                    <React.Fragment key={index}>
                                                                        <tr className="hours-row">
                                                                            <td className="hours-spacer"></td>
                                                                            <td className="days-column">{row.days}</td>
                                                                            <td className="time-column">{row.timeRange}</td>
                                                                        </tr>
                                                                        {row.note && (
                                                                            <tr className="note-row">
                                                                                <td className="hours-spacer"></td>
                                                                                <td colSpan={2} className="note-text">{row.note}</td>
                                                                            </tr>
                                                                        )}
                                                                    </React.Fragment>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalInfoCard