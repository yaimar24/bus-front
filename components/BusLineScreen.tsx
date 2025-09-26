import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import {
  fetchCompanies,
  fetchRoutesByCompany,
  fetchBusesByRoute,
} from "../services/api";
import SearchBar from "../components/SearchBar";
import CompanyItem from "../components/CompanyItem";
import { RouteDto } from "../models/route";
import { Bus } from "../models/bus";
import { Company } from "../models/company";

type Props = NativeStackScreenProps<RootStackParamList, "BusLine">;



if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function BusLineScreen({ navigation }: Props) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null);
  const [routes, setRoutes] = useState<{ [companyId: number]: RouteDto[] }>({});
  const [buses, setBuses] = useState<{ [routeId: number]: Bus[] }>({});

  useEffect(() => {
    fetchCompanies()
      .then(setCompanies)
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleCompany = async (companyId: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
    if (!routes[companyId]) {
      try {
        const data = await fetchRoutesByCompany(companyId);
        setRoutes((prev) => ({ ...prev, [companyId]: data }));
      } catch (err) {
        console.error("Error fetching routes:", err);
      }
    }
  };

  const handleOpenRouteMap = async (route: RouteDto) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    try {
      let routeBuses = buses[route.id];
      if (!routeBuses) {
        routeBuses = await fetchBusesByRoute(route.id);
        setBuses((prev) => ({ ...prev, [route.id]: routeBuses }));
      }
      const fullRoute = routeBuses?.[0]?.route ?? route;
      navigation.navigate("BusMap", { route: fullRoute, buses: routeBuses });
    } catch (err) {
      console.error("Error fetching buses for route:", err);
      navigation.navigate("BusMap", { route: route, buses: [] });
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar  placeholder={"Buscar Compañia"}  value={search} onChange={setSearch} />
      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CompanyItem
            id={item.id}
            name={item.name}
            expanded={expandedCompany === item.id}
            onToggle={handleToggleCompany}
            routes={routes[item.id] as RouteDto[]} 
            onOpenRouteMap={handleOpenRouteMap}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No se encontraron compañías.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4f8" },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#999",
  },
});
