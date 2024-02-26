import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Login from "../../components/Log_in/login";
import { useUser } from "../../global/id_rol";

function Home() {
    const navigate = useNavigate();
    const { id, rol } = useUser(); // Obtén id y rol desde el contexto global

    const handleBooking = () => {
        navigate("/booking");
    }

    const handleNew = () => {
        navigate("/new");
    };

    const handleRestaurant = () => {
        navigate("/restaurants");
    };

    return (
        <div className="Home">
            <div className="Home-Login">
                <Login/>
            </div>
            <div className="Home-header">
                <h1>Taste</h1>
            </div>
            <div className="Home-content">
                <h1>Trail</h1>
                <input type="search" placeholder="Busca tu restaurante" id="Buscador" />
            </div>
            <div className="button-container">
                {rol === 0 && (
                    <>
                        <button onClick={handleNew}>Nuevo Restaurante</button>
                        <button onClick={handleBooking}>Reservas</button>
                    </>
                )}
                {rol === 1 && (
                    <button onClick={handleBooking}>Reservas</button>
                )}
                {rol === 2 && null}
                <button onClick={handleRestaurant}>Todos los restaurantes</button>
            </div>
            {/* Imprime las variables globales */}
            <div>
                <p>Id: {id}</p>
                <p>Rol: {rol}</p>
            </div>
        </div>
    );
}

export default Home;
