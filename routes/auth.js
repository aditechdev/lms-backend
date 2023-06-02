const express = require('express');
const { protect } = require('../middleware/auth');

const { register, signIn, getMe, forgetPassword, resetPassword, updateDetails } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/signin', signIn);
router.get('/me', protect, getMe);
router.post('/forgotPassword', forgetPassword);
router.put('/resetPassword/:resetToken', resetPassword);
router.put('/updateDetails', protect, updateDetails);

module.exports = router;
