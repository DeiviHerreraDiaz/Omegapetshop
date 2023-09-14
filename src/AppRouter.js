import React from 'react'
import Usuarios from './page/Usuarios/Usuarios'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import AddUsuarios from './page/Usuarios/AddUsuarios'
import EditUsuarios from './page/Usuarios/EditUsuarios'
import Login from "./page/login";
import CrearCuenta from "./page/crearCuenta";
import Tiendas from "./page/Tiendas/Tiendas";
import AddProductos from "./page/Productos/AddProductos";
import EditProductos from "./page/Productos/EditProductos";
import Index from "./page/Index";
import Productos from "./page/Productos/Productos";
import AddTiendas from "./page/Tiendas/AddTiendas";
import EditTiendas from "./page/Tiendas/EditTiendas";


function AppRouter() {
  return(
    <BrowserRouter>
   
      <Routes>

        <Route path ='/Index' element={<Index/>}/>



          {/*INICIO DE SESIÓN*/}

        <Route path ='/login' element={<Login/>}/>
        <Route path ='/crear' element={<CrearCuenta/>}/>

          {/*USUARIOS*/}

        <Route path ='/Usuarios' element={<Usuarios/>}/>
        <Route path ='/createUsuarios' element={<AddUsuarios/>}/>
        <Route path ='/updateUsuarios/:id' element={<EditUsuarios/>}/>

          {/*PRODUCTOS*/}

        <Route path ='/Productos' element={<Productos/>}/>
        <Route path ='/createProductos' element={<AddProductos/>}/>
        <Route path="/updateProductos/:id" element={<EditProductos/>} />

        {/*TIENDAS*/}

        <Route path ='/Tiendas' element={<Tiendas/>}/>
        <Route path ='/createTiendas' element={<AddTiendas/>}/>
        <Route path="/updateTiendas/:id" element={<EditTiendas/>} />


      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;
