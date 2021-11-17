import React, { Component } from "react";
import ChangeOrderDataService from "../services/changeOrder.service";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

type Props = {};

type State = {
  companyGroups: Array<any>;
  companyGroup: string,
  companyGroupId: number,
  dateOfIssue: string,
  sections: Array<any>;
  observations: [{
    observacion: string,
    descripcion: string
  }],
  observation: string,
  description: string,

  message: string,
  open: boolean,
};

export default class Addendum extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      companyGroups:
        [
          {
            "nombreGrupoEmpresa": "Iridium",
            "idGrupoEmpresa": 1,
            "idConvocatoria": 1,
            "codigoConvocatoria": "2020convo-2",
            "tituloConvocatoria": "Convocatoria primera",
            "id": 1
          },
          {
            "nombreGrupoEmpresa": "Pacha",
            "idGrupoEmpresa": 2,
            "idConvocatoria": 1,
            "codigoConvocatoria": "2020convo-2",
            "tituloConvocatoria": "Convocatoria primera",
            "id": 2
          },
          {
            "nombreGrupoEmpresa": "AlgoSoft",
            "idGrupoEmpresa": 3,
            "idConvocatoria": 1,
            "codigoConvocatoria": "2020convo-2",
            "tituloConvocatoria": "Convocatoria primera",
            "id": 3
          }
        ],
      companyGroup: "",
      companyGroupId: 0,
      dateOfIssue: "",
      sections: [],
      observations: [
        {
          observacion: "",
          descripcion: ""
        }
      ],
      observation: "",
      description: "",

      message: "",
      open: false,
    }

    this.retrieveAddendumData = this.retrieveAddendumData.bind(this);
    this.handleCompanyGroup = this.handleCompanyGroup.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.retrieveAddendumData();
  }

  retrieveAddendumData() {
    ChangeOrderDataService.get("1")
        .then((response) => {
          this.setState({
            companyGroups: response.data,
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  }

  handleCompanyGroup() {
    const cgps: any = this.state.companyGroups;
    let cgId: number = 0;

    for(let i = 0; i < cgps.length; i++) {
      if(cgps[i].nombre === this.state.companyGroup) {
        cgId = cgps[i].id;
      }
    }
    this.setState({
      companyGroupId: cgId,
    })
  }

  handleSubmit() {
    if(this.state.companyGroup === "") {
      this.setState({
        message: "No selecciono niguna Grupo Empresa",
        open: true,
      })
      return false;
    } else if(this.state.dateOfIssue === "") {
      this.setState({
        message: "No selecciono ninguna fecha de emision de contrato",
        open: true,
      });
      return false;
    }
  }

  render() {
    const { companyGroups, sections } = this.state;
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
                  ¿Está seguro de cancelar la el registro de su adenda?
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
                    onClick={() => {window.location.reload()}}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container p-3 position-relative">
          <h3 className="row">
            <strong>Adenda</strong>
          </h3>
          <div className="form-group row m-3">
            <label
              htmlFor="codigoConvocatoria"
              className="col-md-4 col-form-label"
            >
              Grupo Empresa
            </label>
            <div className="col-md-8">
              <select
                  className="form-select form-select-lg"
                  value={this.state.companyGroup}
                  onChange={(e) => {
                    this.setState({ companyGroup: e.target.value });
                    this.handleCompanyGroup();
                  }}
              >
                <option value="" disabled selected>
                  Seleccione una grupo empresa
                </option>
                {companyGroups && companyGroups.map((cg: any) => (
                    <option value={cg.nombreGrupoEmpresa}>
                      {cg.nombreGrupoEmpresa}
                    </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group row m-3">
            <label htmlFor="fechaContrato" className="col-md-4 col-form-label">
              Fecha de emision de contrato
            </label>
            <div className="col-md-8">
              <input
                type="date"
                className="form-control"
                id="fechaContrato"
                name="fechaContrato"
                required
              />
            </div>
          </div>
          <div className="form-group row m-3 pt-4">
            Observaciones de la documentacion
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td className="col-4 fs-5 p-2">
                    <strong>Observacion</strong>
                  </td>
                  <td className="col-8 fs-5 p-2">
                    <strong>Descripcion de la observacion</strong>
                  </td>
                  <td className="borderless-cell"></td>
                </tr>
                <tr>
                  <td>
                    <select
                        className="form-select form-select-sm"
                        value={this.state.observation}
                        onChange={(e) => {
                          this.setState({ observation: e.target.value });
                        }}
                    >
                      <option value="" disabled selected>
                        Seleccione una observacion
                      </option>
                      {sections && sections.map((cg: any) => (
                          <option value={cg.seccion}>
                            {cg.seccion}
                          </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input col-12"
                      id="entregables"
                      name="entregables"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="borderless-cell"></td>
                  <td className="borderless-cell">
                    <div className="col-4 offset-8">
                      <button className="btn btn-lg btn-success bg-success addButton">
                        Agregar Observacion
                      </button>
                    </div>
                  </td>
                  <td className="borderless-cell">
                    <button className="btn btn-secondary" title="Borrar hito">
                      <i className="fa fa-trash fs-3"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="form-group row m-3 d-flex justify-content-end">
            <div className="col-2">
              <button
                type="button"
                className="btn btn-lg btn-danger text-white"
                data-bs-toggle="modal"
                data-bs-target={`#asd`}
              >
                Cancelar
              </button>
            </div>
            <div className="col-2">
              <button type="submit" className="btn btn-lg btn-success" onClick={this.handleSubmit}>
                Registrar
              </button>
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
