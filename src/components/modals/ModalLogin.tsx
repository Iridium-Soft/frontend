import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import AuthService from "../../services/auth.service";

type Props = { modalId: string };

export const ModalLogin = (props: Props) => {
  const [userNameValid, setUserNameValid] = useState(true);

  const defaultValues = { username: "", password: "" };
  const modalLabel = "modal-login-label";

  const handleSubmit = async (values: any) => {
    let validUserName = await AuthService.login(values);
    if (validUserName) {
      setUserNameValid(true);
      window.location.reload();
    } else {
      setUserNameValid(false);
    }
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.username) {
      errors.username = "Nombre de usuario requerido";
    } else if (
      !/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
        values.username
      )
    ) {
      errors.username = "Nombre de usuario inválido";
    }

    if (!values.password) {
      errors.password = "Contraseña requerida";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)
    ) {
      errors.password = "Contraseña inválida";
    }

    return errors;
  };

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
              Iniciar sesión
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
                <div className="form-group row justify-content-center mb-3">
                  {!userNameValid && (
                    <div className="col-auto text-danger">
                      Nombre de usuario o contraseña incorrectos
                    </div>
                  )}
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-info text-light" type="submit">
                    Iniciar sesión
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
