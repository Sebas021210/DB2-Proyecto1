import React, { useEffect, useState } from "react";
import Card from "../../components/cards/cards";
import "./restaurants.css";

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5050/restaurants")
            .then((response) => response.json())
            .then((data) => setRestaurants(data));
    }, []);

    const limitedRestaurants = restaurants.slice(0, 50);

    return (
        <div className="Restaurants">
            <div className="title">
                <h1>Restaurants</h1>
            </div>
            <div className="cards">
                <div className="componentCard">
                    {limitedRestaurants.map((restaurante) => (
                        <div className="componentCard" key={restaurante.id}>
                            <Card 
                                name={restaurante.nombre}
                                image={restaurante.img}
                                desc={restaurante.descripcion}
                                rating={restaurante.rating}
                                id={restaurante._id}
                                latitud={restaurante.ubicacion.latitud}
                                longitud={restaurante.ubicacion.longitud}
                                menu = {restaurante.menu}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Restaurants;
