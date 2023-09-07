import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Add() {

    const [inputData, setInputData] = useState({tipodoc:'Cédula Ciudadanía',numdoc:'',fechaNac:'',nombre:'',apellido:'',Nacionalidad:'',Contraseña:''})


    const navigat = useNavigate();

    function handleSubmit(event){

        event.preventDefault()

        axios.post('http://localhost:3030/Usuarios', inputData)
        .then(res => {
            alert("Registro correctamente :D")
            navigat('/');

        }).catch(err => console.log(err));
    }


    // Agregar un controlador de eventos para el select
    function handleSelectChange(event) {
        setInputData({
            ...inputData,
            tipodoc: event.target.value
        });
    }


  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-light p-5'>
            <form onSubmit = {handleSubmit}>
            <div>
                        <label htmlFor="tipodoc">Tipo de documento:</label>
                        <select
                            name="tipodoc"
                            className='form-select'
                            value={inputData.tipodoc}
                            onChange={handleSelectChange}
                        >
                            <option value="Cédula Ciudadanía" select>Cédula Ciudadanía</option>
                            <option value="Cédula de extranjeria">Cédula de extranjeria</option>
                        </select>
                    </div>
                
                <div>
                    <label htmlFor="name">Documento:</label>
                    <input type="text" name='numdoc' className='form-control' onChange={e=>setInputData({...inputData, numdoc: e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="name">Fecha de nacimiento:</label>
                    <input type="date" name='fechaNac' className='form-control' onChange={e=>setInputData({...inputData, fechaNac: e.target.value})}/>
                </div>
                
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" name='nombre' className='form-control' onChange={e=>setInputData({...inputData, nombre: e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="name">Apellido:</label>
                    <input type="text" name='apellido' className='form-control' onChange={e=>setInputData({...inputData, apellido: e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="name">Nacionalidad:</label>
                    <input type="text" name='Nacionalidad' className='form-control' onChange={e=>setInputData({...inputData, Nacionalidad: e.target.value})}/>
                </div>

                <div>
                    <label htmlFor="name">Contraseña:</label>
                    <input type="password" name='Contraseña' className='form-control'  onChange={e=>setInputData({...inputData, Contraseña: e.target.value})}/>
                </div> <br/>
                <button className='btn btn-info'>Agregar</button>
            </form>


        </div>
    </div>
  )
}

export default Add