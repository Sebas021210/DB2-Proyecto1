import React, { useState, useEffect } from "react";
import "./booking.css";
import Card from 'react-bootstrap/Card';
import Reservas from "../../components/card-reserva/reservas";
import { useUser } from "../../global/id_rol";

function Booking() {
    const { restaurantes, id } = useUser();
    const [reservasData, setReservasData] = useState([]);
    const [nombreRestaurante, setNombreRestaurante] = useState('');

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
                </div>
            </div>
        </div>
    );
}

export default Booking;
