import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CoursesPage from "../pages/CoursesPage";
import CoursePage from "../pages/CoursePage";
import UsersPage from "../pages/admin/UsersPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import roles from "../helpers/roles";
import routes from "../helpers/routes";

export default function AppRouter() {
  return (
    <Switch>
      <PublicRoute exact path={routes.home} component={HomePage} />
      <PublicRoute exact path={routes.login} component={LoginPage} />
      <PublicRoute exact path={routes.register} component={RegisterPage} />
      <PrivateRoute exact path={routes.courses} component={CoursesPage} />
      <PrivateRoute exact path={routes.course()} component={CoursePage} />
      <PrivateRoute
        hasRole={roles.admin}
        exact
        path="/admin/users"
        component={UsersPage}
      />

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}
