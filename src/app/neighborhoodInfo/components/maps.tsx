'use client'
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import './maPstyle.css';
import { Icon } from "leaflet";

const myIcon = new Icon({
    iconUrl: "/images/Asset 2@1.5x1.png",
    iconSize: [40, 40],
    iconAnchor: [20, 45],
    popupAnchor: [0, -40],
    tooltipAnchor: [-50, -20]
})

const Maps = (props: any) => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        // חיפוש המיקום לפי שם
        provider.search({ query: props.card.address }).then((result) => {
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
            {/* <h1 className="map-title">מפה עם חיפוש לפי כתובת</h1> */}
            {position && (
                <MapContainer center={position} zoom={16} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={19}
                    />
                    {position && (
                        <Marker position={position} icon={myIcon}>
                            <Popup>{props.card.address} - {props.card.name}</Popup>
                            <Tooltip>
                                {props.card.address}
                            </Tooltip>
                        </Marker>
                    )}
                </MapContainer>
            )}
        </div>
    );
};

export default Maps;