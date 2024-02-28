import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function NewUser() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');

  const handleRoleChange = (e) => {
    setRol(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      nombre,
      apellido,
      correo: email,
      contraseña: password,
      rol: parseInt(rol), // Convierte el rol a entero
      restaurantes: [] // Por defecto, los restaurantes están vacíos
    };

    try {
      const response = await fetch('http://localhost:5050/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log('New user created:', data);
      
      // Limpiar los campos después de enviar el formulario
      setNombre('');
      setApellido('');
      setEmail('');
      setPassword('');
      setRol('');
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="Nombre"
              placeholder="Enter Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="Apellido"
              placeholder="Enter Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Role</Form.Label>
            <Form.Select value={rol} onChange={handleRoleChange}>
              <option value="" disabled>Select Role...</option>
              <option value="0">Owner</option>
              <option value="1">Gerente</option>
              <option value="2">Usuario común</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" style={{ color: 'white', background: 'black' }}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default NewUser;
