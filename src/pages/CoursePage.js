import { Container, Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CourseData from "../assets/data/Cursos";

export default function CoursePage() {
  const { courseId } = useParams();
  let CourseInfo = CourseData.filter((item) => item.id === Number(courseId));
  console.log(CourseInfo[0].id);
  const array = [0, 1, 2, 3, 4, 5, 6];
  return (
    <div style={{ display: "flex", margin: "2rem" }}>
      <Container>
        <h1>{CourseInfo[0].name}</h1>
        <Accordion defaultActiveKey="0" flush>
          {array.map((item) => (
            <Accordion.Item eventKey={String(item)}>
              <Accordion.Header>Accordion Item #{item}</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}
