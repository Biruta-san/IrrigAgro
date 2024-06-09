import axios from 'axios';
import { BASE_ROUTE_SENSOR } from '../../../src/constants/apiRoutes';
import SensorEditPage from '../../../src/modules/Sensor/screens/SensorEditPage';

export async function getServerSideProps(context) {

    const id = parseInt(context.query.id);

    let loading = false;

    let data;

    const getDataById = async () => {
        try {
            loading = true;
            const route = `${BASE_ROUTE_SENSOR}/${id}`
            const result = await axios.get(route);
            data = result.data;
            console.log(data)
        } catch (error) {
            console.error(error);
        } finally {
            loading = false;
        }
    }
    await getDataById();

    const dados = data.rows[0];

    const inputDateTimeLocalFormat = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        // Formatted string in "YYYY-MM-DDTHH:MM" format
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    dados.SESO_DataInstalacao = inputDateTimeLocalFormat(dados.SESO_DataInstalacao);

    return {
        props: {
            id: dados.SESO_ID,
            descricao: dados.SESO_Descricao,
            tipoSensorId: dados.TPSE_ID,
            tipoSoloId: dados.TPSO_ID,
            plantaId: dados.PLNT_ID,
            latitude: dados.SESO_Latitude,
            longitude: dados.SESO_Longitude,
            dataInstalacao: dados.SESO_DataInstalacao
        }
    }
}

const SensorEdit = (props) => {

    return (
        <SensorEditPage
            id={props.id}
            descricao={props.descricao}
            tipoSensorId={props.tipoSensorId}
            tipoSoloId={props.tipoSoloId}
            plantaId={props.plantaId}
            latitude={props.latitude}
            longitude={props.longitude}
            dataInstalacao={props.dataInstalacao}
        />
    );
};

export default SensorEdit;