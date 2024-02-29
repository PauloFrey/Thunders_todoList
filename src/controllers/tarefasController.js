//Avalia com carinho <3
const db = require("../dbConfig");

const getAll = (req, res) => {
  db.query("SELECT * FROM Tarefas", (err, data) => {
    if (err) {
      console.error("Erro ao buscar tarefas:", err.message);
      res
        .status(500)
        .json({ error: "Erro interno de servidor ao buscar tarefas" });
    } else {
      res.json({ tarefas: data.rows });
    }
  });
};

const addTarefa = (req, res) => {
  try {
    const { descricao } = req.body;

    if (!descricao) {
      return res
        .status(400)
        .json({ error: "É necessário enviar uma descrição." });
    }
    db.query(
      "INSERT INTO tarefas (descricao, concluido) VALUES ($1, false)",
      [descricao],
      (err) => {
        if (err) {
          console.error("Erro ao adicionar tarefas:", err);
          console.log(req.body);
          res.status(500).json({
            error: "Erro interno de servidor ao tentar adicionar tarefas",
          });
        } else {
          res.json({ message: "tarefa adicionada com sucesso" });
        }
      }
    );
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error.message);
    res
      .status(500)
      .json({ error: "Erro interno de servidor ao tentar adicionar tarefa." });
  }
};

const editTarefa = (req, res) => {
  try {
    const tarefaId = parseInt(req.params.id);
    const { descricao, concluido } = req.body;

    // Verifique se a tarefa com o ID fornecido existe na tabela
    db.query("SELECT * FROM tarefas WHERE id = $1", [tarefaId], (err, rows) => {
      if (err) {
        console.error("Erro ao verificar a existência da tarefa:", err.message);
        return res
          .status(500)
          .json({ error: "Erro interno de servidor ao verificar tarefa" });
      }

      if (rows.length === 0) {
        return res.status(404).json({ error: "Tarefa não encontrada." });
      }
      console.log(rows.rows);

      db.query(
        `UPDATE tarefas SET descricao = $1, concluido = $2 WHERE id = $3`,
        [descricao, concluido, tarefaId],
        (err, result) => {
          if (err) {
            console.error("Erro ao atualizar tarefa:", err.message);
            return res.status(500).json({
              error: "Erro interno de servidor ao atualizar tarefa",
              err,
            });
          } else {
            res.json({ message: "Tarefa atualizada com sucesso!" });
          }
        }
      );
    });
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    res.status(500).json({
      error: "Erro interno de servidor ao tentar Atualizar tarefa.",
      err,
    });
  }
};

const patchTarefa = (req, res) => {
  try {
    const tarefaId = parseInt(req.params.id, 10);
    const { concluido } = req.body;

    // Verifique se a tarefa com o ID fornecido existe na tabela
    db.query("SELECT * FROM tarefas WHERE id = $1", [tarefaId], (err, rows) => {
      if (err) {
        console.error("Erro ao verificar a existência da tarefa:", err.message);
        return res
          .status(500)
          .json({ error: "Erro interno de servidor ao verificar tarefa" });
      }

      if (rows.length === 0) {
        return res.status(404).json({ error: "Tarefa não encontrada." });
      }

      // Atualize a descrição da tarefa com o ID fornecido
      const updateQuery = "UPDATE tarefas SET concluido = $1 WHERE id = $2";
      db.query(updateQuery, [concluido, tarefaId], (err, result) => {
        if (err) {
          console.error("Erro ao atualizar tarefa:", err.message);
          return res.status(500).json({
            error: "Erro interno de servidor ao atualizar tarefa",
            err,
          });
        } else {
          res.json({ message: "Tarefa parcialmente atualizada com sucesso!" });
        }
      });
    });
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    res.status(500).json({
      error: "Erro interno de servidor ao tentar Atualizar tarefa.",
      err,
    });
  }
};

const deleteTarefa = (req, res) => {
  try {
    const tarefaId = parseInt(req.params.id, 10);

    //Verifica se existe tarefa
    db.query("SELECT * FROM tarefas WHERE id = $1", [tarefaId], (err, row) => {
      if (err) {
        console.error("Erro ao verificar a existência da tarefa:", err.message);
        return res
          .status(500)
          .json({ error: "Erro interno de servidor ao verificar tarefa" });
      }

      if (!row) {
        return res.status(404).json({ error: "Tarefa não encontrada." });
      }

      db.query("DELETE FROM tarefas WHERE id =$1", [tarefaId], (err) => {
        if (err) {
          console.error("Erro ao tentar deletar tarefa", err.message);
          res.status(500).json({
            error: "Erro interno de servidor ao tentar deletar tarefa.",
            err,
          });
        } else {
          res.json({ message: "Tarefa deletada com sucesso!" });
        }
      });
    });
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    res
      .status(500)
      .json({ error: "Erro interno de servidor ao tentar deletar tarefa." });
  }
};

module.exports = { getAll, addTarefa, editTarefa, deleteTarefa, patchTarefa };
