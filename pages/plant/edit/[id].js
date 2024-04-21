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

    /* Dados Mocados */
    /*const mock = [
      {
        id: 1,
        nome: 'nome1',
        descricao: 'desc1',
        umidadeRecomendada: 9,
        temperaturaRecomendada: 0
      },
      {
        id: 2,
        nome: 'nome2',
        descricao: 'desc2',
        umidadeRecomendada: 0,
        temperaturaRecomendada: 3
      },
      {
        id: 3,
        nome: 'nome3',
        descricao: 'desc3',
        umidadeRecomendada: 10,
        temperaturaRecomendada: 3
      },
    ];
    data = mock.filter((dado) => dado.id === id);
    console.log(data[0]);
    */

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