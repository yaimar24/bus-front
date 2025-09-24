import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../App";
import { fetchRoutes } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

interface BusRoute {
  id: number;
  name: string;
  description: string;
}

export default function HomeScreen({ navigation }: Props) {
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRoutes().then(setRoutes).catch(console.error);
  }, []);

  const filteredRoutes = routes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Buscar ruta..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredRoutes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
         navigation.navigate("RouteMap", {
  routeId: item.id,
  routeName: item.name,
})

            }
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  desc: { fontSize: 14, color: "#555" },
});
