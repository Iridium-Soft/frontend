import React, { Component } from "react";
import AnnouncementDataService from "../services/announcement.service";
import AnnouncementData from "../types/announcement.type";

type FormElement = React.FormEvent<HTMLFormElement>;
type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type Props = {};

export default class AnnouncementsForm extends Component<
  Props,
  AnnouncementData
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      id: 8,
      titulo: "",
      encargado: "Leticia Blanco",
      codigo: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitulo = this.handleTitulo.bind(this);
    this.handleCodigo = this.handleCodigo.bind(this);
  }

  handleTitulo(event: ChangeElement) {
    this.setState({
      id: this.state.id,
      titulo: event.target.value,
      encargado: this.state.encargado,
      codigo: this.state.codigo,
    });
  }

  handleCodigo(event: ChangeElement) {
    this.setState({
      id: this.state.id,
      titulo: this.state.titulo,
      encargado: this.state.encargado,
      codigo: event.target.value,
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
