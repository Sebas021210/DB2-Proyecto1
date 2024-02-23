import Card from 'react-bootstrap/Card';
import React from "react";
import Button from 'react-bootstrap/Button';

function Reservas({ Nombre, Cantidad_P, No_reserva, date, time, tel, extra }) {
  return (
    <Card style={{ width: '28rem', background: 'white', color: 'black' }}>
      <Card.Body>
        <Card.Title>{Nombre}</Card.Title>
        <Card.Subtitle>{Cantidad_P} personas</Card.Subtitle>
        <Card.Text></Card.Text>
        <Card.Text> Numero de Reserva: {No_reserva}</Card.Text>
        <Card.Subtitle>Date:</Card.Subtitle>
        <Card.Text>{date}</Card.Text>
        <Card.Subtitle>Time:</Card.Subtitle>
        <Card.Text>{time}</Card.Text>
        <Card.Text>Telefono: {tel}</Card.Text>
        <Card.Subtitle>Informacion Extra:</Card.Subtitle>
        <Card.Text>{extra}</Card.Text>
        <Button variant="primary" style={{background: '#EAE0D5', color: 'black', border: '#EAE0D5'}}>Reserva Terminada</Button>
      </Card.Body>
    </Card>
  );
}

export default Reservas;