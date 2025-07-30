const express = require('express');

const { registerUser, loginUser, addTask, viewTask, statusTask } = require('../controller/userController');


const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/addtask',addTask);
userRouter.get('/viewtask',viewTask);
userRouter.patch('/statustask/:id',statusTask);

module.exports = userRouter ;