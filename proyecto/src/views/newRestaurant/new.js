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
import AddLocationIcon from '@mui/icons-material/AddLocation';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NumbersIcon from '@mui/icons-material/Numbers';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import "./new.css";

function New() {
    const [platillos, setPlatillos] = useState([]);

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
                                <TextField fullWidth label="Nombre del restaurante" id="fullWidth"
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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <DescriptionIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress">
                                <TextField fullWidth label="Dirección del restaurante" id="fullWidth"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AddLocationIcon />
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


                            <Form.Group className="mb-3" controlId="formGridNum">
                                <TextField fullWidth label="Número de registro" id="fullWidth"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <NumbersIcon />
                                            </InputAdornment>
                                        )
                                    }}
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
