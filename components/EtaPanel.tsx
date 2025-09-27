import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import StopEtaCard from "./StopEtaCard";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import SearchBar from "./SearchBar";
import * as Location from "expo-location";
import { useDistance } from "../hooks/useDistance";
import { Stop } from "../models/route";

interface Position {
  busId: string;
  lat: number;
  lng: number;
}

interface Props {
  stops: Stop[];
  etasByBus: Record<string, { stopId: number; minutes: number }[]>;
  positions: Record<string, Position>;
  mapRef: React.RefObject<MapView | null>;
}

export default function EtaPanel({
  stops,
  etasByBus,
  positions,
  mapRef,
}: Props) {
  const screenHeight = Dimensions.get("window").height;
  const [expanded, setExpanded] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const heightAnim = useSharedValue(screenHeight * 0.4);

  const { sortStopsByNearestBus } = useDistance();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permiso de ubicación denegado");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Actualizar altura animada
  useEffect(() => {
    const targetHeight =
      keyboardVisible || expanded ? screenHeight * 0.9 : screenHeight * 0.4;
    heightAnim.value = withTiming(targetHeight);
  }, [expanded, keyboardVisible]);

  const toggleExpand = () => setExpanded((prev) => !prev);

  const animatedPanelStyle = useAnimatedStyle(() => ({
    height: heightAnim.value,
  }));

  const filteredStops = sortStopsByNearestBus(
    stops.filter((stop) =>
      stop.name.toLowerCase().includes(searchText.toLowerCase())
    ),
    positions
  );

  return (
    <Animated.View style={[styles.panel, animatedPanelStyle]}>
      <TouchableOpacity style={styles.expandBtnLeft} onPress={toggleExpand}>
        <Ionicons
          name={expanded ? "chevron-down-outline" : "chevron-up-outline"}
          size={28}
          color="#333"
        />
      </TouchableOpacity>

      <Text style={styles.title}>⏱ Tiempos estimados</Text>

      <SearchBar
        placeholder="Buscar Parada"
        value={searchText}
        onChange={setSearchText}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {filteredStops.map((stop) => (
          <StopEtaCard
            key={stop.id}
            stop={stop}
            etasByBus={etasByBus}
            positions={positions}
            mapRef={mapRef}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    zIndex: 100,
  },
  expandBtnLeft: {
    position: "absolute",
    top: 10,
    left: 15,
    zIndex: 200,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 5,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111",
    textAlign: "center",
  },
});
