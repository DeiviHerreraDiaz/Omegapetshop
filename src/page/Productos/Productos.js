import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Productos() {
    const [columns, setColumns] = useState([]);
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3030/Productos')
            .then(res => {
                const data = res.data;
                setColumns(Object.keys(data[0]));
                setRecords(data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        const conf = window.confirm("¿Estás seguro de eliminarlo?");
        if (conf) {
            axios.delete(`http://localhost:3030/Productos/${id}`)
                .then(() => {
                    alert("Registro eliminado :(");
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container mt-5">
            <div className="text-end"><Link to="/createProductos" className="btn btn-primary">Add +</Link></div>
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
                {records.map((d, i) => (
                    <tr key={i}>
                        {columns.map((c, j) => (
                            <td key={j}>{d[c]}</td>
                        ))}
                        <td>
                            <Link to={`/updateProductos/${d.id}`} className="btn btn-sm btn-success">Update</Link>
                            <button onClick={() => handleDelete(d.id)} className="btn btn-sm ms-1 btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Productos;
