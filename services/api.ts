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
// GET /companies
export async function fetchCompanies() {
  const res = await axios.get(`${API_URL}/companies`);
  return res.data; // lista de empresas
}

export async function fetchRoutesByCompany(id: number) {
   const res = await axios.get(`${API_URL}/companies/${id}/routes`);
  return res.data; // detalle de la empresa
}

export async function fetchBusPosition(id: number) {
   const res = await axios.get(`${API_URL}/Buses/${id}`);
  return res.data; // detalle de la empresa
}
// GET /companies/5/buses
export async function fetchBusesByCompany(companyId: number) {
  const res = await axios.get(`${API_URL}/companies/${companyId}/buses`);
  return res.data; // buses de la empresa incluyendo su ruta
}
// GET /busassignments
export async function fetchBusAssignments() {
  const res = await axios.get(`${API_URL}/busassignments`);
  return res.data; // lista de asignaciones
}

export async function fetchBusesByRoute(routeId: number) {
  const res = await axios.get(`${API_URL}/busroutes/${routeId}/buses`);
  return res.data; // lista de buses de esa ruta
}

// GET /busassignments/5
export async function fetchBusAssignmentById(id: number) {
  const res = await axios.get(`${API_URL}/busassignments/${id}`);
  return res.data; // detalle de una asignación
}
// GET /drivers
export async function fetchDrivers() {
  const res = await axios.get(`${API_URL}/drivers`);
  return res.data; // lista de conductores
}

// GET /drivers/5
export async function fetchDriverById(id: number) {
  const res = await axios.get(`${API_URL}/drivers/${id}`);
  return res.data; // detalle de un conductor
}
