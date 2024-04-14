const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    console.log(req.body);
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

            res.status(200).json({ success: true, message: 'Data inserted successfully' });

        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}