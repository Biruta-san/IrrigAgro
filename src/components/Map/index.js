import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Box, useMediaQuery } from '@chakra-ui/react';

const Map = ({ setLatitude, setLongitude, latitude, longitude }) => {
    const [marker, setMarker] = useState(null);

    const [isLargerThan525] = useMediaQuery('(min-width: 525px)');
    const [isBiggerThan600] = useMediaQuery('(min-height: 700px)');

    useEffect(() => {
        if (latitude && longitude) {
            const newMarker = {
                position: [latitude, longitude],
                text: 'Marker'
            };
            setMarker(newMarker);
        }
    }, []);

    const handleMapClick = (e) => {
        const newMarker = {
            position: [e.latlng.lat, e.latlng.lng],
            text: 'Marker'
        };
        setLongitude(e.latlng.lng);
        setLatitude(e.latlng.lat);
        setMarker(newMarker);
    };

    // Event component for adding markers
    const AddMarker = ({ onClick }) => {
        useMapEvents({
            click: onClick
        });
        return null;
    };

    return (
        <Box w={isLargerThan525 ? "525px" : "350px"} h={isBiggerThan600 ? "525px" : "350px"}>
            <MapContainer
                center={[-15.816385, -47.98959]}
                zoom={5}
                style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {marker && (
                    <Marker position={marker.position}>
                        <Popup>{marker.text}</Popup>
                    </Marker>
                )}
                <AddMarker onClick={handleMapClick} />
            </MapContainer>
        </Box>
    );
};

export default Map;