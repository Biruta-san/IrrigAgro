const { connectToDatabase } = require('../../../connectToDatabase');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Conexão com banco de dados
      const pool = await connectToDatabase();

      const id = req.query.id;

      const intId = parseInt(id);

      // Execução da consulta SQL
      const result = await pool.request()
        .input('id', intId)
        .query(`SELECT * FROM TiposSensores
                WHERE TPSE_ID = @id`);

      res.status(200).json({ status: 1, message: 'Tipo de Sensor retornado com sucesso', rowCount: result.recordset.length, rows: result.recordset });
    } catch (error) {
      res.status(500).json({ status: -1, message: error.message });
    }
  }
  else if (req.method === 'PUT') {
    try {
      // Conexão com banco de dados
      const pool = await connectToDatabase();

      const id = req.query.id;
      const data = req.body;

      const intId = parseInt(id);

      // Execução da consulta SQL
      const result = await pool.request()
        .input('nome', data.nome)
        .input('descricao', data.descricao)
        .input('unidadeMedidaId', data.unidadeMedidaId)
        .input('id', intId)
        .query(
          `UPDATE TiposSensores
            SET TPSE_Nome = @nome
              , TPSE_Descricao = @descricao
              , UNME_ID = @unidadeMedidaId
            WHERE TPSE_ID = @id`);

      res.status(200).json({ status: 1, rowCount: result.rowsAffected, message: 'Tipo de Sensor atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ status: -1, message: 'Ocorreu um erro no servidor', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(404).json({ status: -1, message: 'Oops! Parece que você está tentando acessar um método não permitido. Permitidos: GET, PUT' });
  }
};