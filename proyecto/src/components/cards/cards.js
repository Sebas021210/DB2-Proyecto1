import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useUser } from '../../global/id_rol.js'
import './cards.css';
import { Grid } from '@mui/material';

function MyVerticallyCenteredModal(props) {
    const [rating, setRating] = useState([]);
    const ratingValue = props.rating;
    const { id } = useUser();
    const AccordionReserva = id !== null;
    const AccordionReseña = id !== null;
    const MensajeLogin = !AccordionReserva && !AccordionReseña;

    const markerIcon = new Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconSize: [25, 41]
    });

    useEffect(() => {
        fetch("http://localhost:5050/rating?id_restaurante=" + props.id)
            .then((response) => response.json())
            .then((data) => setRating(data));
    }, [props.id]);

    const [reservaData, setReservaData] = useState({
        id_restaurante: props.id,
        id_usuario: id,
        fecha: new Date().toISOString().slice(0, 10),
        cantidad_personas: "",
        comentarios: ""
    });

    const [reseñaData, setReseñaData] = useState({
        id_restaurante: props.id,
        id_usuario: id,
        fecha: new Date().toISOString().slice(0, 10),
        puntuacion: "",
        comentarios: ""
    });

    const handleSubmitReserva = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5050/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservaData),
            });

            if (response.ok) {
                console.log('Reservación exitosa');
                console.log(reservaData);
            } else {
                console.error('Error al realizar la reservación');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }

    const handleSubmitReseña = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5050/rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reseñaData),
            });

            if (response.ok) {
                console.log('Reseña publicada exitosamente');
                console.log(reseñaData);
            } else {
                console.error('Error al publicar reseña');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }

    const handleReservaChange = (event) => {
        const { name, value } = event.target;
        setReservaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleReseñaChange = (event) => {
        const { name, value } = event.target;
        setReseñaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Grid container>
                <Grid item xs={12} sm={5}>
                    <img
                        src={props.image}
                        alt="restaurante"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h1>{props.name}</h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            {props.des}
                        </p>
                        <h4>Menú</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: "5px" }}>
                            {props.menu.map(item => (
                                <Card key={item.id} >
                                    <Card.Body>
                                        {item.nombre} - Q{item.precio.toFixed(2)}
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>

                        <br />
                        <h4>Ubicación</h4>
                        <div style={{ height: "200px" }}>
                            <MapContainer center={[props.latitud, props.longitud]} zoom={12} scrollWheelZoom={false} style={{ height: "200px", width: "420px" }} >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[props.latitud, props.longitud]} icon={markerIcon}>
                                    <Popup>
                                        {props.name}
                                    </Popup>
                                    <LocationOnIcon color="primary" />
                                </Marker>
                            </MapContainer>
                        </div>
                        <br />
                        <h4>Rating</h4>
                        <Rating
                            name="customized-empty"
                            value={ratingValue}
                            readOnly
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        {MensajeLogin && (
                            <div>
                                <p style={{ fontSize: "12px", color: "grey", marginRight: "50px", marginTop: "10px" }}>Para realizar una reserva o publicar una reseña, <br />por favor inicie sesión.</p>
                            </div>
                        )}

                        {AccordionReserva && (
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Reserva</Accordion.Header>
                                    <Accordion.Body>
                                        <Form onSubmit={handleSubmitReserva}>
                                            <Form.Group className="mb-3" controlId="formGridComents">
                                                <TextField fullWidth label="Nombre" id="fullWidth" />
                                            </Form.Group>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridPhone">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Número de teléfono"
                                                        variant="outlined"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">+502</InputAdornment>
                                                        }}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridPersons">
                                                    <TextField
                                                        id="outlined-basic"
                                                        label="Número de personas"
                                                        variant="outlined"
                                                        name='cantidad_personas'
                                                        onChange={handleReservaChange}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridDate">
                                                    <TextField
                                                        id="date"
                                                        label="Fecha"
                                                        type="date"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridHour">
                                                    <TextField
                                                        id="time"
                                                        label="Hora"
                                                        type="time"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Row>

                                            <Form.Group className="mb-3" controlId="formGridComents">
                                                <TextField fullWidth label="Comentarios" id="fullWidth" name='comentarios' onChange={handleReservaChange} />
                                            </Form.Group>

                                            <Button style={{ height: "54px", width: "100px", background: "white", color: "black", borderColor: "#DEE2E6" }} type="submit">
                                                Reservar
                                            </Button>
                                        </Form>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                        )}

                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Reseñas</Accordion.Header>
                                <Accordion.Body>
                                    {rating.length > 0 ? (
                                        <div className='reseña' >
                                            {rating.map((rating) => (
                                                <p key={rating._id}>
                                                    {rating.comentarios}
                                                    <br />
                                                    Puntuación: {parseInt(rating.puntuacion)}
                                                </p>
                                            ))}
                                        </div>
                                    ) : (
                                        <p style={{ color: "grey" }}>Este restaurante aún no ha recibido reseñas.
                                            Explora el exquisito menú y descubre las delicias que ofrece.
                                            ¡Tu opinión podría ser la primera en enriquecer la experiencia de otros comensales!</p>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                        {AccordionReseña && (
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Publicar reseña</Accordion.Header>
                                    <Accordion.Body>
                                        <Form onSubmit={handleSubmitReseña}>
                                            <Form.Group className="mb-3" controlId="formGridComents">
                                                <TextField sx={{ width: 380 }} fullWidth label="Comentario" id="fullWidth" name='comentarios' onChange={handleReseñaChange} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formGridRating">
                                                <TextField fullWidth label="Puntuacion" id="fullWidth" name='puntuacion' onChange={handleReseñaChange} />
                                            </Form.Group>

                                            <br />

                                            <Button style={{ height: "54px", width: "100px", background: "white", color: "black", borderColor: "#DEE2E6" }} type="submit">
                                                Publicar
                                            </Button>
                                        </Form>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )}

                    </Modal.Footer>
                </Grid>
            </Grid>
        </Modal>
    );
}

function Cards(props) {
    const [isHovered, setIsHovered] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <Card
                style={{ maxWidth: "450px", transform: isHovered ? 'scale(1.02)' : 'scale(1)', transition: 'transform 0.3 ease', cursor: 'pointer', background: "black", color: "#EAE0D5" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setModalShow(true)}
            >
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                        <h2>{props.name}</h2>
                    </Card.Title>
                </Card.Body>
            </Card>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                name={props.name}
                image={props.image}
                des={props.desc}
                rating={props.rating}
                id={props.id}
                menu={props.menu}
                latitud={props.latitud}
                longitud={props.longitud}
            />
        </>
    );
}

export default Cards;
