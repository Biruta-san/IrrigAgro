import { isNotNullOrEmpty } from '../../../src/utils/validate';
const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const pool = await connectToDatabase();

            const data = req.body;

            const treatData = () => {
                if (isNotNullOrEmpty(data.latitude))
                    data.latitude = parseFloat(data.latitude);
                else
                    data.latitude = null;
                if (isNotNullOrEmpty(data.longitude))
                    data.longitude = parseFloat(data.longitude);
                else
                    data.longitude = null;
                if (isNotNullOrEmpty(data.dataInstalacao))
                    data.dataInstalacao = String(data.dataInstalacao).replace('T', ' ');
            }
            treatData();


            const result = await pool.request()
                .input('descricao', data.descricao)
                .input('idTipoSensor', data.tipoSensorId)
                .input('latitude', data.latitude)
                .input('longitude', data.longitude)
                .input('idPlanta', data.plantaId)
                .input('idTipoSolo', data.tipoSoloId)
                .input('dataInstalacao', data.dataInstalacao)
                .query(
                    `INSERT INTO Sensor (
                        SESO_Descricao, 
                        TPSE_ID, 
                        SESO_Latitude, 
                        SESO_Longitude, 
                        PLNT_ID, 
                        TPSO_ID, 
                        SESO_DataInstalacao
                    ) 
                    VALUES (
                        @descricao,
                        @idTipoSensor, 
                        @latitude, 
                        @longitude, 
                        @idPlanta,
                        @idTipoSolo,
                        CAST(@dataInstalacao AS DATETIME)
                    )`
                );

            res.status(200).json({ status: 1, message: 'Dados Inseridos com sucesso' });

        } catch (error) {
            res.status(500).json({ status: -1, message: 'Internal server error', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}