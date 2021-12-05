import * as Yup from "yup";


const CourseSchema = Yup.object().shape({
  nombre: Yup.string().required("Completar este campo"),
  tema: Yup.string(),
});

export default CourseSchema;