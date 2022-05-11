export interface ImageType {
  id?: number;
  name: string;
}

export interface EventType {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  venue: string;
  fees: number;
  banner: File | string;
  lon: number;
  lat: number;
  description: string;
  city: string;
  images: ImageType[];
}
