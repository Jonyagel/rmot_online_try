'use client'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import './maPstyle.css';
import { Icon } from "leaflet";
import { CldImage } from 'next-cloudinary';

const myIcon = new Icon({
    // iconUrl: "/images/icon-logo/מיקום.png",
    iconUrl: "/images/geo-alt-fill.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 45],
    popupAnchor: [0, -40],
    tooltipAnchor: [-50, -20]
})

const Maps = (props: any) => {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // מצב חדש להודעת שגיאה

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        // חיפוש המיקום לפי שם
        provider.search({ query: props.card.address }).then((result) => {
            if (result.length > 0) {
                const { y, x } = result[0]; // קואורדינטות
                setPosition([y, x]); // עדכון המיקום
                setErrorMessage(null); // נקה הודעת שגיאה אם נמצא מיקום
            } else {
                setErrorMessage('לא נמצאו תוצאות עבור הכתובת'); // עדכון הודעת שגיאה
            }
        }).catch((error) => {
            setErrorMessage('שגיאה בחיפוש: ' + error.message); // עדכון הודעת שגיאה במקרה של שגיאה
        });
    }, []);

    return (
        <div className="map-container">
            {errorMessage ? (
                <>
                    <MapContainer center={[31.8175, 35.1942]} zoom={14} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            maxZoom={19}
                        />
                    </MapContainer>
                    <div className="error-message">{errorMessage}</div> {/* הצגת הודעת שגיאה */}
                </>
            ) : (
                position && (
                    <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            maxZoom={19}
                        />
                        <Marker position={position} icon={myIcon}>
                            <Popup>
                                <CldImage
                                    src={props.card.logo}
                                    width="200"
                                    height="200"
                                    crop="fill"
                                    gravity="auto"
                                    className="w-full object-cover rounded"
                                    alt={`${props.card.logo} - logo`}
                                    loading="lazy"
                                />
                                {props.card.address} - {props.card.name}
                            </Popup>
                        </Marker>
                    </MapContainer>
                )
            )}
        </div>
    );
};

export default Maps;
