import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato invalido para correo")
    .required("Completar este campo"),
  password: Yup.string()
    .min(6, "Contraseña debe tener almenos 6 caracteres")
    .required("Completar este campo"),
});

export default LoginSchema;
