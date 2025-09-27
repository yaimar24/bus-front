export interface Stop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  order: number;
}

export interface RouteDto {
  id: number;
  name: string;
  stops: Stop[];
}
