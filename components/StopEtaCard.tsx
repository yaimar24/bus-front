import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";

interface Props {
  stop: { id: number; name: string; order: number };
  etasByBus: Record<string, { stopId: number; minutes: number }[]>;
  positions: Record<string, { busId: string; lat: number; lng: number }>;
  mapRef: React.RefObject<MapView | null>; 
}

export default function StopEtaCard({ stop, etasByBus, positions, mapRef }: Props) {
  return (
    <View style={styles.stopCard}>
      <Text style={styles.stopName}>
        {stop.order}. {stop.name}
      </Text>
      <View style={styles.busList}>
        {Object.entries(etasByBus).map(([busId, etas]) => {
          const eta = etas?.find((e) => e.stopId === stop.id);
          const pos = positions[busId];

          return (
            <TouchableOpacity
              key={busId}
              style={styles.busRow}
              onPress={() => {
                if (pos) {
                  mapRef.current?.animateToRegion(
                    {
                      latitude: pos.lat,
                      longitude: pos.lng,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    },
                    1000
                  );
                }
              }}
            >
              <Ionicons name="bus" size={22} color="#1667d1" />
              <Text style={styles.etaText}>
                Bus {busId}: {eta ? `${eta.minutes} min` : "--"}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stopCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  stopName: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#333" },
  busList: { gap: 6 },
  busRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef5ff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  etaText: { fontSize: 15, color: "#1667d1", marginLeft: 8, fontWeight: "500" },
});
