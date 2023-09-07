import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function App() {
    const [columns, setColumns] = useState ([])
    const [records, setRecords] = useState([])
    const navigate = useNavigate()
  
    useEffect(()=>{              
      axios.get('http://localhost:3030/Usuarios')
      .then(res => {
          setColumns(Object.keys(res.data[0]))
          setRecords(res.data)
      })
    }, [])

  return (
    <div clasName="container mt-5">
      <div clasName="text-end"><Link to="/create" className="btn btn-primary">Add +</Link></div>
      <table className="table">
        <thead>
          <tr>
          {columns.map((c, i) => (
              <th key={i}>{c}</th>
          ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
              records.map((d, i) => (
                <tr key={i}>
                  <td>{d.tipodoc}</td>
                  <td>{d.numdoc}</td>
                  <td>{d.fechaNac}</td>
                  <td>{d.nombre}</td>
                  <td>{d.apellido}</td>
                  <td>{d.Nacionalidad}</td>
                  <td>{d.Contraseña}</td>
                  <td>{d.id}</td>
                  <td>
                    <Link to={`/update/${d.id}`} className="btn btn-sm btn-success">Update</Link>
                    <button onClick={e => handleSubmit(d.id)} className="btn btn-sm ms-1 btn-danger">Delete</button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
  function handleSubmit(id) {
    const conf = window.confirm("¿Esta seguro de eliminarlo?");
    if(conf) {
      axios.delete('http://localhost:3030/Usuarios/'+id)
      .then(res => {

        alert("Registro eliminado :(");
        navigate('/')
      }).catch(err => console.log(err))
    }
  }
}

export default App;