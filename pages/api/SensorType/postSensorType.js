const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const pool = await connectToDatabase();

            const data = req.body;

            const result = await pool.request()
                .input('nome', data?.nome)
                .input('descricao', data?.descricao)
                .input('unidadeMedidaId', data?.unidadeMedidaId)
                .query(
                    `INSERT INTO TiposSensores (
                        TPSE_Nome, 
                        TPSE_Descricao,
                        UNME_ID
                    ) 
                    VALUES (
                        @nome, 
                        @descricao,
                        @unidadeMedidaId
                    )`
                );

            res.status(200).json({ status: 1, message: 'Dados Inseridos com sucesso!', rowCount: result.rowsAffected });

        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ success: -1, message: 'Ocorreu um erro no servidor', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}