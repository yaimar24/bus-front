import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen  from './components/HomeScreen';
import  RouteMapScreen  from './components/RouteMapScreen';

// App.tsx o donde defines el stack
export type RootStackParamList = {
  Home: undefined; // Home no recibe params
  RouteMap: { routeId: number; routeName: string }; // RouteMap sí recibe params
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RouteMap" component={RouteMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
