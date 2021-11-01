import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../auth/useAuth";
import roles from "../helpers/roles";
import routes from "../helpers/routes";

export default function Navigation() {
  const { logout, user, isLogged } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
      <Navbar.Brand as={NavLink} to={routes.home}>
        TutoriasUNI
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            as={NavLink}
            to={routes.admin.users}
            style={{ display: user?.role === roles.admin ? "" : "none" }}
          >
            Users
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            as={NavLink}
            to={routes.login}
            style={{ display: isLogged() === false ? "" : "none" }}
          >
            Iniciar Sesión
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to={routes.register}
            style={{ display: isLogged() === false ? "" : "none" }}
          >
            Registrarse
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to={routes.courses}
            style={{ display: isLogged() === true ? "" : "none" }}
          >
            Mi cuenta
          </Nav.Link>
          <Nav.Link
            to={routes.login}
            onClick={logout}
            style={{ display: isLogged() === true ? "" : "none" }}
          >
            Cerrar Sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
