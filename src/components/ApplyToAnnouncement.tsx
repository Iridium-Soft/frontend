import React, { Component } from "react";
import AnnouncementDataService from "../services/announcement.service";
import AnnouncementData from "../types/announcement.type";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

type Props = {};
type State = {
  announcements: Array<AnnouncementData>;
  announcementSelected: string;
  currentAnnouncement: AnnouncementData;
  open: boolean;
  message: string;
};

type FormElement = React.FormEvent<HTMLFormElement>;
type ChangeElement = React.ChangeEvent<HTMLInputElement>;

export default class ApplyToAnnouncement extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      announcements: [],
      announcementSelected: "",
      currentAnnouncement: {
        id: "",
        titulo: "",
        encargado: "Leticia Blanco",
        codigo: "",
        descripcion: "",
        fechaLimRec: "",
        fechaIniDur: "",
        fechaFinDur: "",
        documento: "",
        publica: false,
      },

      open: false,
      message: "",
    };

    this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.retrieveAnnouncements();
  }

  retrieveAnnouncements() {
    AnnouncementDataService.getAll()
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

  handleSubmit(e: FormElement) {
    e.preventDefault();
    if (this.state.announcementSelected === "") {
      this.setState({
        message: "No existe ninguna convocatoria seleccinada",
        open: true,
      });
      return;
    }
    this.setState({
      currentAnnouncement: this.state.announcements.filter(
        (announcement: AnnouncementData) =>
          announcement.id === Number(this.state.announcementSelected)
      )[0],
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
          id="confirmApplyModal"
          tabIndex={-1}
          aria-hidden={true}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  ¿Usted como grupo-empresa GRUPOEMPRESA desea postular a la
                  convocatoria "
                  {this.state.currentAnnouncement !== null
                    ? this.state.currentAnnouncement.titulo
                    : ""}
                  "?
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
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    if (
                      new Date() >
                      new Date(this.state.currentAnnouncement.fechaLimRec)
                    ) {
                      this.setState({
                        message:
                          "Aplicación fuera de rango de fechas de postulación",
                        open: true,
                      });
                    } else {
                      this.setState({
                        message:
                          "Usted GRUPOEMPRESA ha aplicado correctamente, puede proceder a llenar los documentos de la postulación.",
                        open: true,
                      });
                    }
                  }}
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h1>Aplicar a una convocatoria</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <select
                className="form-select form-select-lg mb-3"
                value={this.state.announcementSelected}
                onChange={(e) => {
                  this.setState({ announcementSelected: e.target.value });
                }}
              >
                <option value="" selected>
                  Seleccione la convocatoria a la que desea aplicar
                </option>
                {this.state.announcements.map(
                  (announcement: AnnouncementData) => (
                    <option value={announcement.id}>
                      {announcement.titulo} | {announcement.codigo}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="form-group row mt-5">
              <div className="col-12">
                <button type="button" className="btn btn-danger">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-success ms-3"
                  data-bs-toggle={
                    this.state.announcementSelected !== "" ? "modal" : ""
                  }
                  data-bs-target={
                    this.state.announcementSelected !== ""
                      ? "#confirmApplyModal"
                      : "#"
                  }
                >
                  Aplicar
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
