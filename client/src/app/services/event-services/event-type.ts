interface ImageType {
  id?: number;
  name: string;
}

export interface EventType {
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  venue: string;
  city: string;
  lon: number;
  lat: number;
  fees: number;
  banner: File | string;
  images: ImageType[];
}
