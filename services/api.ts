import axios from "axios";

const API_URL = "http://192.168.1.6:5262"

export async function fetchRoutes() {
  const res = await axios.get(`${API_URL}/busroutes`);
  return res.data;
}

export async function fetchRouteStops(routeId: number) {
  const res = await axios.get(`${API_URL}/routestops?routeId=${routeId}`);
  return res.data;
}

export async function fetchBuses(route?: string) {
  const url = route ? `${API_URL}/buses?routeId=${route}` : `${API_URL}/buses`;
  const res = await axios.get(url);
  return res.data;
}
