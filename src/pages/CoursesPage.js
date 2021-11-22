import CourseItem from "../components/CourseItem";
import CourseData from "../assets/data/Cursos";
import { Col, Row, Button, Form, Offcanvas, Modal } from "react-bootstrap";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import MessageItem from "../components/MessageItem";
import roles from "../helpers/roles";

export default function CoursesPage() {
  const { user } = useAuth();
  let Courses = CourseData.filter((item) => user.cursos.includes(item.id));

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let Messages = [
    {
      isBot: true,
      text: "Hola bienvenido!!",
    },
    {
      isBot: false,
      text: "Quiero ver los cursos de matematica",
    },
    {
      isBot: true,
      text: "Curso1, Curso2, Curso3",
    },
    {
      isBot: false,
      text: "Quiero ver mis cuestionarios pendientes",
    },
    {
      isBot: true,
      text: "....",
    },
  ];
  return (
    <div style={{ display: "flex", margin: "2rem" }}>
      <Col md={{ span: 9 }}>
        <Row xs={1} md={2} lg={4} className="g-4">
          {Courses.map((item) => (
            <CourseItem
              key={item.id}
              courseId={item.id}
              title={item.name}
              tema={item.tema}
              tutor={item.tutor}
              colorCurso={item.color}
            />
          ))}
        </Row>
        <Form
          as={Row}
          className="mt-5"
          style={{ display: user?.role === roles.alumno ? "" : "none" }}
        >
          <Col md={{ span: 1 }}>
            <Button type="submit">Añadir</Button>
          </Col>
          <Col xs={{ span: 4 }} md={{ span: 2 }}>
            <Form.Control type="text" placeholder="Ingrese codígo" />
          </Col>
        </Form>
      </Col>
      <Col className="m-3">
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ display: user?.role === roles.alumno ? "" : "none" }}
        >
          ChatBot
        </Button>

        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          scroll="true"
          backdrop="true"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>ChatBot</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div style={{ overflowY: "scroll", height: "90%" }}>
              {Messages.map((item) => (
                <MessageItem message={item} />
              ))}
            </div>
            <Form>
              <Row>
                <Form.Group as={Col} xs={8} md={8}>
                  <Form.Control
                    as="textarea"
                    placeholder="Ingrese un mensaje"
                    style={{ width: "100%" }}
                  />
                </Form.Group>
                <Form.Group as={Col} xs={4} md={4}>
                  <Button variant="primary" type="submit">
                    Enviar
                  </Button>
                </Form.Group>
              </Row>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>

        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          style={{ display: user?.role === roles.tutor ? "" : "none" }}
        >
          Crear curso
        </Button>

        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Crear curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Nombre de Curso</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese nombre de curso"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Codigo de Curso</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese codigo de curso"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Tema</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Elija una opcion</option>
                  <option value="Matematica">Matematica</option>
                  <option value="Fisica">Fisica</option>
                  <option value="Quimica">Quimica</option>
                  <option value="Idiomas">Idiomas</option>
                </Form.Select>
              </Form.Group>
              <Button
                as={Col}
                variant="primary"
                md={{ span: 6, offset: 3 }}
                xs={{ span: 6, offset: 3 }}
                type="submit"
              >
                Crear
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Col>
    </div>
  );
}
