import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineUser } from "react-icons/ai";
import NewUser from './newUser';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Login() {
  const [show, setShow] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowNewUser(false);
  };

  const handleShow = () => setShow(true);
  const handleShowNewUser = () => setShowNewUser(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="ml-auto"
        style={{ background: '#0A0908', border: '#0A0908', marginTop: '5px' }}
      >
        <AiOutlineUser style={{ width: '40px', height: '40px' }} />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!showNewUser && (
            <>
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </>
          )}
          {showNewUser && <NewUser onClose={handleClose} />}
        </Modal.Body>
        {!showNewUser && (
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleShowNewUser}
              style={{ background: 'black', color: '#EAE0D5', border: 'black' }}
            >
              Crear Nuevo Usuario
            </Button>
            <Button
              variant="primary"
              onClick={handleClose}
              style={{ background: '#EAE0D5', color: 'black', border: '#EAE0D5' }}
            >
              LogIn
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default Login;