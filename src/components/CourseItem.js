import { Card, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import routes from "../helpers/routes";

export default function CourseItem(props) {
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle>Codigo</Card.Subtitle>
          <Card.Text>
            Tema: {props.tema} <br/>
            Profesor: {props.tutor}
          </Card.Text>
          <Button as={NavLink} to={routes.course(props.courseId)}>Ir a curso</Button>
        </Card.Body>
      </Card>
    </Col>
  )
}
