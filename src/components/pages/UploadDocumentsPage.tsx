import React, { Component } from "react";
import UploadDocument from "../UploadDocument";
import "../UploadDocument.css";
import DocumentsDataService from "../../services/documents.service";
import DocumentData from "../../types/documents.type";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import AuthService from "../../services/auth.service";

type Props = {};

type State = {
  parteA: string;
  boletaDeGarantia: string;
  cartaDePresentacion: string;
  constitucion: string;
  parteB: string;
  mensaje: string;
  correct: boolean;
};

export default class UploadDocumentsPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      parteA: "",
      boletaDeGarantia: "",
      cartaDePresentacion: "",
      constitucion: "",
      parteB: "",
      mensaje: "",
      correct: false,
    };

    this.retrieveDocuments = this.retrieveDocuments.bind(this);
    this.handlePartA = this.handlePartA.bind(this);
    this.handleBoleta = this.handleBoleta.bind(this);
    this.handleCarta = this.handleCarta.bind(this);
    this.handleConstitucion = this.handleConstitucion.bind(this);
    this.handlePartB = this.handlePartB.bind(this);
    this.uploadDocuments = this.uploadDocuments.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  retrieveDocuments() {
    DocumentsDataService.getAll()
      .then((response) => {
        this.setState({
          parteA: response.data.parteA,
          boletaDeGarantia: response.data.boletaDeGarantia,
          cartaDePresentacion: response.data.cartaDePresentacion,
          constitucion: response.data.constitucion,
          parteB: response.data.parteB,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  uploadDocuments() {
    const {
      parteA,
      boletaDeGarantia,
      cartaDePresentacion,
      constitucion,
      parteB,
    } = this.state;
    const variable = {
      parteA: parteA,
      boletaDeGarantia: boletaDeGarantia,
      cartaDePresentacion: cartaDePresentacion,
      constitucion: constitucion,
      parteB: parteB,
    };
    console.log(variable);
    DocumentsDataService.create(variable, AuthService.getCurrentUser().id);

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  handlePartA = (childData: string) => {
    this.setState({ parteA: childData });
  };

  handleBoleta = (childData: string) => {
    this.setState({ boletaDeGarantia: childData });
  };

  handleCarta = (childData: string) => {
    this.setState({ cartaDePresentacion: childData });
  };

  handleConstitucion = (childData: string) => {
    this.setState({ constitucion: childData });
  };

  handlePartB = (childData: string) => {
    this.setState({ parteB: childData });
  };

  checkFields() {
    const {
      parteA,
      boletaDeGarantia,
      cartaDePresentacion,
      constitucion,
      parteB,
    } = this.state;
    const result: boolean = !!(
      parteA &&
      boletaDeGarantia &&
      cartaDePresentacion &&
      constitucion &&
      parteB
    );
    this.setState({
      correct: true,
      mensaje: result
        ? "Registro de convocatoria exitoso"
        : "Procure ingresar todos los documentos",
    });
    return result;
  }

  closeSnackbar(
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      correct: false,
    });
  }

  render() {
    const actionCloseSnackbar = (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={this.closeSnackbar}
      >
        <span aria-hidden="true">&times;</span>
      </IconButton>
    );
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
                  ¿Está seguro de cancelar la el registro de su planificacion?
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
                  className="btn btn-secondary text-white"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-info text-white"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-3 position-relative">
          <div className="row">
            <h3 className="col-8">Documentos</h3>
          </div>
          <div className="row mx-0 mb-2">
            <h5 className="col-12 offset-1">Parte A</h5>
            <div className="col-4 offset-2 mt-2">
              <UploadDocument
                name="Parte A"
                parentCallback={this.handlePartA}
              />
            </div>
            <div className="col-4 offset-2 mt-2">
              <UploadDocument
                name="Boleta de garantia"
                parentCallback={this.handleBoleta}
              />
            </div>
            <div className="col-4 offset-2 mt-4">
              <UploadDocument
                name="Carta de presentacion"
                parentCallback={this.handleCarta}
              />
            </div>
            <div className="col-4 offset-2 mt-4">
              <UploadDocument
                name="Constitucion"
                parentCallback={this.handleConstitucion}
              />
            </div>
          </div>
          <div className="row mx-0 mb-2 mt-4">
            <h5 className="col-12 offset-1">Parte B</h5>
            <div className="col-4 offset-2 mt-2">
              <UploadDocument
                name="Parte B"
                parentCallback={this.handlePartB}
              />
            </div>
          </div>
          <div className="row mx-0 mb-2 mt-4">
            <div className="row">
              <div className="col-2 offset-5"></div>
              <div
                className="col-2 btn btn-danger text-white m-1"
                data-bs-toggle="modal"
                data-bs-target={`#asd`}
              >
                Cancelar
              </div>
              <button
                className="col-2 ms-5 btn btn-success m-1"
                onClick={() =>
                  this.checkFields() ? this.uploadDocuments() : null
                }
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
        <Snackbar
          open={this.state.correct}
          autoHideDuration={6000}
          onClose={this.closeSnackbar}
          message={this.state.mensaje}
          action={actionCloseSnackbar}
        />
      </>
    );
  }
}
