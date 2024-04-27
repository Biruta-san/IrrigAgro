const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    try {
        // Connect to the database
        const pool = await connectToDatabase();

        const params = req.query;

        // Execute the SQL query
        const result = await pool.request()
            .input('nome', params.nome)
            .input('descricao', params.descricao)
            .input('umidadeRecomendada', params.umidadeRecomendada)
            .input('temperaturaRecomendada', params.temperaturaRecomendada)
            .query(`SELECT * 
                    FROM Planta 
                    WHERE (PLNT_Nome = ISNULL(@nome,\'\') OR ISNULL(@nome,\'\') = \'\')
                      AND (PLNT_Descricao = ISNULL(@descricao,\'\') OR ISNULL(@descricao,\'\') = \'\')
                      AND (PLNT_UmidadeRecomendada = ISNULL(@umidadeRecomendada,0) OR ISNULL(@umidadeRecomendada,0) = 0)
                      AND (PLNT_TemperaturaRecomendada = ISNULL(@temperaturaRecomendada,0) OR ISNULL(@temperaturaRecomendada,0) = 0)
                    `);
        res.status(200).json({ status: 1, rowCount: result.recordset.length, rows: result.recordset, message: 'Planta(s) retornada(s) com sucesso' });
    } catch (error) {
        res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message });
    }
};