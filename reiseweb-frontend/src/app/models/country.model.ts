export interface Country {
    id: number;
    code: string;
    name: string;
    nameGerman: string;
    continent: string;
    capital: string;
    description: string;
    descriptionGerman: string;
    cityCount: number;
  }
  export interface ExternalCountryInfo {
    name: string;
    capital: string;
    region: string;
    subregion: string;
    population: number;
    area: number;
    languages: string[];
    currencies: string[];
    timezones: string[];
    flagUrl: string;
    googleMapsUrl: string;
  }