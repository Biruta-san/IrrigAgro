import axios from 'axios';
import { BASE_ROUTE_PLANTA } from '../../../src/constants/apiRoutes';
import PlantEditPage from '../../../src/modules/Plant/screens/PlantEditPage';

export async function getServerSideProps(context) {

    const id = parseInt(context.query.id);

    let loading = false;

    let data;

    const getDataById = async () => {
        try {
            loading = true;
            const route = `${BASE_ROUTE_PLANTA}/${id}`
            const result = await axios.get(route);
            data = result.data;
        } catch (error) {
            console.error(error);
        } finally {
            loading = false;
        }
    }
    await getDataById();

    const dados = data.rows[0];

    return {
        props: {
            id: dados.PLNT_ID,
            nome: dados.PLNT_Nome,
            descricao: dados.PLNT_Descricao,
            temperaturaRecomendada: dados.PLNT_TemperaturaRecomendada,
            umidadeRecomendada: dados.PLNT_UmidadeRecomendada
        }
    }
}

const PlantEdit = (props) => {

    return (
        <>
            <PlantEditPage
                id={props.id}
                nome={props.nome}
                descricao={props.descricao}
                temperaturaRecomendada={props.temperaturaRecomendada}
                umidadeRecomendada={props.umidadeRecomendada}
            />
        </>
    );
};

export default PlantEdit;