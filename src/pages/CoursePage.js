import axios from "axios";
import { Container, Accordion, Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAuth from "../auth/useAuth";
import ReactPlayer from "react-player";
import { Formik, Form as Formk, Field } from "formik";
import { useState } from "react";
import roles from "../helpers/roles";
import DocumentSchema from "../schemas/DocumentSchema";
import FileViewer from "react-file-viewer";
//import CourseData from "../assets/data/Cursos";

export default function CoursePage() {
  const { courseId } = useParams();
  const { course, setCourse, user } = useAuth();
  const [modalShow, setModalShow] = useState(false);
  var key = 0;
  //let CourseInfo = CourseData.filter((item) => item.id === Number(courseId));
  //console.log(CourseInfo[0].id);
  return (
    <div style={{ display: "flex", margin: "2rem" }}>
      <Container>
        <h1>{course?.nombre}</h1>
        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          style={{ display: user?.rol === roles.tutor ? "" : "none" }}
        >
          Subir Material
        </Button>
        <Accordion defaultActiveKey="0" flush>
          {course?.contenido.map((item) => (
            <Accordion.Item eventKey={key++}>
              <Accordion.Header>{item.nombre}</Accordion.Header>
              <Accordion.Body>
                {item.tipo === "video" ? (
                  <ReactPlayer controls url={item.link} />
                ) : (
                  <FileViewer fileType="pdf" filePath={item.link}/>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Subir Material</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                tipo: "",
                link: "",
                nombre: "",
              }}
              validationSchema={DocumentSchema}
              onSubmit={(values, { resetForm }) => {
                var contenido = course?.contenido;
                let valores = {
                  tipo: values.tipo,
                  link: values.link,
                  nombre: values.nombre,
                };
                console.log(contenido);
                contenido.push(valores);
                resetForm();
                axios
                  .patch(`https://tutoriasuni-api.herokuapp.com/api/v1/courses/${courseId}`, {
                    contenido: contenido,
                  })
                  .then((res) => {
                    setCourse(res.data);
                  })
                  .catch((err) => console.log(err));
                setModalShow(false);
              }}
            >
              {({ errors, touched }) => (
                <Form as={Formk}>
                  <Form.Group className="mb-4">
                    <Form.Label htmlForm="tipo">Tipo</Form.Label>
                    <Field
                      as={Form.Select}
                      type="select"
                      name="tipo"
                      isInvalid={!!errors.tipo && touched.tipo}
                      isValid={!errors.tipo && touched.tipo}
                    >
                      <option>Elija una opción</option>
                      <option value="documento">Documento</option>
                      <option value="video">Video</option>
                    </Field>
                    <Form.Control.Feedback type="invalid">
                      {errors.tipo}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="link">Nombre del material</Form.Label>
                    <Form.Control
                      as={Field}
                      type="text"
                      name="nombre"
                      placeholder="Ingrese nombre del material"
                      isInvalid={!!errors.nombre && touched.nombre}
                      isValid={!errors.nombre && touched.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombre}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label htmlFor="link">Enlace</Form.Label>
                    <Form.Control
                      as={Field}
                      type="text"
                      name="link"
                      placeholder="Ingrese enlace del material"
                      isInvalid={!!errors.link && touched.link}
                      isValid={!errors.link && touched.link}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.link}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Subir
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
