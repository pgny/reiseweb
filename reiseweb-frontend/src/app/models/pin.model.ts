import { PinImage } from "./pin-image.model";

export interface Pin {
    id: number;
    title: string;
    notes: string;
    latitude: number;
    longitude: number;
    visitDate: string;
    rating: number;
    countryCode: string;
    countryName: string;
    cityName: string;
    images: PinImage[]

}