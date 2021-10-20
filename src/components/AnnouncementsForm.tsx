import React, { Component } from "react";
import AnnouncementDataService from "../services/announcement.service";
import AnnouncementData from "../types/announcement.type";

type FormElement = React.FormEvent<HTMLFormElement>;
type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type Props = {};
type State = {
  id?: any | null;
  titulo: string;
  encargado: string;
  codigo: string;
  descripcion: string;
  fechaLimRec: string;
  fechaIniDur: string;
  fechaFinDur: string;
  documento: string;
  publica: boolean;

  file: any;
  base64URL: any;
};

export default class AnnouncementsForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
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

      file: null,
      base64URL: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitulo = this.handleTitulo.bind(this);
    this.handleCodigo = this.handleCodigo.bind(this);
    this.handleFechaLimRec = this.handleFechaLimRec.bind(this);
    this.handleFechaIniDur = this.handleFechaIniDur.bind(this);
    this.handleFechaFinDur = this.handleFechaFinDur.bind(this);
    this.handleSubirConvocatoria = this.handleSubirConvocatoria.bind(this);
  }

  handleTitulo(event: ChangeElement) {
    this.setState({
      titulo: event.target.value,
    });
  }

  handleCodigo(event: ChangeElement) {
    this.setState({
      id: event.target.value,
      codigo: event.target.value,
    });
  }

  handleFechaLimRec(event: ChangeElement) {
    this.setState({
      fechaLimRec: event.target.value,
    });
  }

  handleFechaIniDur(event: ChangeElement) {
    this.setState({
      fechaIniDur: event.target.value,
    });
  }

  handleFechaFinDur(event: ChangeElement) {
    this.setState({
      fechaFinDur: event.target.value,
    });
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

  handleSubirConvocatoria(e: any) {
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
          documento: this.state.base64URL,
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
    AnnouncementDataService.create(this.state);
    alert("Convocatoria guardada");
    //console.log(this.state);
  }

  actionBtnCancel() {
    const option = window.confirm(
      "¿Está seguro de cancelar el registro de convocatoria?"
    );
    console.log(option);
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row mt-5">
            <h1>Formulario de registro de convocatoria</h1>
          </div>
          <form onSubmit={this.handleSubmit} method="post">
            <div className="form-group row m-3">
              <label htmlFor="titulo" className="col-md-2 col-form-label">
                Título
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="titulo"
                  placeholder="Título"
                  value={this.state.titulo}
                  onChange={this.handleTitulo}
                  required
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="codigo" className="col-md-2 col-form-label">
                Código
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="codigo"
                  name="codigo"
                  placeholder="Código"
                  value={this.state.codigo}
                  onChange={this.handleCodigo}
                  required
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="descripcion" className="col-md-2 col-form-label">
                Descripción
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  id="descripcion"
                  name="descripcion"
                  rows={6}
                  value={this.state.descripcion}
                  onChange={(e) =>
                    this.setState({ descripcion: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="fechaLimite" className="col-md-5 col-form-label">
                Fecha límite de recepción de propuesta
              </label>
              <div className="col-md-7">
                <input
                  type="date"
                  className="form-control"
                  id="fechaLimite"
                  name="fechaLimite"
                  value={this.state.fechaLimRec}
                  onChange={this.handleFechaLimRec}
                  required
                />
              </div>
            </div>
            <label className="col-md-12 col-form-label d-flex justify-content-center">
              <h5>Fechas de duración del contrato</h5>
            </label>
            <div className="form-group row m-3">
              <label htmlFor="fechaInicio" className="col-md-5 col-form-label">
                Inicio
              </label>
              <div className="col-md-7">
                <input
                  type="date"
                  className="form-control"
                  id="fechaInicio"
                  name="fechaInicio"
                  value={this.state.fechaIniDur}
                  onChange={this.handleFechaIniDur}
                  required
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="fechaFin" className="col-md-5 col-form-label">
                Fin
              </label>
              <div className="col-md-7">
                <input
                  type="date"
                  className="form-control"
                  id="fechaFin"
                  name="fechaFin"
                  value={this.state.fechaFinDur}
                  onChange={this.handleFechaFinDur}
                  required
                />
              </div>
            </div>
            <div className="form-group row m-3">
              <label htmlFor="subirPdf" className="col-md-2 col-form-label">
                Subir PDF
              </label>
              <div className="col-md-10">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="form-control"
                  id="subirPdf"
                  name="subirPdf"
                  onChange={this.handleSubirConvocatoria}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-md-12 m-3 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => this.actionBtnCancel()}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}
