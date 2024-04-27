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
            .input('sigla', params.sigla)
            .query(`SELECT * 
                    FROM UnidadeMedida 
                    WHERE (UNME_Nome = ISNULL(@nome,\'\') OR ISNULL(@nome,\'\') = \'\')
                      AND (UNME_Descricao = ISNULL(@descricao,\'\') OR ISNULL(@descricao,\'\') = \'\')
                      AND (UNME_Sigla = ISNULL(@sigla,\'\') OR ISNULL(@sigla,\'\') = \'\')
                    `);
        res.status(200).json({ status: 1, rowCount: result.recordset.length, rows: result.recordset, message: 'Unidade(s) de Medida retornada(s) com sucesso' });
    } catch (error) {
        res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message });
    }
};