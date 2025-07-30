const express = require('express');

const { registerUser, loginUser, addTask, viewTask, statusTask, deleteTask, getTaskById, editTask } = require('../controller/userController');


const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/addtask',addTask);
userRouter.get('/viewtask',viewTask);
userRouter.patch('/statustask/:id',statusTask);
userRouter.delete('/deletetask/:id',deleteTask);
userRouter.get('/taskbyid/:id',getTaskById);
userRouter.put('/edittask/:id',editTask);

module.exports = userRouter ;