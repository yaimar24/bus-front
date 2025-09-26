import { RouteDto } from "./route";

export interface Bus {
  id: number;
  plateNumber: string;
  model?: string;
  capacity?: number;
  isActive?: boolean;
  route: RouteDto;
}
