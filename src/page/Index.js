import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const cookies = new Cookies();

const Index = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('nombre', { path: "/" });
        cookies.remove('apellido', { path: "/" });
        cookies.remove('Contraseña', { path: "/" });
        cookies.remove('numdoc', { path: "/" });
        window.location.href = '/index';
    }

    const isLoggedIn = cookies.get('id') !== undefined;

    const [productos, setProductos] = useState([]);
    const [tiendas, setTiendas] = useState([]);
    const [filtroTienda, setFiltroTienda] = useState("");
    useEffect(() => {

        axios.get('http://localhost:3030/Productos')
            .then(res => {
                const data = res.data;
                setProductos(data);
            })
            .catch(err => console.log(err));

        axios.get('http://localhost:3030/Tienda')
            .then(res => {
                const data = res.data;
                setTiendas(data);
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
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                    Tienda
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="/createTiendas">Registrar Tienda</a>
                                    <a className="dropdown-item" href="/loginTiendas">Entrar a tu tienda</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/createUsuarios">Registrarte</Link>
                            </li>
                        </ul>
                        {!isLoggedIn ? (
                            <Link className="nav-link" to="/login">Iniciar sesión</Link>
                        ) : (
                            <button className="btn btn-light" onClick={cerrarSesion}>Cerrar Sesión</button>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <div className="jumbotron">
                    <h2>TIENDA DE MASCOTAS :D</h2>
                    <p>Esta es una página en la que puedes registrar una tienda y agregar tus productos para que las personas los puedan comprar y obtener información sobre tu tienda.</p>
                    <p><a className="btn btn-primary btn-lg" href="#">Leer más</a></p>
                </div>

                <h1 className="text-center">PRODUCTOS</h1>

                <div className="form-group">
                    <label>Filtrar por Tienda:</label>
                    <select
                        className="form-control"
                        value={filtroTienda}
                        onChange={(e) => setFiltroTienda(e.target.value)}
                    >
                        <option value="">Todas las Tiendas</option>
                        {tiendas.map((tienda) => (
                            <option key={tienda.id} value={tienda.id}>
                                {tienda.Nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    {productos
                        .filter((producto) => {
                            if (filtroTienda === "") {
                                return true;
                            } else {
                                return producto.id_tienda === parseInt(filtroTienda);
                            }
                        })
                        .map((producto, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h2 className="card-title">{producto.Nombre}</h2>
                                        <p className="card-text">Categoría: {producto.Categoria}</p>
                                        <p className="card-text">Precio: {producto.Valor}</p>
                                        <p className="card-text">Presentación: {producto.Presentación}</p>
                                        <p className="card-text">Fabricante: {producto.Fabricante}</p>
                                        <p className="card-text">Tienda: {producto.id_tienda}</p>
                                        {isLoggedIn ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={() => {
                                                    const queryParams = `?productId=${producto.id}&userId=${cookies.get('numdoc')}&userName=${cookies.get('nombre')}&userLastName=${cookies.get('apellido')}`;
                                                    navigate(`/createVenta${queryParams}`);
                                                }}
                                            >
                                                Comprar
                                            </button>
                                        ) : (
                                            <div className="alert alert-danger">
                                                <strong>Cuidado!</strong> Necesitas <Link to="/login" className="alert-link">Iniciar Sesión</Link>.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Index;
