const express = require('express');

const { 
    getUsers,
    getSingleUser, 
    createUser, 
    deleteUser,
    updateUser
} = require('../controllers/user');
 
const User = require('../models/User');
const router = express.Router({
    mergeParams: true
});
const advancedResult = require('../middleware/advancedResult');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResult(User), getUsers).post(createUser);
router.route('/:id').get(
    getSingleUser,
).put(updateUser).delete(deleteUser)




router.get('/users', getUsers);
router.get('/users/:id', getSingleUser);
router.post('/users', createUser);

router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;