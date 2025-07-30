const express = require('express');

const { registerUser, loginUser, addTask } = require('../controller/userController');


const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/addtask',addTask);

module.exports = userRouter ;