import React, { Component } from "react";

type Props = {};
type State = {
  titulo: string;
  codigoPliego: string;
  codigoConvocatoria: string;
  documentoPliego: string;
};

type ChangeElement = React.ChangeEvent<HTMLInputElement>;

export default class PetisForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      titulo: "",
      codigoPliego: "",
      codigoConvocatoria: "",
      documentoPliego: "",
    };
  }

  handleTitulo(event: ChangeElement) {
    this.setState({ titulo: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <h1>Formulario de registro de pliego de especificación</h1>
        <form>
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
        </form>
      </div>
    );
  }
}
