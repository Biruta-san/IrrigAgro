const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    try {
        // Connect to the database
        const pool = await connectToDatabase();

        // Execute the SQL query
        const result = await pool.request()
            .query(`SELECT TPSE_ID AS value, TPSE_Nome AS label 
                    FROM TiposSensores`);
        res.status(200).json({ status: 1, rowCount: result.recordset.length, rows: result.recordset, message: 'Tipo(s) de Solo retornado(s) com sucesso' });
    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message });
    }
};