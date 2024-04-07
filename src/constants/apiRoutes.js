/* FAZENDA */
/* base route para desenvolvimento */
//const API_BASE_ROUTE = 'http://localhost:3000/api';
/* base route para produção */
const API_BASE_ROUTE = 'https://irriga-agro.vercel.app/api';

export const GET_FAZENDAS = `${API_BASE_ROUTE}/Farm/getFazendas`;
export const POST_FAZENDAS = `${API_BASE_ROUTE}/Farm/PostFazenda`;