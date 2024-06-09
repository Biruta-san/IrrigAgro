import { isNotNullOrEmpty } from '../../../src/utils/validate';
const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Conexão com banco de dados
            const pool = await connectToDatabase();

            const id = req.query.id;

            const intId = parseInt(id);

            // Execução da consulta SQL
            const result = await pool.request()
                .input('id', intId)
                .query(`SELECT * FROM Sensor 
                  WHERE SESO_ID = @id`);

            res.status(200).json({ status: 1, message: 'Sensor retornado com sucesso', rowCount: result.recordset.length, rows: result.recordset });
        } catch (error) {
            res.status(500).json({ status: -1, message: error.message });
        }
    }
    else if (req.method === 'PUT') {
        try {
            // Conexão com banco de dados
            const pool = await connectToDatabase();

            const id = req.query.id;
            const data = req.body;

            const intId = parseInt(id);

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

                console.log(data.dataInstalacao);
            }
            treatData();

            // Execução da consulta SQL
            const result = await pool.request()
                .input('id', intId)
                .input('descricao', data.descricao)
                .input('idTipoSensor', data.tipoSensorId)
                .input('latitude', data.latitude)
                .input('longitude', data.longitude)
                .input('idPlanta', data.plantaId)
                .input('idTipoSolo', data.tipoSoloId)
                .input('dataInstalacao', data.dataInstalacao)
                .query(
                    `UPDATE Sensor
                        SET SESO_Descricao = @descricao
                        , TPSE_ID = @idTipoSensor
                        , SESO_Latitude = @latitude
                        , SESO_Longitude = @longitude
                        , PLNT_ID = @idPlanta
                        , TPSO_ID = @idTipoSolo
                        , SESO_DataInstalacao = CAST(@dataInstalacao AS DATETIME)
                        WHERE SESO_ID = @id`);

            res.status(200).json({ status: 1, rowCount: result.rowsAffected, message: 'Sensor atualizado com sucesso' });
        } catch (error) {
            res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(404).json({ status: -1, message: 'Oops! Parece que você está tentando acessar um método não permitido. Permitidos: GET, PUT' });
    }
};