import axios from 'axios';
import { BASE_ROUTE_MEASURE_UNIT } from '../../../src/constants/apiRoutes';
import MeasureUnitEditPage from '../../../src/modules/MeasureUnit/screens/MeasureUnitEditPage';

export async function getServerSideProps(context) {

    const id = parseInt(context.query.id);

    let loading = false;

    let data;

    const getDataById = async () => {
        try {
            loading = true;
            const route = `${BASE_ROUTE_MEASURE_UNIT}/${id}`
            const result = await axios.get(route);
            data = result.data;
        } catch (error) {
            console.error(error);
        } finally {
            loading = false;
        }
    }
    await getDataById();

    /* Dados Mocados */
    /*const mock = [
      {
        id: 1,
        nome: 'nome1',
        descricao: 'desc1',
        sigla: 9
      },
      {
        id: 2,
        nome: 'nome2',
        descricao: 'desc2',
        sigla: 0
      },
      {
        id: 3,
        nome: 'nome3',
        descricao: 'desc3',
        sigla: 10
      },
    ];
    data = mock.filter((dado) => dado.id === id);
    console.log(data[0]);
    */

    const dados = data.rows[0];

    return {
        props: {
            id: dados.UNME_ID,
            nome: dados.UNME_Nome,
            sigla: dados.UNME_Sigla,
            descricao: dados.UNME_Descricao
        }
    }
}

const MeasureUnitEdit = (props) => {
    return <MeasureUnitEditPage {...props} />
}

export default MeasureUnitEdit;