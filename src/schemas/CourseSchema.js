import * as Yup from "yup";

const CourseSchema = Yup.object().shape({
  nombre: Yup.string().required("Completar este campo"),
  tema: Yup.string()
    .oneOf(
      ["Matematica", "Computacion", "Fisica", "Quimica", "Idiomas", "Letras"],
      "Debe elegir una opcion"
    )
    .required("Completar este campo"),
});

export default CourseSchema;
