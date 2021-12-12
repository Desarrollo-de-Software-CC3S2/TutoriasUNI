import * as Yup from "yup";

const DocumentSchema = Yup.object().shape({
  link: Yup.string().required("Completar este campo"),
  tipo: Yup.string()
    .oneOf(
      ["video", "documento"],
      "Debe elegir una opcion"
    )
    .required("Completar este campo"),
});

export default DocumentSchema;