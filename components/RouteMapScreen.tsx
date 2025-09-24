import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { RootStackParamList } from "../App";
import { useBusPositions } from "../hooks/useBusPositions";
import { fetchRouteStops } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "RouteMap">;

interface RouteStop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function RouteMapScreen({ route }: Props) {
  const { routeId } = route.params;
  const [stops, setStops] = useState<RouteStop[]>([]);
  const buses = useBusPositions(routeId.toString());
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    fetchRouteStops(routeId).then(setStops).catch(console.error);
  }, [routeId]);

  useEffect(() => {
    if (stops.length > 0) {
      mapRef.current?.fitToCoordinates(
        stops.map(s => ({ latitude: s.latitude, longitude: s.longitude })),
        { edgePadding: { top: 50, bottom: 50, left: 50, right: 50 }, animated: true }
      );
    }
  }, [stops]);

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={StyleSheet.absoluteFillObject}>
        {/* Paradas */}
        {stops.map(stop => (
          <Marker
            key={stop.id}
            coordinate={{ latitude: stop.latitude, longitude: stop.longitude }}
            title={stop.name}
            pinColor="blue"
          />
        ))}

        {/* Línea de la ruta */}
        {stops.length > 1 && (
          <Polyline
            coordinates={stops.map(s => ({ latitude: s.latitude, longitude: s.longitude }))}
            strokeColor="red"
            strokeWidth={4}
          />
        )}

        {/* Buses en vivo */}
        {buses.map(bus => (
          <Marker
            key={bus.busId}
            coordinate={{ latitude: bus.lat, longitude: bus.lng }}
            title={`Bus ${bus.busId}`}
            pinColor="green"
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
