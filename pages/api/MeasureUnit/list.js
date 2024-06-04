const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    try {
        // Connect to the database
        const pool = await connectToDatabase();

        // Execute the SQL query
        const result = await pool.request()
            .query(`SELECT UNME_ID AS value, UNME_Nome AS label 
                    FROM UnidadeMedida`);
        res.status(200).json({ status: 1, rowCount: result.recordset.length, rows: result.recordset, message: 'Unidade(s) de Medida retornada(s) com sucesso' });
    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message });
    }
};