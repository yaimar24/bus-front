import { Stop } from "../models/route";

interface Position {
  busId: string;
  lat: number;
  lng: number;
}

export function useDistance() {
  // Fórmula de Haversine para calcular distancia en KM
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radio de la tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // distancia en km
  };

  // Calcula la distancia al bus más cercano para una parada
  const getNearestBusDistance = (
    stop: Stop,
    positions: Record<string, Position>
  ) => {
    const buses = Object.values(positions);
    if (buses.length === 0) return Infinity;

    let minDist = Infinity;
    for (const bus of buses) {
      const dist = getDistance(stop.latitude, stop.longitude, bus.lat, bus.lng);
      if (dist < minDist) minDist = dist;
    }
    return minDist;
  };

  // Ordena paradas según el bus más cercano
  const sortStopsByNearestBus = (
    stops: Stop[],
    positions: Record<string, Position>
  ) => {
    return [...stops].sort((a, b) => {
      const nearestBusA = getNearestBusDistance(a, positions);
      const nearestBusB = getNearestBusDistance(b, positions);
      return nearestBusA - nearestBusB;
    });
  };

  return { getDistance, getNearestBusDistance, sortStopsByNearestBus };
}
