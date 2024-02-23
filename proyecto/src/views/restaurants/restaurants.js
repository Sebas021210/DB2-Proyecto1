import React from "react";
import Card from "../../components/cards/cards";
import "./restaurants.css";

function Restaurants() {
    return (
        <div className="Restaurants">
            <div className="title">
                <h1>Restaurants</h1>
            </div>
            <div className="cards">
                <div className="componentCard">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    );
}

export default Restaurants;
