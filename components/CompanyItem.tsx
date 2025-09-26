import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteDto } from "../models/route";

interface Props {
  id: number;
  name: string;
  expanded: boolean;
  onToggle: (id: number) => void;
  routes?: (RouteDto | RouteDto)[];
  onOpenRouteMap: (route: RouteDto) => void;
}

export default function CompanyItem({ id, name, expanded, onToggle, routes, onOpenRouteMap }: Props) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.item, expanded && styles.active]}
        onPress={() => onToggle(id)}
        activeOpacity={0.8}
      >
        <Ionicons name="business-outline" size={24} color="#1667d1" />
        <Text style={styles.text}>{name}</Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={22} color="#555" />
      </TouchableOpacity>

      {expanded && routes && (
        <View style={styles.routesContainer}>
          {routes.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={styles.routeItem}
              onPress={() => onOpenRouteMap(route)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="git-branch-outline" size={20} color="#1667d1" />
                <Text style={styles.routeText}>{route.name}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#555" />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 16, marginBottom: 8, borderRadius: 16, overflow: "hidden" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
  },
  active: { backgroundColor: "#e0f0ff" },
  text: { fontSize: 16, fontWeight: "600", marginLeft: 12, color: "#111" },
  routesContainer: { paddingVertical: 4, paddingLeft: 20 },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: "#e6f7ff",
  },
  routeText: { marginLeft: 10, fontSize: 14, fontWeight: "500", color: "#111" },
});
