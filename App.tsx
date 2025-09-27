import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeDashboard  from './components/HomeScreen';
import BusLineScreen from './components/BusLineScreen';
import BusMapScreen from './components/BusMapScreen';
import { RouteDto } from './models/route';
import { Bus } from './models/bus';

export type RootStackParamList = {
  Home: undefined; 
  BusLine: undefined; 
  BusMap: { route: RouteDto; buses?: Bus[]; busId?: number; plateNumber?: string };
  RouteMap: { routeId: number; routeName: string }; 
};



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeDashboard} />
        <Stack.Screen name="BusLine" component={BusLineScreen} /> 
        <Stack.Screen name="BusMap" component={BusMapScreen} options={{ title: "Mapa del Bus" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
