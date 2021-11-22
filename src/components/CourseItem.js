import { Card, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import routes from "../helpers/routes";
import useAuth from "../auth/useAuth";
import roles from "../helpers/roles";

export default function CourseItem(props) {
  const { user } = useAuth();
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle>Codigo</Card.Subtitle>
          <Card.Text
            style={{ display: user?.role === roles.alumno ? "" : "none" }}
          >
            Tema: {props.tema} <br />
            Profesor: {props.tutor}
          </Card.Text>
          <Card.Text
            style={{ display: user?.role === roles.tutor ? "" : "none" }}
          >
            Tema: {props.tema}
          </Card.Text>
          <Button as={NavLink} to={routes.course(props.courseId)}>
            Ir a curso
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
