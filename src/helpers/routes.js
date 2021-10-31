const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  courses: "/courses",
  course: (courseId) => (courseId ? `/courses/:${courseId}` : "/courses/:courseId"),
  admin: {
    users: "/admin/users"
  }
};

export default routes;