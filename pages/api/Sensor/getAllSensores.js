const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    try {
        // Conectar ao banco de dados
        const pool = await connectToDatabase();

        const params = req.query;

        // Executar o comando SQL
        const result = await pool.request()
            .input('nome', params.nome)
            .input('descricao', params.descricao)
            .input('tipoSensorId', params.tipoSensorId)
            .input('plantaId', params.plantaId)
            .input('tipoSoloId', params.tipoSoloId)
            .query(`SELECT * 
                FROM Sensor 
                WHERE (SESO_Nome = ISNULL(@nome,\'\') OR ISNULL(@nome,\'\') = \'\')
                  AND (SESO_Descricao = ISNULL(@descricao,\'\') OR ISNULL(@descricao,\'\') = \'\')
                  AND (TPSE_ID = ISNULL(@tipoSensorId,0) OR ISNULL(@tipoSensorId,0) = 0)
                  AND (PLNT_ID = ISNULL(@plantaId,0) OR ISNULL(@plantaId,0) = 0)
                  AND (TPSO_ID = ISNULL(@tipoSoloId,0) OR ISNULL(@tipoSoloId,0) = 0)
                `);

        res.status(200).json({ status: 1, rowCount: result.recordset.length, rows: result.recordset, message: 'Sensor(es) retornado(s) com sucesso' });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message });
    }
};