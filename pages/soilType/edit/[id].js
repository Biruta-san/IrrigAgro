import axios from "axios";
import { BASE_ROUTE_SOIL_TYPE } from "../../../src/constants/apiRoutes";
import SoilTypeEditPage from "../../../src/modules/SoilType/screens/SoilTypeEditPage";

export async function getServerSideProps(context) {

    const id = parseInt(context.query.id);

    let loading = false;

    let data;

    const getDataById = async () => {
        try {
            loading = true;
            const route = `${BASE_ROUTE_SOIL_TYPE}/${id}`
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
            id: dados.TPSO_ID,
            nome: dados.TPSO_Nome,
            descricao: dados.TPSO_Descricao
        }
    }
}

const SoilEdit = (props) => {
    return(
        <SoilTypeEditPage id={props.id} nome={props.nome} descricao={props.descricao}/>
    );
    }
export default SoilEdit;