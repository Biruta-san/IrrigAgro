const sql = require('mssql');
const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT } = process.env;

async function connectToDatabase() {
    try {
        var config = {
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            server: DATABASE_HOST,
            database: DATABASE_NAME,
            port: DATABASE_PORT,
            options: {
                encrypt: true
            }
        };

        const connection = await sql.connect(`Server=${config.server},${config.port};Database=${config.database};User Id=${config.user};Password=${config.password};Encrypt=${config.options.encrypt}`);
        return connection;
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = {
    connectToDatabase
};