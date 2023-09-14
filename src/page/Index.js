import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const cookies = new Cookies();

const Index = () => {
    const cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('apellido', { path: "/" });
        cookies.remove('Contraseña', { path: "/" });
        window.location.href = '/login';
    }

    console.log('id' + cookies.get('id'));
    console.log('nombre' + cookies.get('nombre'));
    console.log('apellido' + cookies.get('apellido'));
    console.log('Contraseña' + cookies.get('Contraseña'));

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030/Productos')
            .then(res => {
                const data = res.data;
                setProductos(data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">OMEGAPETSHOP</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/register-store">Registrar Tienda</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Registrarte</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Iniciar sesión</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                    Más
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="#">Nosotros</a>
                                    <a className="dropdown-item" href="#">Meta</a>
                                    <a className="dropdown-item" href="#">¿Qué comercializamos?</a>
                                </div>
                            </li>
                        </ul>
                        <button className="btn btn-light" onClick={cerrarSesion}>Cerrar Sesión</button>
                    </div>
                </div>
            </nav>

            <div className="container">
                <div className="jumbotron">
                    <h2>TIENDA DE MASCOTAS :D</h2>
                    <p>Esta es una página en la que puedes registrar una tienda y agregar tus productos para que las personas los puedan comprar y obtener información sobre tu tienda.</p>
                    <p><a className="btn btn-primary btn-lg" href="#">Leer más</a></p>
                </div>

                <h1 className="text-center">Los productos que guste sumerce</h1>

                <div className="row">
                    {productos.map((producto, index) => (
                        <div className="col-md-4" key={index}>
                            <h2>{producto.nombre}</h2>
                            <p>Categoria: {producto.Categoria}</p>
                            <p>Precio: {producto.Valor}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Index;
