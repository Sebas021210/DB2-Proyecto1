import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './cards.css';
import { Grid } from '@mui/material';

function MyVerticallyCenteredModal(props) {
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
                        alt="Tre Fratelli"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h1>Tre Fratelli</h1>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Informacion</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                        </p>
                        <h4>Menu</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                        </p>
                        <h4>Rating</h4>
                        <p>
                            ...
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{background: "white", color: "black", borderColor: "black"}}>
                            Reserva
                        </Button>
                        <Button style={{background: "white", color: "black", borderColor: "black"}}>
                            Reseñas
                        </Button>
                    </Modal.Footer>
                </Grid>
            </Grid>
        </Modal>
    );
}

function Cards() {
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
                style={{ maxWidth: "450px", transform: isHovered ? 'scale(1.02)' : 'scale(1)', transition: 'transform 0.3 ease', cursor: 'pointer' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setModalShow(true)}
            >
                <Card.Img variant="top" src="https://www.guatemala.com/fotos/2021/01/Nuevas-promociones-2x1-de-Trefratelli-en-la-app-de-Cupones-Guatemala.com-1-885x500.jpg" />
                <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                        <h2>Tre Fratelli</h2>
                    </Card.Title>
                </Card.Body>
            </Card>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default Cards;
