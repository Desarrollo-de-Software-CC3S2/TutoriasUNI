import { Card, Col, Button } from "react-bootstrap";
//import { NavLink } from "react-router-dom";
import routes from "../helpers/routes";
import useAuth from "../auth/useAuth";
import roles from "../helpers/roles";
import axios from "axios";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";

export default function CourseItem(props) {
  const { user } = useAuth();
  const { setCourse } = useAuth();
  const history = useHistory();

  return (
    <Col>
      <Card>
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
                  console.log(res.data);
                })
                .catch((err) => console.log(err));
              history.push(routes.course(props.courseId));
            }}
          >
            {() => (
              <Form>
                <Button variant="primary" type="submit">
                  Ir a curso
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Col>
  );
}
