const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/login',  UserController.login)
router.get('/userList/:userId',  UserController.findListOfUsersById)
router.post('/userAddFrend', UserController.addNewFriend)
router.get('/friendsId/:userId', UserController.getFriendsId)
router.get('/userInfo/:userId', UserController.getUserInfo)

module.exports = router