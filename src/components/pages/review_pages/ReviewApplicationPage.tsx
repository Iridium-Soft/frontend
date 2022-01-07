import React, { Component } from "react";

import ApplicationReviewDataService from "../../../services/applicationReview.service";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Box,
} from "@mui/material";

type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type Props = {};

type State = {
  nombreGrupoEmpresa: string;
  documentos: Array<any>;
  indiceDocumentoActual: number;
  documentoActual: any;
  documentoBase64: string;
  seccion: string;
  descripcion: string;
  observaciones: Array<any>;

  open: boolean;
  message: string;
};

export default class ReviewApplicationPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      nombreGrupoEmpresa: "",
      documentos: [],
      indiceDocumentoActual: 0,
      documentoActual: {},
      documentoBase64: "",
      seccion: "",
      descripcion: "",
      observaciones: [],

      open: false,
      message: "",
    };

    this.getDocument = this.getDocument.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.retrieveFirstData = this.retrieveFirstData.bind(this);
    this.handleSeccion = this.handleSeccion.bind(this);
    this.addObservation = this.addObservation.bind(this);
    this.deleteObservation = this.deleteObservation.bind(this);
  }

  componentDidMount() {
    this.retrieveFirstData();
  }

  retrieveFirstData() {
    ApplicationReviewDataService.get(localStorage.getItem("idPostulacion") + "")
      .then((response) => {
        this.setState({
          nombreGrupoEmpresa: response.data.nombreGP,
          documentos: response.data.documentos,
          indiceDocumentoActual: 0,
          documentoActual: response.data.documentos[0],
        });
        this.getDocument(0);
        const obs: Array<any> = [];
        this.state.documentos.map((doc: any) => {
          doc.observaciones.map((ob: any) => {
            obs.push({
              documento: doc.nombreDocumento,
              idDocumento: doc.idDocumento,
              observacion: ob,
            });
          });
        });
        this.setState({ observaciones: obs });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveData() {
    ApplicationReviewDataService.get(localStorage.getItem("idPostulacion") + "")
      .then((response) => {
        this.setState({
          nombreGrupoEmpresa: response.data.nombreGP,
          documentos: response.data.documentos,
        });
        const obs: Array<any> = [];
        this.state.documentos.map((doc: any) => {
          doc.observaciones.map((ob: any) => {
            obs.push({
              documento: doc.nombreDocumento,
              idDocumento: doc.idDocumento,
              observacion: ob,
            });
          });
        });
        this.setState({ observaciones: obs });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //-1, 0, 1
  getDocument(n: number) {
    const index = this.state.indiceDocumentoActual + n;
    ApplicationReviewDataService.obtenerDocumento(
      this.state.documentos[index].rutaDocumento
    )
      .then((response) => {
        this.setState({
          documentoBase64: response.data,
          indiceDocumentoActual: index,
          documentoActual: this.state.documentos[index],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleSeccion(event: ChangeElement) {
    this.setState({
      seccion: event.target.value,
    });
  }

  addObservation() {
    if (this.state.seccion === "" || this.state.descripcion === "") {
      this.setState({
        message: "Todos los campos deben estar llenos",
        open: true,
      });
      return;
    } else if (!/[a-zA-Z0-9.]+/.test(this.state.seccion)) {
      this.setState({
        message: "El campo Seccion esta llenado incorrectamente",
        open: true,
      });
      return;
    } else if (!/[a-zA-Z0-9.]+/.test(this.state.descripcion)) {
      this.setState({
        message: "El campo Descripcion esta llenado incorrectamente",
        open: true,
      });
      return;
    }

    ApplicationReviewDataService.registerObservation({
      idDoc: this.state.documentoActual.idDocumento,
      seccion: this.state.seccion,
      descripcion: this.state.descripcion,
      revisado: false,
      corregido: false,
    }).then((response) => {
      this.setState({
        seccion: "",
        descripcion: "",
        message: "Se registro exitosamente la observacion",
        open: true,
      });
    });
    this.retrieveData();
  }
  
  deleteObservation(valu: number) {
    ApplicationReviewDataService.deleteObservation(valu + "").then(
      (response) => {
        this.setState({
          message: "Se ha eliminado correctamente",
          open: true,
        });
        this.retrieveData();
      }
    );
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

    const observations: Array<any> = this.state.observaciones;

    return (
      <>
        <div
          className="modal fade"
          id="asd"
          tabIndex={-1}
          aria-labelledby={`labelasd`}
          role="dialog"
          aria-hidden={true}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  ¿Está seguro de que termino el registro de su revision?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <p className="container-fluid">
                En base a sus datos registrados se registrara una{" "}
                <strong>
                  {this.state.observaciones.length === 0
                    ? "NOTIFICACION DE CONFORMIDAD"
                    : "ORDEN DE CAMBIO"}
                </strong>
              </p>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger text-white"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-success text-white"
                  onClick={async () => {
                    await ApplicationReviewDataService.sendReview(
                      Number(localStorage.getItem("idPostulacion") + ""),
                      {
                        orden_cambio:
                          this.state.observaciones.length === 0 ? 0 : 1,
                      }
                    );
                    window.location.assign("/announcements_list");
                  }}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-3 position-relative">
          <h3 className="row border-bottom border-dark">
            <div className="col-5">
              <h3 className="align-middle">Revision de postulacion</h3>
            </div>
            <div className="col-4">
              <h4 className="mt-2">Nombre: {this.state.nombreGrupoEmpresa}</h4>
            </div>
            <div className="col-3">
              <button
                className="btn-lg mb-2 col-12 btn-info text-white"
                data-bs-toggle="modal"
                data-bs-target={`#asd`}
              >
                Terminar revision
              </button>
            </div>
          </h3>
          <div className="row mb-2">
            <div className="col-5">
              <h4 className="mt-2">
                {this.state.documentoActual?.nombreDocumento}
              </h4>
            </div>
            <div className="col-2 mt-2 ms-5">
              <button
                className={`btn ${
                  this.state.indiceDocumentoActual === 0 ? "d-none" : ""
                }`}
                onClick={() => {
                  this.getDocument(-1);
                }}
              >
                <i className="fa fa-chevron-left fs-4"></i>
              </button>
              <button
                className={`btn ms-5 ${
                  this.state.indiceDocumentoActual ===
                  this.state.documentos.length - 1
                    ? "d-none"
                    : ""
                }`}
                onClick={() => {
                  this.getDocument(1);
                }}
              >
                <i className="fa fa-chevron-right fs-4"></i>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-7">
              <iframe
                title="no"
                src={`data:application/pdf;base64,${this.state.documentoBase64}`}
                style={{ width: "100%", height: "690px" }}
              ></iframe>
            </div>
            <div className="col-5">
              <div className="row mb-4">
                <div className="col-3 fs-5">Seccion:</div>
                <div className="col-7">
                  <input
                    className="col-12"
                    type="text"
                    value={this.state.seccion}
                    onChange={this.handleSeccion}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-12 fs-5 mb-3">Observacion:</div>
                <div className="col-12">
                  <textarea
                    className="col-12"
                    style={{ height: "100px", resize: "none" }}
                    value={this.state.descripcion}
                    onChange={(e) => {
                      this.setState({
                        descripcion: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-4 offset-9">
                  <button
                    className="btn btn-info text-white"
                    onClick={this.addObservation}
                  >
                    Registrar
                  </button>
                </div>
              </div>
              <div
                className="row border border-dark"
                style={{ height: "400px" }}
              >
                <span className="col-12">
                  <TableContainer style={{ height: "400px" }}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="col-2">
                            <strong>Documento</strong>
                          </TableCell>
                          <TableCell className="col-2">
                            <strong>Seccion</strong>
                          </TableCell>
                          <TableCell className="col-8">
                            <strong>Descripcion</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {observations &&
                          observations.map((ob: any) => {
                            return (
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  {ob.documento}
                                </TableCell>
                                <TableCell>
                                  {ob.observacion.seccionDoc}
                                </TableCell>
                                <TableCell width="15px">
                                  {ob.observacion.descripcion}
                                </TableCell>
                                <TableCell>
                                  <button
                                    className="btn"
                                    onClick={() => {
                                      this.deleteObservation(ob.observacion.id);
                                    }}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </span>
              </div>
            </div>
          </div>
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
