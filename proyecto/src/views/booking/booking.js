import React, { useState, useEffect } from "react";
import "./booking.css";
import Card from 'react-bootstrap/Card';
import Reservas from "../../components/card-reserva/reservas";
import { useUser } from "../../global/id_rol";
import Chart  from "../../components/charts/Chart.js";
import { borderRadius } from "@mui/system";

function Booking() {
    const { restaurantes, id } = useUser();
    const [reservasData, setReservasData] = useState([]);
    const [nombreRestaurante, setNombreRestaurante] = useState('');
    const [expensive, setExpensive] = useState([]);
    const [top10Frecuently, setTop10Frecuently] = useState([]);
    const [top10Rating, setTop10Rating] = useState([]);
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        // Obtener datos del usuario por su ID
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5050/user?id=${id}`);
                const userData = await response.json();
                if (userData && userData.restaurantes && userData.restaurantes.length > 0) {
                    setNombreRestaurante(userData.restaurantes[0].nombre); // Usamos el primer restaurante, podrías ajustarlo según tus necesidades
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    useEffect(() => {
        // Obtener reservas para cada restaurante
        const fetchReservas = async () => {
            try {
                const promises = restaurantes.map(restauranteId => {
                    return fetch(`http://localhost:5050/reservation?id_restaurante=${restauranteId}`)
                        .then(response => response.json());
                });

                const reservas = await Promise.all(promises);
                const reservasConcatenadas = reservas.flat(); // Aplanamos el array de reservas
                setReservasData(reservasConcatenadas);
            } catch (error) {
                console.error('Error fetching reservas:', error);
            }
        };

        fetchReservas();
    }, [restaurantes]);
  
    useEffect(() => {
        fetch("http://localhost:5050/mostAndLessExpensive")
            .then((response) => response.json())
            .then((data) => setExpensive(data));

        fetch("http://localhost:5050/top10RestaurantsFrecuently")
            .then((response) => response.json())
            .then((data) => setTop10Frecuently(data));

        fetch("http://localhost:5050/top10Restaurants")
            .then((response) => response.json())
            .then((data) => setTop10Rating(data));

        fetch("http://localhost:5050/userReservationCountPerRestaurant")
            .then((response) => response.json())
            .then((data) => setReservas(data));

    }, []);

    const handleDeleteReservation = async (reservaId) => {
        try {
            await fetch(`http://localhost:5050/reservation?id=${reservaId}`, {
                method: 'DELETE'
            });
            // Eliminar la reserva de la lista de reservas
            const updatedReservas = reservasData.filter(reserva => reserva._id !== reservaId);
            setReservasData(updatedReservas);
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    return (
        <div className="Booking">
            <div className="Booking-header">
                <h1>Reservas</h1>
            </div>
            <div className="Booking-content">
                <div className="Booking-title-restaurant">
                    <Card style={{ width: '50%', color: 'black', background: '#EAE0D5', border: '5px' }}>
                        <Card.Body>{nombreRestaurante}</Card.Body>
                    </Card>
                </div>
                <div className="Booking-reservas">
                    {reservasData.map((reserva, index) => (
                        <div className="Reservas" key={index}>
                            <Reservas
                                Nombre={reserva.nombre_cliente} // Aquí utilizamos el nombre del cliente que realizó la reserva
                                Cantidad_P={reserva.cantidad_personas}
                                No_reserva={reserva._id}
                                date={new Date(reserva.fecha).toLocaleDateString()}
                                time={new Date(reserva.fecha).toLocaleTimeString()}
                                tel="Teléfono del cliente"
                                extra={reserva.comentarios}
                                onDeleteReservation={handleDeleteReservation} // Pasamos la función de eliminación como prop
                            />
                        </div>
                    ))}
                    
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
                    <div className="Aggregate">

                        <table>
                            <tr>
                                <th>Restaurante</th>
                                <th>Plato mas caro</th>
                                <th>Plato mas barato</th>
                            </tr>
                            {expensive.map((expensive) => (
                                <tr>
                                    <td>{expensive.nombre}</td>
                                    <td>{expensive.platoMasCaro}</td>
                                    <td>{expensive.platoMasBarato}</td>
                                </tr>
                            ))}
                        </table>
                        <br/>
                        <table>
                            <tr>
                                <th>Restaurante</th>
                                <th>Cantidad de reservas</th>
                            </tr>
                            {top10Frecuently.map((top10Frecuently) => (
                                <tr>
                                    <td>{top10Frecuently.nombre}</td>
                                    <td>{top10Frecuently.reservas}</td>
                                </tr>
                            ))}
                        </table>
                        <br/>
                        <table>
                            <tr>
                                <th>Restaurante</th>
                                <th>Rating</th>
                            </tr>
                            {top10Rating.map((top10Rating) => (
                                <tr>
                                    <td>{top10Rating.nombre}</td>
                                    <td>{top10Rating.rating}</td>
                                </tr>
                            ))}
                        </table>

                        <iframe style={{background: "#F1F5F4",border: "none",borderRadius: "2px",boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",width: "100vw",height: "100vh"} } src="https://charts.mongodb.com/charts-project-0-zgxqe/embed/dashboards?id=fd2c9b41-af67-4135-9dcb-319969a58c29&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
