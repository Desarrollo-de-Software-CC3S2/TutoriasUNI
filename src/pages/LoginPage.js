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
            <Form.Group className="mb-2">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Ingrese contraseña"
              />
            </Form.Group>
            <Button
              as={Col}
              variant="primary"
              md={{ span: 6, offset: 3 }}
              xs={{ span: 6, offset: 3 }}
              type="submit"
            >
              Iniciar sesión
            </Button>
          </Form>
          <Button
            onClick={() => login(userCredentialsAl, location.state?.from)}
          >
            Iniciar sesión alumno
          </Button>
          <Button
            onClick={() => login(userCredentialsTu, location.state?.from)}
          >
            Iniciar sesión tutor
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
