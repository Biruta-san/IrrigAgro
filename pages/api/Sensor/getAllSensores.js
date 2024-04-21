const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    try {
        // Conectar ao banco de dados
        const pool = await connectToDatabase();

        // Executar o comando SQL
        const result = await pool.request().query('SELECT * FROM Sensor');

        res.status(200).json({ status: 1, rowCount: result.recordset.length, rows: result.recordset, message: 'Sensores retornados com sucesso'});
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message});
    }
};