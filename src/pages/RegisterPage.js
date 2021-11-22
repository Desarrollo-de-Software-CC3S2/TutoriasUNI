import { Container, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

export default function RegisterPage() {
  function handleClick() {
    //axios.post("");
    console.log("click");
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control required type="text" placeholder="Ingrese Nombre" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ingrese Apellido"
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Ingrese contraseña"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Repita Contraseña</Form.Label>
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
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
