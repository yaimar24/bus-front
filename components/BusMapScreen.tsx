import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Bus } from "../App";
import { useBusPositions } from "../hooks/useBusPositions";
import { useEtaCalculator } from "../hooks/useEtaCalculator";
import EtaPanel from "../components/EtaPanel";

type Props = NativeStackScreenProps<RootStackParamList, "BusMap">;

export default function BusMapScreen({ route }: Props) {
  const { route: busRoute, buses } = route.params ?? {};
  const busIds = (buses ?? []).map((b: Bus) => String(b.id));

  const positions = useBusPositions(busIds);
  const mapRef = useRef<MapView>(null);

  const etasByBus = useEtaCalculator(positions, busRoute?.stops);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: busRoute?.stops?.[0]?.latitude ?? 19.4326,
          longitude: busRoute?.stops?.[0]?.longitude ?? -99.1332,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {Object.values(positions).map((pos) => (
          <Marker
            key={pos.busId}
            coordinate={{ latitude: pos.lat, longitude: pos.lng }}
            title={`Bus ${pos.busId}`}
          >
            <Ionicons name="bus" size={40} color="#1667d1" />
          </Marker>
        ))}

        {busRoute?.stops?.map((stop) => (
          <Marker
            key={stop.id}
            coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
            title={stop.name}
          >
            <Ionicons name="location" size={30} color="green" />
          </Marker>
        ))}

        {busRoute?.stops && busRoute.stops.length > 1 && (
          <Polyline
            coordinates={busRoute.stops.map((s) => ({
              latitude: s.latitude,
              longitude: s.longitude,
            }))}
            strokeColor="#1667d1"
            strokeWidth={4}
          />
        )}
      </MapView>

      {busRoute?.stops && (
        <EtaPanel stops={busRoute.stops} etasByBus={etasByBus} positions={positions} mapRef={mapRef} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  map: { width: Dimensions.get("window").width, height: Dimensions.get("window").height },
});
