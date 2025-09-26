export interface RouteSummary {
  id: number;
  name: string;
}

export interface RouteDto extends RouteSummary {
  stops: Stop[];
}

export interface Stop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  order: number;
}

