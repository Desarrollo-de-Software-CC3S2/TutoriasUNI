import { Container, Form, Row, Col, Button } from "react-bootstrap";

export default function RegisterPage() {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <Form className="mb-6">
            <Form.Label>Nombre</Form.Label>
            <Form.Control required type="text" placeholder="Ingrese Nombre" />
            <Form.Label>Apellido</Form.Label>
            <Form.Control required type="text" placeholder="Ingrese Apellido" />
            <Form.Label>Email address</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" />
            <Form.Label>Contraseña</Form.Label>
            <Form.Control required type="password" placeholder="Ingrese contraseña" />
            <Form.Label>Repita Contraseña</Form.Label>
            <Form.Control required type="password" placeholder="Ingrese contraseña" />
            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
