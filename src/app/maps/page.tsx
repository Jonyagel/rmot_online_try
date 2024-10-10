// MapPage.js
'use client'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import './style.css';

const MapPage = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        // חיפוש המיקום לפי שם
        provider.search({ query: 'דרוק 70, ירושלים' }).then((result) => {
            if (result.length > 0) {
                const { y, x } = result[0]; // קואורדינטות
                setPosition([y, x]); // עדכון המיקום
            } else {
                console.error('לא נמצאו תוצאות עבור הכתובת');
            }
        }).catch((error) => {
            console.error('שגיאה בחיפוש:', error);
        });
    }, []);

    return (
        <div className="map-container">
            <h1 className="map-title">מפה עם חיפוש לפי כתובת</h1>
            <MapContainer center={position || [31.775, 35.207]} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxZoom={19}
                />
                {position && (
                    <Marker position={position}>
                        <Popup>דרוק 70, ירושלים</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default MapPage;