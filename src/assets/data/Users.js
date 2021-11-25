import roles from "../../helpers/roles";

const users = [
  {
    _id: 1,
    rol: roles.alumno,
    name: "Alumno",
    lastname: "1",
    cursos: [1, 2, 3, 4, 5, 6],
  },
  {
    _id: 1,
    rol: roles.tutor,
    name: "Tutor",
    lastname: "1",
    cursos: [1, 2, 3],
  },
];

export default users;
