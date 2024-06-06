import axios from 'axios';
import { BASE_ROUTE_SENSOR_TYPE } from '../../../src/constants/apiRoutes';
import TipoSensorEditPage from '../../../src/modules/TypeSensor/screens/TipoSensorEditPage';
export async function getServerSideProps(context) {
    
    let loading = true;
    
    const id = parseInt(context.query.id);

    let data;

    const getDataById = async () => {
        try {
            loading = true;
            const route = `${BASE_ROUTE_SENSOR_TYPE}/${id}`
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
            id: dados.TPSE_ID,
            nome: dados.TPSE_Nome,
            descricao: dados.TPSE_Descricao,
            unidadeMedidaId: dados.UNME_ID,
        }
    }
}

const TipoSensorEdit = (props) => {

    return (
        <>
            <TipoSensorEditPage 
                id={props.id}
                nome={props.nome}
                descricao={props.descricao}
                unidadeMedidaId={props.unidadeMedidaId}
            />
        </>
    );
};

export default TipoSensorEdit;