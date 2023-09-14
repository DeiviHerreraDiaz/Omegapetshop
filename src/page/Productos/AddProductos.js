import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProductos() {

    const [inputData, setInputData] = useState({Nombre:'',Categoria:'',Fecha_Caducidad:'',Valor:'',Presentación:'',Fabricante:''})


    const navigat = useNavigate();

    function handleSubmit(event){

        event.preventDefault()

        axios.post('http://localhost:3030/Productos', inputData)
        .then(res => {
            alert("Registro correctamente :D")
            navigat('/Tiendas');

        }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-light p-5'>
            <form onSubmit = {handleSubmit}>


                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" name='Nombre' className='form-control' onChange={e=>setInputData({...inputData, Nombre: e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="name">Categoria:</label>
                    <input type="text" name='Categoria' className='form-control' onChange={e=>setInputData({...inputData, Categoria: e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="name">Fecha de caducidad:</label>
                    <input type="Date" name='Fecha_Caducidad' className='form-control' onChange={e=>setInputData({...inputData, Fecha_Caducidad: e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="name">Valor:</label>
                    <input type="Number" name='Valor' className='form-control' onChange={e=>setInputData({...inputData, Valor: e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="name">Presentación:</label>
                    <input type="text" name='Presentación' className='form-control' onChange={e=>setInputData({...inputData, Presentación: e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="name">Fabricante:</label>
                    <input type="text" name='Fabricante' className='form-control' onChange={e=>setInputData({...inputData, Fabricante: e.target.value})}/>
                </div>


                <button className='btn btn-info'>Agregar</button>
            </form>


        </div>
    </div>
  )
}

export default AddProductos