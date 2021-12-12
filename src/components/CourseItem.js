import {
  Card,
  Col,
  Button,
  DropdownButton,
  Dropdown,
  Modal,
  Form,
} from "react-bootstrap";
//import { NavLink } from "react-router-dom";
import routes from "../helpers/routes";
import useAuth from "../auth/useAuth";
import roles from "../helpers/roles";
import axios from "axios";
import { Formik, Form as Formk, Field } from "formik";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import CourseSchema from "../schemas/CourseSchema";

export default function CourseItem(props) {
  const { user, setUser } = useAuth();
  const { setCourse } = useAuth();
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Col>
        <Card>
          <Card.Header
            style={{ display: user?.rol === roles.tutor ? "" : "none" }}
          >
            <DropdownButton drop="end" title="Modificar" variant="warning">
              <Dropdown.Item as={Button} onClick={() => setModalShow(true)}>
                Modificar
              </Dropdown.Item>
              <Formik
                initialValues={{}}
                onSubmit={() => {
                  axios
                    .delete(
                      `http://localhost:8000/api/v1/courses/${props.courseId}`
                    )
                    .then((res) => {
                      var cursos = user?.cursos;
                      cursos = cursos.filter((curso) => {
                        if (curso.id_curso === res.data._id) return false;
                        return true;
                      });
                      console.log(cursos);
                      axios
                        .patch(
                          `http://localhost:8000/api/v1/tutores/${user._id}`,
                          { cursos: cursos }
                        )
                        .then((res) => {
                          setUser(res.data);
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                }}
              >
                {() => (
                  <Formk>
                    <Dropdown.Item as={Button} type="submit">
                      Eliminar
                    </Dropdown.Item>
                  </Formk>
                )}
              </Formik>
            </DropdownButton>
          </Card.Header>
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Subtitle>Codigo: {props.codigo}</Card.Subtitle>
            <Card.Text
              style={{ display: user?.rol === roles.alumno ? "" : "none" }}
            >
              Tema: {props.tema} <br />
              Profesor: {props.tutor}
            </Card.Text>
            <Card.Text
              style={{ display: user?.rol === roles.tutor ? "" : "none" }}
            >
              Tema: {props.tema}
            </Card.Text>
            <Formik
              initialValues={{}}
              onSubmit={() => {
                axios
                  .get(`http://localhost:8000/api/v1/courses/${props.courseId}`)
                  .then((res) => {
                    setCourse(res.data);
                    //console.log(res.data);
                  })
                  .catch((err) => console.log(err));
                history.push(routes.course(props.courseId));
              }}
            >
              {() => (
                <Formk>
                  <Button variant="primary" type="submit">
                    Ir a curso
                  </Button>
                </Formk>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              nombre: props.title,
              tema: props.tema,
            }}
            validationSchema={CourseSchema}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              axios
                .patch(
                  `http://localhost:8000/api/v1/courses/${props.courseId}`,
                  values
                )
                .then((res) => {
                  var cursos = user?.cursos;
                  cursos = cursos.filter((curso) => {
                    if (curso.id_curso === props.courseId) return false;
                    return true;
                  });
                  cursos.push({
                    id_curso: res.data._id,
                    nombre: res.data.nombre,
                    codigo: res.data.codigo,
                    tema: res.data.tema,
                  });
                  axios
                    .patch(`http://localhost:8000/api/v1/tutores/${user._id}`, {
                      cursos: cursos,
                    })
                    .then((res) => {
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
                  Modificar
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
