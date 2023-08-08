require('dotenv').config();
const auth = require('../middlewares/auth');
const express = require('express');
const loginHandler = require('../controllers/loginHandler');
const logoutHandler = require('../controllers/logoutHandler');
const registrationHandler = require('../controllers/registrationHandler');
const authHandler = require('../controllers/authHandler');
const refreshHandler = require('../controllers/refreshHandler');

const router = express.Router();

router.get('/', auth, authHandler);
router.get('/refresh', refreshHandler);
router.post('/login', loginHandler);
router.post('/register', registrationHandler);
router.delete('/logout', logoutHandler);

module.exports = router;
