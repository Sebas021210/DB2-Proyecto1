import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
    const navigate = useNavigate();

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
            <div className="Home-header">
                <h1>Taste</h1>
            </div>
            <div className="Home-content">
                <h1>Trail</h1>
                <input type="search" placeholder="Busca tu restaurante" id="Buscador" />
            </div>
            <div className="button-container">
                <button onClick={handleNew}>Nuevo Restaurante</button>
                <button onClick={handleRestaurant}>Todos los restaurantes</button>
                <button onClick={handleBooking}>Reservas</button>
            </div>
        </div>
    );
}

export default Home;
