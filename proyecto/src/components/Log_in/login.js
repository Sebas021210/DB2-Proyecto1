import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineUser } from "react-icons/ai";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useUser } from '../../global/id_rol.js';
import NewUser from './newUser.js';



function Login() {
  const [show, setShow] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setId, setRol, setRestaurantes } = useUser();

  const handleClose = () => {
    setShow(false);
    setShowNewUser(false);
  };

  const handleShow = () => setShow(true);
  const handleShowNewUser = () => setShowNewUser(true);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo: email, contraseña: password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setLoggedIn(true);
        setUser(data); // Establece el usuario con los datos recibidos
        setId(data._id); // Establece el id en el contexto global
        setRol(data.rol); // Establece el rol en el contexto global
        if (data.restaurantes && data.restaurantes.length > 0) {
          setRestaurantes(data.restaurantes.map(restaurante => restaurante._id)); // Establece los ID de restaurantes en el contexto global
        }
        console.log('User details:', data);
      } else {
        console.log('Login failed');
        // Muestra el mensaje de error y resetea los campos de correo y contraseña
        alert('No se pudo iniciar sesión, inténtelo de nuevo');
        setEmail('');
        setPassword('');
        setLoggedIn(false); // Asegura que el estado de autenticación esté en false en caso de fallo de inicio de sesión
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Muestra el mensaje de error y resetea los campos de correo y contraseña
      alert('No se pudo iniciar sesión, inténtelo de nuevo');
      setEmail('');
      setPassword('');
      setLoggedIn(false); // Asegura que el estado de autenticación esté en false en caso de fallo de inicio de sesión
    }
  };
  

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setEmail('');
    setPassword('');
    // Establece el id en el contexto global como nulo para cerrar sesión
    setId(null);
    // Establece el rol en el contexto global como nulo para cerrar sesión
    setRol(null);
  };

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
          <Modal.Title>{loggedIn ? `Welcome, ${user ? user.correo : ''}` : 'Log In'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!showNewUser && !loggedIn && (
            <>
              <FloatingLabel controlId="email" label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel controlId="password" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
            </>
          )}
          {showNewUser && <NewUser />} {/* Renderiza NewUser si showNewUser es true */}
        </Modal.Body>
        {!showNewUser && !loggedIn && (
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleShowNewUser}
              style={{ background: '#EAE0D5', color: 'black', border: 'black' }}
            >
              Create New User
            </Button>
            <Button
              variant="primary"
              onClick={handleLogin}
              style={{ background: 'black', color: '#EAE0D5', border: '#EAE0D5' }}
            >
              Log In
            </Button>
          </Modal.Footer>
        )}
        {loggedIn && (
          <Modal.Footer>

            
            <Button
              variant="primary"
              onClick={handleLogout}
              style={{ background: '#EAE0D5', color: 'black', border: '#EAE0D5' }}
            >
              Log Out
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default Login;
