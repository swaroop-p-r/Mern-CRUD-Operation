import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './components/Home/HomePage';
import Register from './components/Home/Register';
import Login from './components/Home/Login';
import UserHome from './components/User/UserHome';
import UserAddTask from './components/User/UserAddTask';
import UserViewTask from './components/User/UserViewTask';
import UserEditTask from './components/User/UserEditTask';

function App() {
  

  return (
    <>
    
      <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* User */}
        <Route path='/userhome' element={<UserHome/>}/>
        <Route path='/addtask' element={<UserAddTask/>}/>
        <Route path='/viewtask' element={<UserViewTask/>}/>
        <Route path='/edittask/:id' element={<UserEditTask/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
