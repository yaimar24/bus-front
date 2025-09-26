// hooks/useBusPositions.ts
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

const API_URL = "http://192.168.1.6:5262";

export interface BusPosition {
  busId: string;
  lat: number;
  lng: number;
  speed?: number;
  timestamp?: string;
}

export function useBusPositions(busIds: string[]) {
  const [positions, setPositions] = useState<Record<string, BusPosition>>({});

  useEffect(() => {
    if (!busIds || busIds.length === 0) return;

    let connection: signalR.HubConnection;

    const start = async () => {
      try {
        // Snapshot inicial
        for (const busId of busIds) {
          try {
            const res = await axios.get(`${API_URL}/Buses/${busId}`);
            if (res.data) {
              setPositions((prev) => ({
                ...prev,
                [busId]: {
                  busId: String(res.data.busId),
                  lat: Number(res.data.latitude),
                  lng: Number(res.data.longitude),
                  speed: res.data.speed,
                  timestamp: res.data.timestamp,
                },
              }));
            }
          } catch (err) {
            console.error(`❌ Error obteniendo snapshot del bus ${busId}`, err);
          }
        }

        // Conexión SignalR
        connection = new signalR.HubConnectionBuilder()
          .withUrl(`${API_URL}/positionshub`)
          .withAutomaticReconnect()
          .build();

        connection.on("ReceivePosition", (data: any) => {
          const busId = String(data.busId);
          if (busIds.includes(busId)) {
            setPositions((prev) => ({
              ...prev,
              [busId]: {
                busId,
                lat: Number(data.latitude ?? data.lat),
                lng: Number(data.longitude ?? data.lng),
                speed: data.speed,
                timestamp: data.timestamp,
              },
            }));
          }
        });

        await connection.start();
        console.log("✅ Conectado a SignalR para buses:", busIds);
      } catch (err) {
        console.error("❌ Error en useBusPositions:", err);
      }
    };

    start();

    return () => {
      if (connection) connection.stop();
    };
  }, [JSON.stringify(busIds)]);

  return positions;
}
