const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    console.log(req.body);
    if (req.method === 'POST') {
        try {
            const pool = await connectToDatabase();

            const data = req.body;

            const result = await pool.request()
                .input('nome', data.nome)
                .input('descricao', data.descricao)
                .input('umidadeRecomendada', data.umidadeRecomendada)
                .input('temperaturaRecomendada', data.temperaturaRecomendada)
                .query(
                    `INSERT INTO Planta (
                        PLNT_Nome, 
                        PLNT_Descricao, 
                        PLNT_UmidadeRecomendada, 
                        PLNT_TemperaturaRecomendada
                    ) 
                    VALUES (
                        @nome, 
                        @descricao, 
                        @umidadeRecomendada, 
                        @temperaturaRecomendada
                    )`
                );

            res.status(200).json({ success: true, message: 'Data inserted successfully' });

        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ success: false, message: 'Internal server error', erro: error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}