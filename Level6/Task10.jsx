import { useState, useEffect } from "react";

const useGeolocation = () => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
        }

        const success = (position) => {
        setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        });
        };

        const errorHandler = (err) => {
        setError(err.message);
        };

        const watcher = navigator.geolocation.watchPosition(success, errorHandler);
        
        return () => navigator.geolocation.clearWatch(watcher);
    }, []);

    return { location, error };
    };

    const GeolocationComponent = () => {
    const { location, error } = useGeolocation();

    return (
        <div className="geolocation-container">
        <h1>User Geolocation</h1>
        {error ? (
            <p>Error: {error}</p>
        ) : location.lat && location.lon ? (
            <p>
            Latitude: {location.lat}, Longitude: {location.lon}
            </p>
        ) : (
            <p>Fetching location...</p>
        )}
        </div>
    );
    };

export default GeolocationComponent;
