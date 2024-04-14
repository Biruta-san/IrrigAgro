/* FAZENDA */
/* base route para desenvolvimento */
//const API_BASE_ROUTE = 'http://localhost:3000/api';
/* base route para produção */
const API_BASE_ROUTE = 'https://irriga-agro.vercel.app/api';

export const GET_FAZENDAS = `${API_BASE_ROUTE}/Farm/getFazendas`;
export const POST_FAZENDAS = `${API_BASE_ROUTE}/Farm/postFazenda`;

export const GET_SENSORES = `${API_BASE_ROUTE}/Sensor/getAllSensores`;
export const POST_SENSOR = `${API_BASE_ROUTE}/Sensor/postSensor`;

export const GET_PLANTAS = `${API_BASE_ROUTE}/Planta/getAllPlantas`;
export const POST_PLANTA = `${API_BASE_ROUTE}/Planta/postPlanta`;