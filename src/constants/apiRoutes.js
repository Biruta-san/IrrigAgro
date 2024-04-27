/* FAZENDA */
/* base route para desenvolvimento */
const API_BASE_ROUTE = 'http://localhost:3000/api';
/* base route para produção */
//const API_BASE_ROUTE = 'https://irriga-agro.vercel.app/api';

/* Rotas de API de Fazendas */
export const GET_FAZENDAS = `${API_BASE_ROUTE}/Farm/getFazendas`;
export const POST_FAZENDAS = `${API_BASE_ROUTE}/Farm/postFazenda`;

/* Rotas de API de Sensores */
export const GET_SENSORES = `${API_BASE_ROUTE}/Sensor/getAllSensores`;
export const POST_SENSOR = `${API_BASE_ROUTE}/Sensor/postSensor`;

/* Rotas de API de Plantas */
export const BASE_ROUTE_PLANTA = `${API_BASE_ROUTE}/Plant`
export const GET_PLANTAS = `${BASE_ROUTE_PLANTA}/getAllPlants`;
export const POST_PLANTA = `${BASE_ROUTE_PLANTA}/postPlant`;


/* Rotas de API de Unidades de Medida */
export const BASE_ROUTE_MEASURE_UNIT = `${API_BASE_ROUTE}/MeasureUnit`
export const GET_MEASURE_UNIT = `${BASE_ROUTE_MEASURE_UNIT}/getAllMeasureUnits`;
export const POST_MEASURE_UNIT = `${BASE_ROUTE_MEASURE_UNIT}/postMeasureUnit`;