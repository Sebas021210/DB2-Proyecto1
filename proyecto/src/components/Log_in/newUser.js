
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function NewUser() {
  return (
    <>
 <Form>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="Nombre" placeholder="Enter Nombre" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="Apellido" placeholder="Enter Apellido" />
        </Form.Group>

        <Form.Group controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Role</Form.Label>
          <Form.Select defaultValue="">
            <option value="" disabled>Select Role...</option>
            <option>Owner</option>
            <option>Gerente</option>
            <option>Usuario comun</option>
          </Form.Select>
        </Form.Group>
      </Row>


      <Button variant="primary" type="submit" style={{color: 'white', background: 'black'}}>
        Submit
      </Button>
    </Form>
    </>
  );
}

export default NewUser;
