import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER profesional, SIN muescas */}
      <LinearGradient
        colors={["#0f57b3", "#1667d1"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.header}
      >
      

     {/*    <TouchableOpacity style={styles.gearButton} activeOpacity={0.8}>
          <View >
            <Ionicons name="settings-sharp" size={20} color="#fff" />
          </View>
        </TouchableOpacity> */}
      </LinearGradient>

      {/* Tarjeta que flota (sobre el header) */}
      <View style={styles.cardWrap}>
        <View style={styles.card}>
          {/* Líneas sutiles simulando mapa (puedes reemplazar por Image cuando tengas la real) */}
          <View style={[styles.mapLine, { top: 18, transform: [{ rotate: "-14deg" }] }]} />
          <View style={[styles.mapLine, { top: 46, transform: [{ rotate: "10deg" }] }]} />
          <View style={[styles.mapLine, { top: 78, transform: [{ rotate: "-6deg" }] }]} />

          {/* auto rojo minimalista */}
          <View style={styles.car}>
            <View style={styles.carBody} />
            <View style={[styles.wheel, { left: 8 }]} />
            <View style={[styles.wheel, { right: 8 }]} />
          </View>

          <Text style={styles.cardTitle}>Rastrea tu bus{"\n"}en tiempo real</Text>
        </View>
      </View>

      {/* Menú principal (espacioso, tipografía grande) */}
      <View style={styles.menu}>
     {/*    <MenuItem label="Buscar ruta" icon="navigate-outline" onPress={() => navigation.navigate("FindRoute")} /> */}
        <MenuItem label="Buscar línea de bus" icon="bus-outline" onPress={() => navigation.navigate("BusLine")} />
{/*         <MenuItem label="Mis rutas" icon="bookmark-outline" onPress={() => navigation.navigate("YourRoutes")} />
        <MenuItem label="Favoritos" icon="heart-outline" onPress={() => navigation.navigate("Favorites")} /> */}
      </View>
    </SafeAreaView>
  );
}

/* Componente reutilizable para item del menú */
function MenuItem({ label, icon, onPress }: { label: string; icon: React.ComponentProps<typeof Ionicons>["name"]; onPress?: () => void; }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={20} color="#1f3448" />
      </View>
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },

  /* HEADER */
  header: {
    height: 140,
    paddingHorizontal: 22,
    paddingBottom: 18,
    justifyContent: "flex-end",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    // para que la tarjeta pueda solaparse con buen contraste
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  gearButton: {
    position: "absolute",
    right: 18,
    top: 18,
  },

  /* Tarjeta blanca que flota */
  cardWrap: {
    marginTop: -36,
    paddingHorizontal: 18,
  },
  card: {
    height: 170,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 18,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  mapLine: {
    position: "absolute",
    left: -40,
    right: -40,
    height: 2,
    backgroundColor: "#eef2f4",
    opacity: 0.95,
  },

  car: {
    position: "absolute",
    top: 24,
    alignSelf: "center",
    width: 52,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  carBody: {
    width: 44,
    height: 20,
    backgroundColor: "#e64b4b",
    borderRadius: 6,
  },
  wheel: {
    position: "absolute",
    bottom: -4,
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#0b0b0b",
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0b0b0b",
    textAlign: "center",
    lineHeight: 30,
    marginTop: 34,
  },
  watermark: {
    position: "absolute",
    right: 14,
    bottom: 10,
    color: "#c0c7cb",
    fontSize: 11,
    letterSpacing: 1,
  },

  /* MENU */
  menu: {
    marginTop: 18,
    paddingBottom: 26,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#f2f6f9",
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    marginLeft: 16,
    fontSize: 18,
    color: "#0b2540",
    fontWeight: "700",
  },
});
