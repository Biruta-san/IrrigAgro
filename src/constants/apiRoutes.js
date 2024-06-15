/* base route para desenvolvimento */
//const API_BASE_ROUTE = 'http://localhost:3000/api';
/* base route para produção */
const API_BASE_ROUTE = 'https://irriga-agro.vercel.app/api';

/* Rotas de API de Fazendas */
export const GET_FAZENDAS = `${API_BASE_ROUTE}/Farm/getFazendas`;
export const POST_FAZENDAS = `${API_BASE_ROUTE}/Farm/postFazenda`;

/* Rotas de API de Sensores */
export const BASE_ROUTE_SENSOR = `${API_BASE_ROUTE}/Sensor`
export const GET_SENSORES = `${BASE_ROUTE_SENSOR}/getAllSensores`;
export const POST_SENSOR = `${BASE_ROUTE_SENSOR}/postSensor`;
export const LIST_SENSOR = `${BASE_ROUTE_SENSOR}/list`;

/* Rotas de API de Plantas */
export const BASE_ROUTE_PLANTA = `${API_BASE_ROUTE}/Plant`
export const GET_PLANTAS = `${BASE_ROUTE_PLANTA}/getAllPlants`;
export const POST_PLANTA = `${BASE_ROUTE_PLANTA}/postPlant`;
export const LIST_PLANTA = `${BASE_ROUTE_PLANTA}/list`;

/* Rotas de API de Unidades de Medida */
export const BASE_ROUTE_MEASURE_UNIT = `${API_BASE_ROUTE}/MeasureUnit`
export const GET_MEASURE_UNIT = `${BASE_ROUTE_MEASURE_UNIT}/getAllMeasureUnits`;
export const POST_MEASURE_UNIT = `${BASE_ROUTE_MEASURE_UNIT}/postMeasureUnit`;
export const LIST_MEASURE_UNIT = `${BASE_ROUTE_MEASURE_UNIT}/list`;

/* Rotas de API de Unidades de Medida */
export const BASE_ROUTE_SOIL_TYPE = `${API_BASE_ROUTE}/SoilType`
export const GET_SOIL_TYPE = `${BASE_ROUTE_SOIL_TYPE}/getAllSoilTypes`;
export const POST_SOIL_TYPE = `${BASE_ROUTE_SOIL_TYPE}/postSoilType`;
export const LIST_SOIL_TYPE = `${BASE_ROUTE_SOIL_TYPE}/list`;

/* Rotas de API de Tipos de sensores */
export const BASE_ROUTE_SENSOR_TYPE = `${API_BASE_ROUTE}/SensorType`
export const GET_SENSOR_TYPE = `${BASE_ROUTE_SENSOR_TYPE}/getAllSensorTypes`;
export const POST_SENSOR_TYPE = `${BASE_ROUTE_SENSOR_TYPE}/postSensorType`;
export const LIST_SENSOR_TYPE = `${BASE_ROUTE_SENSOR_TYPE}/list`;

/* Rotas de API de Dados Sensores */
export const BASE_ROUTE_DATA = `${API_BASE_ROUTE}/SensorData`
export const GET_DATA = `${BASE_ROUTE_DATA}/getAllData`;