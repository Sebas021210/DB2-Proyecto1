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
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import './cards.css';
import { Grid } from '@mui/material';

function MyVerticallyCenteredModal(props) {
    const [menu, setMenu] = useState([])
    const [rating, setRating] = useState([]);
    const ratingValue = props.rating;
    
    const markerIcon = new Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconSize: [25, 41]
    });

    useEffect(() => {
        fetch("http://localhost:5050/plates?id_restaurante=" + props.id)
            .then((response) => response.json())
            .then((data) => setMenu(data));
    }, [props.id]);

    useEffect(() => {
        fetch("http://localhost:5050/threeBestRatings?id_restaurante=" + props.id)
            .then((response) => response.json())
            .then((data) => setRating(data));
    }, [props.id]);

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
                        src="https://bde04f90fcbcc7b99af9-a4cf3e88ec567f5b6c6819f1d482f77f.ssl.cf1.rackcdn.com/16_773_r_0.jpg?v=1752"
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
                        {menu.length > 0 ? (
                            <div className='menu' style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                {menu.map((platillo) => (
                                    <Card key={platillo._id}>
                                        <Card.Body>
                                            {platillo.nombre}
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p>Menú no disponible...</p>
                        )}
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
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Reserva</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
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
                                                <Autocomplete
                                                    disablePortal
                                                    id="combo-box-demo"
                                                    options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                                    renderInput={(params) => <TextField {...params} label="Personas" />}
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
                                            <TextField fullWidth label="Comentarios" id="fullWidth" />
                                        </Form.Group>

                                        <Button style={{ height: "54px", width: "100px", background: "white", color: "black", borderColor: "#DEE2E6" }} type="submit">
                                            Reservar
                                        </Button>
                                    </Form>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Reseñas</Accordion.Header>
                                <Accordion.Body>
                                    {rating.length > 0 ? (
                                        <div className='reseña' >
                                            {rating.map((rating) => (
                                                <p key={rating._id}>
                                                    {rating.fecha}
                                                </p>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Reseñas no disponibles...</p>
                                    )}
                                    <p>
                                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                        consectetur ac, vestibulum at eros.
                                    </p>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
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
                <Card.Img variant="top" src="https://www.guatemala.com/fotos/2021/01/Nuevas-promociones-2x1-de-Trefratelli-en-la-app-de-Cupones-Guatemala.com-1-885x500.jpg" />
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
                latitud={props.latitud}
                longitud={props.longitud}
            />
        </>
    );
}

export default Cards;
