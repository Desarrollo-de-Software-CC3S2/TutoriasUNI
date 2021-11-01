import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

export default function Navigation() {
  const { logout } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
      <Navbar.Brand as={NavLink} to={routes.home}>
        TutoriasUNI
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to={routes.admin.users}>
            Users
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={NavLink} to={routes.login}>
            Iniciar Sesión
          </Nav.Link>
          <Nav.Link as={NavLink} to={routes.register}>
            Registrarse
          </Nav.Link>
          <Nav.Link as={NavLink} to={routes.courses}>
            Mi cuenta
          </Nav.Link>
          <Nav.Link to={routes.login} onClick={logout}>
            Cerrar Sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
