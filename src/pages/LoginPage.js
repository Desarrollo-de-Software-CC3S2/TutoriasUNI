import { useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import usersData from "../assets/data/Users";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const userCredentialsAl = usersData[0];
const userCredentialsTu = usersData[1];

export default function LoginPage() {
  const location = useLocation();
  const { login } = useAuth();
  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" />
            <Form.Label>Contraseña</Form.Label>
            <Form.Control required type="password" placeholder="Ingrese contraseña" />
            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </Form>
          <button
            onClick={() => login(userCredentialsAl, location.state?.from)}
          >
            Iniciar sesión alumno
          </button>
          <button
            onClick={() => login(userCredentialsTu, location.state?.from)}
          >
            Iniciar sesión tutor
          </button>
        </Col>
      </Row>
    </Container>
  );
}
