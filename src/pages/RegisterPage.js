import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Formik, Form as Formk, Field } from "formik";
import RegisterSchema from "../schemas/RegisterSchema";
import axios from "axios";

export default function RegisterPage() {
  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              email: "",
              password: "",
              confirmpass: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              axios
                .post(`http://localhost:8000/api/v1/auth/register`, values)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => console.log(err));
            }}
          >
            {({ errors, touched }) => (
              <Form as={Formk}>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="name">Nombre</Form.Label>
                  <Form.Control
                    as={Field}
                    type="text"
                    name="name"
                    placeholder="Ingrese Nombre"
                    isInvalid={!!errors.name && touched.name}
                    isValid={!errors.name && touched.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="lastname">Apellido</Form.Label>
                  <Form.Control
                    as={Field}
                    type="text"
                    name="lastname"
                    placeholder="Ingrese Apellido"
                    isInvalid={!!errors.lastname && touched.lastname}
                    isValid={!errors.lastname && touched.lastname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastname}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="email">Correo</Form.Label>
                  <Form.Control
                    as={Field}
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    isInvalid={!!errors.email && touched.email}
                    isValid={!errors.email && touched.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="password">Contraseña</Form.Label>
                  <Form.Control
                    as={Field}
                    type="password"
                    name="password"
                    placeholder="Ingrese contraseña"
                    isInvalid={!!errors.password && touched.password}
                    isValid={!errors.password && touched.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="confirmpass">
                    Confirme Contraseña
                  </Form.Label>
                  <Form.Control
                    as={Field}
                    type="password"
                    name="confirmpass"
                    placeholder="Repita contraseña"
                    isInvalid={!!errors.confirmpass && touched.confirmpass}
                    isValid={!errors.confirmpass && touched.confirmpass}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmpass}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Col md={{ offset: 4 }}>
                    <Button variant="primary" type="submit">
                      Registrarse
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
