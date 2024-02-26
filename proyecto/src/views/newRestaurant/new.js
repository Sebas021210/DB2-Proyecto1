import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import "./new.css";

function New() {
    const [platillos, setPlatillos] = useState([]);
    const [newRestaurant, setNewRestaurant] = useState({
        nombre: "",
        descripcion: "",
        img: "",
        ubicacion: {
            latitud: "",
            longitud: ""
        },
        menu: []
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://tu-api.com/restaurante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRestaurant),
            });

            if (response.ok) {
                console.log('Restaurante agregado exitosamente');
            } else {
                console.error('Error al agregar restaurante');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewRestaurant((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <div className="New">
            <div className="titleNew">
                <h1>Nuevo Restaurante</h1>
            </div>
            <div className="BodyNew">
                <div className="formNew">
                    <div className="contentForm">
                        <Form style={{ width: "85%" }}>
                            <Form.Group className="mb-3" controlId="formGridName">
                                <TextField fullWidth label="Nombre del restaurante" id="fullWidth" name="nombre"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <RestaurantIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridDescription">
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Descripción del restaurante"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    name="descripcion"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DescriptionIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridImage">
                                <TextField fullWidth label="Imagen del restaurante" id="fullWidth" name="img"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ImageIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridLat">
                                    <TextField
                                        id="outlined-basic"
                                        label="Latitud"
                                        variant="outlined"
                                        name="latitud"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <ShareLocationIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLong">
                                    <TextField
                                        id="outlined-basic"
                                        label="Longitud"
                                        variant="outlined"
                                        name="longitud"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <ShareLocationIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridMenu">
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    options={platillos}
                                    freeSolo
                                    getOptionLabel={(option) => option.title || option}
                                    filterSelectedOptions
                                    name="menu"
                                    onChange={(event, newValue) => setPlatillos(newValue.map(item => ({ title: item })))}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MenuBookIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Menú del restaurante"
                                            placeholder="Platillos del restaurante"
                                        />
                                    )}
                                />
                            </Form.Group>

                            <br />

                            <div className="ButtonNew" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button style={{ height: "54px", backgroundColor: "transparent", color: "black", borderColor: "#000" }} type="submit">
                                    Agregar restaurante
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default New;
