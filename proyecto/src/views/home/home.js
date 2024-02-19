import React from "react";
import "./home.css";

function Home() {
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
                <button>Nuevo Restaurante</button>
                <button>Todos los restaurantes</button>
                <button>Reservas</button>
            </div>
        </div>
    );
}

export default Home;
