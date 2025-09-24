import * as SignalR from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { fetchBuses } from "../services/api";

export interface BusPosition {
  busId: string;
  route: string;
  lat: number;
  lng: number;
  speed?: number;
  timestamp: string;
  source: string;
}

export function useBusPositions(route?: string) {
  const [positions, setPositions] = useState<BusPosition[]>([]);

  useEffect(() => {
    let connection: SignalR.HubConnection;

    async function init() {
      // 1️⃣ Snapshot inicial
      const initial = await fetchBuses(route);
      setPositions(initial);

      // 2️⃣ Conectar a SignalR
      connection = new SignalR.HubConnectionBuilder()
        .withUrl("http://192.168.1.6:5262/positionshub")
        .withAutomaticReconnect()
        .build();

      connection.on("ReceivePosition", (pos: BusPosition) => {
        if (route && pos.route !== route) return;

        // ✅ Actualizar sin duplicar buses
        setPositions(prev => {
          const idx = prev.findIndex(b => b.busId === pos.busId);
          if (idx >= 0) {
            const newArr = [...prev];
            newArr[idx] = pos;
            return newArr;
          }
          return [...prev, pos];
        });
      });

      await connection.start();

      if (route) {
        connection.invoke("SubscribeRoute", route).catch(console.error);
      }

      console.log("✅ Conectado a SignalR y listo");
    }

    init();

    return () => {
      connection?.stop();
    };
  }, [route]);

  return positions;
}
