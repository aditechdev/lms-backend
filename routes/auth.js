const express = require('express');
const { protect } = require('../middleware/auth');

const { register, signIn, getMe, resetPassword } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/signin', signIn);
router.get('/me', protect, getMe);
router.post('/forgotPassword', resetPassword)

module.exports = router;
