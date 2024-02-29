// models/seuModel.js
const pool = require('../dbConfig'); // Importa a configuração do pool de conexão

class SeuModel {
  async getAll() {
    try {
      const client = await pool.connect();
      console.log('Criou pool de conexões no PostgreSQL!')

      const result = await client.query('SELECT * FROM Tarefas');
      console.log(res.rows[0]);
      client.release();
      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error('Erro ao buscar todos os registros');
    }
  }

  // Outros métodos CRUD aqui...
}

module.exports = new SeuModel();
