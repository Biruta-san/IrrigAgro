const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
    try {
        // Connect to the database
        const pool = await connectToDatabase();
        console.log(pool);

        // Execute the SQL query
        const result = await pool.request().query('SELECT * FROM Fazenda');

        console.log('Query executed successfully. Row count:', result.recordset.length);
        res.status(200).json({ success: true, rowCount: result.recordset.length, rows: result.recordset });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ success: false, message: error.message});
    }
};