import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Completar este campo"),
  lastname: Yup.string().required("Completar este campo"),
  email: Yup.string()
    .email("Formato invalido para correo")
    .required("Completar este campo"),
  password: Yup.string()
    .min(6, "Contraseña debe tener almenos 6 caracteres")
    .required("Completar este campo"),
  confirmpass: Yup.string()
    .min(6, "Contraseña debe tener almenos 6 caracteres")
    .required("Completar este campo"),
});

export default RegisterSchema;
