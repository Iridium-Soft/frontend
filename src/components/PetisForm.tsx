import React, { Component } from "react";
import AnnouncementDataService from "../services/announcement.service";
import PetisDataService from "../services/petis.service";
import AnnouncementData from "../types/announcement.type";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

type Props = {};
type State = {
  titulo: string;
  codigoPliego: string;
  codigoConvocatoria: string;
  documentoPliego: string;

  announcements: Array<AnnouncementData>;

  file: any;
  base64URL: any;

  open: boolean;
  message: string;
};

type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type FormElement = React.FormEvent<HTMLFormElement>;

export default class PetisForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      titulo: "",
      codigoPliego: "",
      codigoConvocatoria: "",
      documentoPliego: "",

      announcements: [],

      file: null,
      base64URL: null,

      open: false,
      message: "",
    };

    this.handleTitulo = this.handleTitulo.bind(this);
    this.handleCodigoPliego = this.handleCodigoPliego.bind(this);
    this.handleSubirPliego = this.handleSubirPliego.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.retrieveAnnouncements();
  }

  retrieveAnnouncements() {
    AnnouncementDataService.getAllSinPliego()
      .then((response) => {
        this.setState({
          announcements: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleTitulo(event: ChangeElement) {
    this.setState({ titulo: event.target.value });
  }

  handleCodigoPliego(event: ChangeElement) {
    this.setState({ codigoPliego: event.target.value });
  }

  getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let baseURL: any = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  handleSubirPliego(e: any) {
    let { file } = this.state;
    file = e.target.files[0];
    this.getBase64(file)
      .then((result) => {
        file["base64"] = result;
        this.setState({
          base64URL: result,
          file,
        });
        this.setState({
          documentoPliego: this.state.base64URL,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0],
    });
  }

  handleSubmit(e: FormElement) {
    e.preventDefault();
    if (!/[a-zA-Z]+/.test(this.state.titulo)) {
      this.setState({
        message: "Llene correctamente los campos. Título incorrecto",
        open: true,
      });
      return;
    } else if (
      /\s+/g.test(this.state.codigoPliego) ||
      this.state.codigoPliego === ""
    ) {
      this.setState({
        message: "Llene correctamente los campos. Código incorrecto",
        open: true,
      });
      return;
    } else if (this.state.codigoConvocatoria === "") {
      this.setState({
        message: "Llene correctamente los campos. Elija una convocatoria.",
        open: true,
      });
      return;
    } else if (this.state.file === null) {
      this.setState({
        message: "Llene correctamente los campos. Suba un archivo",
        open: true,
      });
      return;
    }
    PetisDataService.create({
      titulo: this.state.titulo,
      codigo: this.state.codigoPliego,
      convocatoria_id: this.state.codigoConvocatoria,
      documento: this.state.documentoPliego,
      publica: false,
    });
    this.setState({
      message: "Registro de Pliego de Especificación exitoso",
      open: true,
    });
    this.setState({
      titulo: "",
      codigoPliego: "",
      codigoConvocatoria: "",
      documentoPliego: "",
    });
  }

  render() {
    const closeSnackbar = (
      event: React.SyntheticEvent | React.MouseEvent,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ open: false });
    };

    const actionCloseSnackbar = (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackbar}
      >
        <span aria-hidden="true">&times;</span>
      </IconButton>
    );

    return (
      <>
        <div
          className="modal fade"
          id="popupCancelModalPetis"
          tabIndex={-1}
          aria-hidden={true}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  ¿Está seguro de cancelar el registro de pliego de
                  especificación?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h1>Formulario de registro de Pliego de Especificación</h1>
          <form onSubmit={this.handleSubmit} method="post" noValidate>
            <div className="form-group row m-3">
              <label htmlFor="tituloPliego" className="col-md-2 col-form-label">
                Título
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="tituloPliego"
                  name="tituloPliego"
                  placeholder="Título"
                  value={this.state.titulo}
                  onChange={this.handleTitulo}
                  required
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="codigoPliego" className="col-md-2 col-form-label">
                Código
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="codigoPliego"
                  name="codigoPliego"
                  placeholder="Código"
                  value={this.state.codigoPliego}
                  onChange={this.handleCodigoPliego}
                  required
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label
                htmlFor="codigoConvocatoria"
                className="col-md-2 col-form-label"
              >
                Convocatoria asociada
              </label>
              <div className="col-md-10">
                <select
                  className="form-select form-select-lg"
                  value={this.state.codigoConvocatoria}
                  onChange={(e) => {
                    this.setState({ codigoConvocatoria: e.target.value });
                  }}
                  id="codigoConvocatoria"
                  name="codigoConvocatoria"
                >
                  <option value="" selected>
                    Seleccione la convocatoria
                  </option>
                  {this.state.announcements.map(
                    (announcement: AnnouncementData) => (
                      <option value={announcement.codigo}>
                        {announcement.titulo}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="form-group row m-3">
              <label
                htmlFor="subirPdfPliego"
                className="col-md-2 col-form-label"
              >
                Subir PDF
              </label>
              <div className="col-md-10">
                <input
                  type="file"
                  accept=".pdf"
                  className="form-control"
                  id="subirPdfPliego"
                  name="subirPdfPliego"
                  onChange={this.handleSubirPliego}
                  required
                />
              </div>
            </div>
            <div className="form-group row m-3 d-flex justify-content-end">
              <div className="col-1">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#popupCancelModalPetis"
                >
                  Cancelar
                </button>
              </div>
              <div className="col-1">
                <button type="submit" className="btn btn-success">
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          message={this.state.message}
          action={actionCloseSnackbar}
        />
      </>
    );
  }
}
