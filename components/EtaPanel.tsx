import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import StopEtaCard from "./StopEtaCard";
import MapView from "react-native-maps";

interface Props {
  stops: { id: number; name: string; order: number; latitude: number; longitude: number }[];
  etasByBus: Record<string, { stopId: number; minutes: number }[]>;
  positions: Record<string, { busId: string; lat: number; lng: number }>;
  mapRef: React.RefObject<MapView | null>; 
}

export default function EtaPanel({ stops, etasByBus, positions, mapRef }: Props) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.title}>⏱ Tiempos estimados</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {stops.map((stop) => (
          <StopEtaCard
            key={stop.id}
            stop={stop}
            etasByBus={etasByBus}
            positions={positions}
            mapRef={mapRef}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get("window").height * 0.6,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    elevation: 10,
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#111" },
});
