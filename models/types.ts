export interface BusRoute {
  id: number;
  name: string;
  description?: string;
}

export interface RouteStop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  order: number;
  busRouteId: number;
}
