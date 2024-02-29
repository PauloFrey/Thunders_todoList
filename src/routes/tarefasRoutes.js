const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

router.get('/tarefas', tarefasController.getAll)
router.post('/tarefas', tarefasController.addTarefa)
router.put('/tarefas/:id', tarefasController.editTarefa)
router.patch('/tarefas/:id', tarefasController.patchTarefa)
router.delete('/tarefas/:id', tarefasController.deleteTarefa)

module.exports = router;