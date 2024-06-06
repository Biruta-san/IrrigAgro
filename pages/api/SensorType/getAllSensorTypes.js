const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    try {
        // Connect to the database
        const pool = await connectToDatabase();

        const params = req.query;

        // Execute the SQL query
        const result = await pool.request()
            .input('nome', params?.nome)
            .input('descricao', params?.descricao)
            .input('unidadeMedidaId', params?.unidadeMedidaId)
            .query(`SELECT T0.*, T1.UNME_Nome 
                    FROM TiposSensores T0
                    LEFT JOIN UnidadeMedida T1 ON T0.UNME_ID = T1.UNME_ID
                    WHERE (T0.TPSE_Nome = ISNULL(@nome,\'\') OR ISNULL(@nome,\'\') = \'\')
                      AND (T0.TPSE_Descricao = ISNULL(@descricao,\'\') OR ISNULL(@descricao,\'\') = \'\')
                      AND (T0.UNME_ID = ISNULL(@unidadeMedidaId,0) OR ISNULL(@unidadeMedidaId,0) = 0)
                    `);
        res.status(200).json({ status: 1, rowCount: result.recordset.length, rows: result.recordset, message: 'Tipo(s) de Sensore(s) retornado(s) com sucesso' });
    } catch (error) {
        console.error('Error getting data:', error);
        res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message });
    }
};