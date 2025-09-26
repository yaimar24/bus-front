import { useEffect, useState } from "react";

interface Position { busId: string; lat: number; lng: number; }
interface Stop { id: number; latitude: number; longitude: number; }

export function useEtaCalculator(
  positions: Record<string, Position>,
  stops: Stop[] = []
) {
  const [etasByBus, setEtasByBus] = useState<
    Record<string, { stopId: number; minutes: number }[]>
  >({});

  useEffect(() => {
    if (!stops.length) {
      setEtasByBus({});
      return;
    }

    const newEtas: Record<string, { stopId: number; minutes: number }[]> = {};

    for (const bus of Object.values(positions)) {
      if (!bus) continue;
      const origin = { lat: bus.lat, lng: bus.lng };

      newEtas[bus.busId] = stops.map((stop) => {
        const minutes = calculateEtaMinutes(origin, {
          lat: stop.latitude,
          lng: stop.longitude,
        });
        return { stopId: stop.id, minutes };
      });
    }

    setEtasByBus(newEtas);
  }, [positions, stops]);

  return etasByBus;
}

function calculateEtaMinutes(
  origin: { lat: number; lng: number },
  dest: { lat: number; lng: number }
) {
  const distanceKm = haversineDistance(origin, dest);
  const speedKmH = 30;
  return Math.round((distanceKm / speedKmH) * 60);
}

function haversineDistance(coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLon = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const lat1 = (coord1.lat * Math.PI) / 180;
  const lat2 = (coord2.lat * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
