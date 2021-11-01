import { Container, Row, Col } from "react-bootstrap";

export default function HomePage() {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2>TutoriasUNI</h2>
          <p>
            Esta pagina esta diseñada para todos los alumnos que quieran
            aprender cursos nuevos y temas de su interes y conveniencia.
          </p>
          <h2>¿Que encontraras aqui?</h2>
          <p>Encontraras un sin fin de cursos a los cuales te podras unir.</p>
        </Col>
      </Row>
    </Container>
  );
}
