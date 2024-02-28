import React from "react";
import "./booking.css";
import Card from 'react-bootstrap/Card';
import Reservas from "../../components/card-reserva/reservas";
import Chart  from "../../components/charts/Chart.js";
import { borderRadius } from "@mui/system";

function Booking() {
    return (
        <div className="Booking">
            <div className="Booking-header">
                <h1>Reservas</h1>
            </div>
            <div className="Booking-content">
                <div className="Booking-title-restaurant">
                    <Card style={{ width: '50%', color: 'black', background: '#EAE0D5', border: '5px' }}>
                        <Card.Body>Nombre del restaurante</Card.Body>
                    </Card>
                </div>
                <div className="Booking-reservas">
                    <div className="Reservas">
                        <Reservas
                            Nombre="Manuel Rodas"
                            Cantidad_P="8"
                            No_reserva="986578"
                            date="10-04-2023"
                            time="12:24 pm"
                            tel="12345678"
                            extra="Cumpleaños de mi hijo"
                        />
                    </div>
                    <div className="Reservas">
                        <Reservas
                            Nombre="Manuel Rodas"
                            Cantidad_P="8"
                            No_reserva="986578"
                            date="10-04-2023"
                            time="12:24 pm"
                            tel="12345678"
                            extra="Cumpleaños de mi hijo"
                        />
                    </div>
                    <div className="Reservas">
                        <Reservas
                            Nombre="Manuel Rodas"
                            Cantidad_P="8"
                            No_reserva="986578"
                            date="10-04-2023"
                            time="12:24 pm"
                            tel="12345678"
                            extra="Cumpleaños de mi hijo"
                        />

                    </div>
                    {/* Agrega más componentes Reservas según sea necesario */}
                    <div className="Aggregate">
                    
                    </div>
                </div>    
            </div>
        </div> 
    );
}


export default Booking;
