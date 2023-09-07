import React from 'react'
import App from './App'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Add from './Add'
import Edit from './Edit'

function AppRouter() {
  return(
    <BrowserRouter>
   
      <Routes>
        <Route path ='/' element={<App/>}/>
        <Route path ='/create' element={<Add/>}/>
        <Route path ='update/:id' element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;
