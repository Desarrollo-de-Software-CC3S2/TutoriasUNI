import { useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
//import usersData from "../assets/data/Users";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Formik, Form as Formk, Field } from "formik";
import LoginSchema from "../schemas/LoginSchema";
import axios from "axios";

/* const userCredentialsAl = usersData[0];
const userCredentialsTu = usersData[1]; */

export default function LoginPage() {
  const location = useLocation();
  const { login } = useAuth();
  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              axios
                .get(
                  `http://localhost:8000/api/v1/auth/login/${values.email}&&${values.password}`
                )
                .then((res) => {
                  //console.log(res.data);
                  login(res.data, location.state?.from)
                })
                .catch((err) => console.log(err));
            }}
          >
            {({ errors, touched }) => (
              <Form as={Formk}>
                <Form.Group className="mb-2">
                  <Form.Label htmlFor="email">Correo</Form.Label>
                  <Form.Control
                    as={Field}
                    type="email"
                    name="email"
                    placeholder="Ingrese correo"
                    isInvalid={!!errors.email && touched.email}
                    isValid={!errors.email && touched.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
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
                <Form.Group>
                  <Col md={{ offset: 4 }}>
                    <Button variant="primary" type="submit">
                      Iniciar sesión
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            )}
          </Formik>
          {/* <Button
            onClick={() => login(userCredentialsAl, location.state?.from)}
          >
            Iniciar sesión alumno
          </Button>
          <Button
            onClick={() => login(userCredentialsTu, location.state?.from)}
          >
            Iniciar sesión tutor
          </Button> */}
        </Col>
      </Row>
    </Container>
  );
}
