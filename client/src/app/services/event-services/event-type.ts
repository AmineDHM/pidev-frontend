export interface EventType {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  venue: string;
  city: string;
  lon: number;
  lat: number;
  fees: number;
  banner: File | string;
}
