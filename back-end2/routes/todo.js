require('dotenv').config();
const express = require('express');
const auth = require('../middlewares/auth');
const todoHandlers = require('../controllers/todoHandlers');

const router = express.Router();

router.use(auth); //authentication is required

router.get('/', todoHandlers.getAllTodos);
router.post('/create', todoHandlers.createTodo);
router.put('/update', todoHandlers.updateTodo);
router.delete('/remove', todoHandlers.deleteTodo);

module.exports = router;
