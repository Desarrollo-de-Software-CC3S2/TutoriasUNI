import roles from "../../helpers/roles";

const users = [
  {
    userId: 1,
    role: roles.alumno,
    nombre: "Alumno",
    apellido: "1",
    cursos: [1, 2, 3, 4, 5, 6],
  },
  {
    userId: 1,
    role: roles.tutor,
    nombre: "Tutor",
    apellido: "1",
    cursos: [1, 2, 3],
  },
];

export default users;
