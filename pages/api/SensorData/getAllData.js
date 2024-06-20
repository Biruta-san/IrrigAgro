const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    try {
        // Conectar ao banco de dados
        const pool = await connectToDatabase();

        const params = req.query;

        // Executar o comando SQL
        const result = await pool.request()
            .input('tipoSensorId', params?.tipoSensorId)
            .input('plantaId', params?.plantaId)
            .input('tipoSoloId', params?.tipoSoloId)
            .input('sensorId', params?.sensorId)
            .query(`SELECT TOP 100 ISNULL(T0.DDSE_ID, 0) AS DDSE_ID, 
                           ISNULL(T1.SESO_Descricao,\'\') AS SESO_Descricao, 
                           ISNULL(T2.TPSE_Nome, \'\') AS TPSE_Nome, 
                           ISNULL(T3.PLNT_Nome, \'\') AS PLNT_Nome, 
                           ISNULL(T4.TPSO_Nome, \'\') AS TPSO_Nome, 
                           ISNULL(T0.DDSE_DataExecucao, GETDATE()) AS DDSE_DataExecucao, 
                           ISNULL(T0.DDSE_ValorMetrica,0) AS DDSE_ValorMetrica, 
                           ISNULL(T5.UNME_Sigla, \'\') AS UNME_Sigla
                FROM DadosSensores T0
                LEFT JOIN Sensor T1 ON T0.SESO_ID = T1.SESO_ID
                LEFT JOIN TiposSensores T2 ON T1.TPSE_ID = T2.TPSE_ID
                LEFT JOIN Planta T3 ON T1.PLNT_ID = T3.PLNT_ID
                LEFT JOIN TipoSolo T4 ON T1.TPSO_ID = T4.TPSO_ID
                LEFT JOIN UnidadeMedida T5 ON T2.UNME_ID = T5.UNME_ID
                WHERE (T1.SESO_ID = ISNULL(@sensorId, 0) OR ISNULL(@sensorId,0) = 0)
                  AND (T2.TPSE_ID = ISNULL(@tipoSensorId, 0) OR ISNULL(@tipoSensorId,0) = 0)
                  AND (T3.PLNT_ID = ISNULL(@plantaId, 0) OR ISNULL(@plantaId,0) = 0)
                  AND (T4.TPSO_ID = ISNULL(@tipoSoloId, 0) OR ISNULL(@tipoSoloId,0) = 0)
                ORDER BY T0.DDSE_DataExecucao DESC;`);

        res.status(200).json({ status: 1, rowCount: result.recordset.length, rows: result.recordset, message: 'Dado(s) retornado(s) com sucesso' });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message });
    }
};