import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import registeredConsultantService from "../../services/registeredConsultant.service";
import RegisteredConsultant from "../../types/registeredConsultant.type";

type Props = { modalId: string };

export const ModalRegister = (props: Props) => {
  const [userNameValid, setUserNameValid] = useState(true);
  const [consultantsList, setConsultantsList] = useState(
    [] as RegisteredConsultant[]
  );

  const defaultValues = {
    representativename: "",
    username: "",
    emailGE: "",
    password: "",
    nameGE: "",
    currentConsultant: "",
  };
  const modalLabel = "modal-login-label";

  const handleSubmit = async (values: any) => {
    const newGE = {
      name: values.representativename,
      username: values.username,
      email: values.emailGE,
      password: values.password,
      nombre: values.nameGE,
      consultor_id: Number(values.currentConsultant),
    };
    const dataReg = await AuthService.registerGE(newGE);
    alert(dataReg.data.message);
    window.location.reload();
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.representativename) {
      errors.representativename = "Nombre del reprentante legal es requerido";
    }

    if (!values.username) {
      errors.username = "Nombre de usuario requerido";
    } else if (
      !/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
        values.username
      )
    ) {
      errors.username = "Nombre de usuario inválido";
    }

    if (!values.emailGE) {
      errors.emailGE = "Correo electrónico requerido";
    }

    if (!values.password) {
      errors.password = "Contraseña requerida";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)
    ) {
      errors.password = "Contraseña inválida";
    }

    if (!values.nameGE) {
      errors.nameGE = "Nombre de la Grupo-Empresa requerido";
    }

    if (!values.currentConsultant) {
      errors.currentConsultant = "Elija un consultor TIS";
    }
    return errors;
  };

  const getConsultants = async () => {
    let consultant = await registeredConsultantService.getConsultants();
    setConsultantsList(consultant.data);
  };

  useEffect(() => {
    getConsultants();
  }, []);

  return (
    <div
      className="modal fade"
      id={props.modalId}
      tabIndex={-1}
      aria-labelledby={modalLabel}
      aria-hidden={true}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-dark">
            <h5 className="modal-title text-white" id={modalLabel}>
              Registro
            </h5>
            <button
              type="button"
              className="bg-dark btn text-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="fa fa-times fs-4"></i>
            </button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={defaultValues}
              onSubmit={handleSubmit}
              validate={validate}
            >
              <Form>
                <div className="form-group row mb-3">
                  <label htmlFor="representativename" className="form-label">
                    Nombre del representante legal:
                  </label>
                  <div className="col-12">
                    <Field
                      id="representativename"
                      className="form-control"
                      name="representativename"
                      placeholder="Nombre del representante legal de la Grupo-Empresa"
                    />
                  </div>
                  <div className="col-12 text-danger">
                    <ErrorMessage name="representativename" />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="username" className="form-label">
                    Nombre de usuario:
                  </label>
                  <div className="col-12">
                    <Field
                      id="username"
                      className="form-control"
                      name="username"
                      placeholder="Nombre de usuario"
                    />
                  </div>
                  <div className="col-12 text-danger">
                    <ErrorMessage name="username" />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="emailGE" className="form-label">
                    Email:
                  </label>
                  <div className="col-12">
                    <Field
                      id="emailGE"
                      type="email"
                      className="form-control"
                      name="emailGE"
                      placeholder="Nombre de usuario"
                    />
                  </div>
                  <div className="col-12 text-danger">
                    <ErrorMessage name="emailGE" />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña:
                  </label>
                  <div className="col-12">
                    <Field
                      id="password"
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Contraseña"
                    />
                  </div>
                  <div className="col-12 text-danger">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label htmlFor="nameGE" className="form-label">
                    Nombre de la Grupo-Empresa:
                  </label>
                  <div className="col-12">
                    <Field
                      id="nameGE"
                      className="form-control"
                      name="nameGE"
                      placeholder="Nombre de usuario"
                    />
                  </div>
                  <div className="col-12 text-danger">
                    <ErrorMessage name="nameGE" />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <div className="col-12">
                    <Field
                      as="select"
                      className="form-select"
                      name="currentConsultant"
                    >
                      <option value="">Seleccionar consultor TIS</option>
                      {consultantsList.map((consultant) => (
                        <option key={consultant.id} value={consultant.id}>
                          {consultant.nombre}
                        </option>
                      ))}
                    </Field>
                    <div className="col-12 text-danger">
                      <ErrorMessage name="currentConsultant" />
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-info text-light" type="submit">
                    Registrar Grupo-Empresa
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
