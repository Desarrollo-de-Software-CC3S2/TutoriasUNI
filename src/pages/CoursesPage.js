import CourseItem from "../components/CourseItem";
//import CourseData from "../assets/data/Cursos";
import { Col, Row, Button, Form, Offcanvas, Modal } from "react-bootstrap";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import MessageItem from "../components/MessageItem";
import roles from "../helpers/roles";
import CourseSchema from "../schemas/CourseSchema";
import axios from "axios";
import { Formik, Form as Formk, Field } from "formik";

export default function CoursesPage() {
  const { user, setUser } = useAuth();
  //let Courses = CourseData.filter((item) => user.cursos.includes(item.id));

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    axios
      .patch(`https://tutoriasuni-api.herokuapp.com/api/v1/alumnos/${user._id}`, {
        chatbot: [],
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleShow = () => setShow(true);
  return (
    <div style={{ display: "flex", margin: "2rem" }}>
      <Col md={{ span: 9 }}>
        <Row xs={1} md={2} lg={4} className="g-4">
          {user?.cursos?.map((item) => (
            <CourseItem
              key={item.id_curso}
              courseId={item.id_curso}
              title={item.nombre}
              tema={item.tema}
              tutor={item.nombre_tutor}
              codigo={item.codigo}
            />
          ))}
        </Row>
        <Formik
          initialValues={{
            codigo: "",
          }}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            axios
              .patch(
                `https://tutoriasuni-api.herokuapp.com/api/v1/alumnos/${user._id}/courses/${values.codigo}`
              )
              .then((res) => {
                //console.log(res.data);
                setUser(res.data);
              })
              .catch((err) => console.log(err));
          }}
        >
          {() => (
            <Formk
              as={Row}
              className="mt-5"
              style={{ display: user?.rol === roles.alumno ? "" : "none" }}
            >
              <Col md={{ span: 1 }}>
                <Button type="submit">Añadir</Button>
              </Col>
              <Col xs={{ span: 4 }} md={{ span: 2 }}>
                <Form.Control
                  as={Field}
                  name="codigo"
                  type="text"
                  placeholder="Ingrese codígo"
                />
              </Col>
            </Formk>
          )}
        </Formik>
      </Col>
      <Col className="m-3">
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ display: user?.rol === roles.alumno ? "" : "none" }}
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
              {user?.chatbot?.map((item) => (
                <MessageItem message={item} />
              ))}
            </div>
            <Formik
              initialValues={{
                cadena: "",
              }}
              onSubmit={(values, { resetForm }) => {
                resetForm();
                let valores = {
                  cadena: values.cadena,
                  userID: user?._id,
                };
                var chatbot = user?.chatbot;
                chatbot.push({
                  id_bot: "1",
                  text: values.cadena,
                  isBot: false,
                });
                //console.log(chatbot);
                axios
                  .patch(`https://tutoriasuni-api.herokuapp.com/api/v1/alumnos/${user._id}`, {
                    chatbot: chatbot,
                  })
                  .then((res) => {
                    setUser(res.data);
                    console.log(res.data);
                    var chatbot2 = user?.chatbot;
                    axios
                      .post(`https://tutoriasuni-api.herokuapp.com/api/v1/bot`, valores)
                      .then((res) => {
                        chatbot2.push({
                          id_bot: "1",
                          text: res.data.msg,
                          isBot: true,
                        });
                        axios
                          .patch(
                            `https://tutoriasuni-api.herokuapp.com/api/v1/alumnos/${user._id}`,
                            {
                              chatbot: chatbot2,
                            }
                          )
                          .then((res) => {
                            setUser(res.data);
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              }}
            >
              {() => (
                <Form as={Formk}>
                  <Row>
                    <Form.Group as={Col} xs={8} md={8}>
                      <Form.Control
                        as={Field}
                        type="textarea"
                        name="cadena"
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
              )}
            </Formik>
          </Offcanvas.Body>
        </Offcanvas>

        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          style={{ display: user?.rol === roles.tutor ? "" : "none" }}
        >
          Crear curso
        </Button>

        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Crear curso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                nombre: "",
                tema: "",
              }}
              validationSchema={CourseSchema}
              onSubmit={(values, { resetForm }) => {
                let valores = {
                  nombre: values.nombre,
                  tema: values.tema,
                  profesorId: user?._id,
                };
                resetForm();
                let cursos = user?.cursos;
                axios
                  .post(`https://tutoriasuni-api.herokuapp.com/api/v1/courses/`, valores)
                  .then((res) => {
                    //console.log(res.data);
                    //setUser({ cursos: })
                    cursos.push({
                      id_curso: res.data._id,
                      nombre: res.data.nombre,
                      codigo: res.data.codigo,
                      tema: res.data.tema,
                    });
                    //console.log(cursos);
                    const newValores = {
                      cursos: cursos,
                    };
                    axios
                      .patch(
                        `https://tutoriasuni-api.herokuapp.com/api/v1/tutores/${user._id}`,
                        newValores
                      )
                      .then((res) => {
                        //console.log(res.data);
                        setUser(res.data);
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
                setModalShow(false);
              }}
            >
              {({ errors, touched }) => (
                <Form as={Formk}>
                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="nombre">Nombre de Curso</Form.Label>
                    <Form.Control
                      as={Field}
                      type="text"
                      name="nombre"
                      placeholder="Ingrese nombre de curso"
                      isInvalid={!!errors.nombre && touched.nombre}
                      isValid={!errors.nombre && touched.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombre}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label htmlForm="tema">Tema</Form.Label>
                    <Field
                      as={Form.Select}
                      type="select"
                      name="tema"
                      isInvalid={!!errors.tema && touched.tema}
                      isValid={!errors.tema && touched.tema}
                    >
                      <option>Elija una opción</option>
                      <option value="Matematica">Matematica</option>
                      <option value="Computacion">Computacion</option>
                      <option value="Fisica">Fisica</option>
                      <option value="Quimica">Quimica</option>
                      <option value="Idiomas">Idiomas</option>
                      <option value="Letras">Letras</option>
                    </Field>
                    <Form.Control.Feedback type="invalid">
                      {errors.tema}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Crear
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </Col>
    </div>
  );
}
