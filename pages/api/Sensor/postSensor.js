const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const pool = await connectToDatabase();

            const data = req.body;

            const result = await pool.request()
                .input('idTipoSensor', data.idTipoSensor)
                .input('latitude', data.latitude)
                .input('longitude', data.longitude)
                .input('idPlanta', data.idPlanta)
                .input('descricao', data.descricao)
                .query(
                    `INSERT INTO Sensor (
                        TPSE_ID, 
                        SESO_Latitude, 
                        SESO_Longitude, 
                        PLNT_ID, 
                        SESO_Descricao,
                    ) 
                    VALUES (
                        @idTipoSensor, 
                        @latitude, 
                        @longitude, 
                        @idPlanta, 
                        @descricao
                    )`
                );

            res.status(200).json({ status: 1, message: 'Dados Inseridos com sucesso' });

        } catch (error) {
            res.status(500).json({ status: -1, message: 'Internal server error', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}