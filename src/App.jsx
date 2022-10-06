import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
    </div>
  )
}

export default App
