import React, { useState, useEffect } from "react";
import "./booking.css";
import Card from 'react-bootstrap/Card';
import Reservas from "../../components/card-reserva/reservas";
import { useUser } from "../../global/id_rol";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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

                    <br />

                    <div className="Aggregate">
                        <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
                            <Table sx={{ maxWidth: 1000 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Restaurante</StyledTableCell>
                                        <StyledTableCell >Plato más caro</StyledTableCell>
                                        <StyledTableCell >Plato más barato</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {expensive.map((expensive) => (
                                        <StyledTableRow key={expensive.nombre}>
                                            <StyledTableCell component="th">
                                                {expensive.nombre}
                                            </StyledTableCell>
                                            <StyledTableCell >{expensive.platoMasCaro}</StyledTableCell>
                                            <StyledTableCell >{expensive.platoMasBarato} </StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <br />

                        <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
                            <Table sx={{ maxWidth: 1000 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Restaurante</StyledTableCell>
                                        <StyledTableCell >Cantidad de reservas</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {top10Frecuently.map((top10Frecuently) => (
                                        <StyledTableRow key={top10Frecuently.nombre}>
                                            <StyledTableCell component="th">
                                                {top10Frecuently.nombre}
                                            </StyledTableCell>
                                            <StyledTableCell >{top10Frecuently.reservas}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <br />

                        <TableContainer sx={{ maxWidth: 1000 }} component={Paper}>
                            <Table sx={{ maxWidth: 1000 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Restaurante</StyledTableCell>
                                        <StyledTableCell>Rating</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {top10Rating.map((top10Rating) => (
                                        <StyledTableRow key={top10Rating.nombre}>
                                            <StyledTableCell component="th">
                                                {top10Rating.nombre}
                                            </StyledTableCell>
                                            <StyledTableCell >{top10Rating.rating}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <br />

                        <iframe style={{ background: "#F1F5F4", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)", width: "100vw", height: "100vh" }} src="https://charts.mongodb.com/charts-project-0-zgxqe/embed/dashboards?id=fd2c9b41-af67-4135-9dcb-319969a58c29&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;
