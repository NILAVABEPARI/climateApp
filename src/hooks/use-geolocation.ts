import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

export function useGeoLocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true
    });

    const successFunction = (position: GeolocationPosition) => {
        setLocationData({
            coordinates: {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            },
            error: null,
            isLoading: false
        })
    }

    const errorFunction = (error: GeolocationPositionError) => {
        let errorMessage: string;

        switch (error.code) {
            case GeolocationPositionError.PERMISSION_DENIED:
                errorMessage = "Location permission denied. Please enable location access.";
                break;
            case GeolocationPositionError.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable..";
                break;
            case GeolocationPositionError.TIMEOUT:
                errorMessage = "Location request timed out.";
                break;
            default: errorMessage = "An unknown error occurred.";
        }

        setLocationData({
            coordinates: null,
            error: errorMessage,
            isLoading: false
        })
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    const getLocation = () => {
        setLocationData((prev) => ({
            ...prev, isLoading: true, error: null
        }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                isLoading: false
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(successFunction, errorFunction, options);
    }

    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation
    }
}