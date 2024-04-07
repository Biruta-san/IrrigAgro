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
                .input('cidade', data.cidade)
                .input('estado', data.estado)
                .input('respTec', data.respTec)
                .input('cep', data.cep)
                .input('areaIrrigavel', data.areaIrrigavel)
                .input('areaTotal', data.areaTotal)
                .query(
                    `INSERT INTO Fazenda (
                        FZND_Nome, 
                        FZND_Descricao, 
                        FZND_Cidade, 
                        ESTD_ID, 
                        FZND_ResponsavelTecnico, 
                        FZND_CEP, 
                        FZND_AreaIrrigavel, 
                        FZND_AreaTotal
                    ) 
                    VALUES (
                        @nome, 
                        @descricao, 
                        @cidade, 
                        @estado, 
                        @respTec, 
                        @cep, 
                        @areaIrrigavel, 
                        @areaTotal
                    )`
                );


            res.status(200).json({ success: true, message: 'Data inserted successfully' });

        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}