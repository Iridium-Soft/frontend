import React, { Component } from "react";

import ObservationsReviewData from "../../../types/observationsReview.type";
import ObservationsReviewDataService from "../../../services/observationsReview.service"

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

import { Table, TableBody, TableCell, TableContainer,TableRow, TableHead, Box } from "@mui/material"
import ApplicationReviewDataService from "../../../services/applicationReview.service";

type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type Props = {};

type State = {
    nombreGrupoEmpresa: string,
    documentos: Array<any>,
    indiceDocumentoActual: number,
    documentoActual: any,
    documentoBase64: string,
    observaciones: Array<any>,

    open: boolean,
    message: string,
    correct: boolean,
};

export default class ReviewObservationsPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            nombreGrupoEmpresa: "",
            documentos: [

            ],
            indiceDocumentoActual: 0,
            documentoActual: {

            },
            documentoBase64: "",
            observaciones: [

            ],

            open: false,
            message: "Error",
            correct: false,
        };

        this.getDocument = this.getDocument.bind(this);
        this.retrieveData = this.retrieveData.bind(this);
        this.retrieveFirstData = this.retrieveFirstData.bind(this);
        this.openCloseObservation = this.openCloseObservation.bind(this);
        this.handleCorrect = this.handleCorrect.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    componentDidMount() {
        this.retrieveFirstData();
    }

    retrieveFirstData() {
        ObservationsReviewDataService.get("1")
            .then((response) => {
                this.setState({
                    nombreGrupoEmpresa: response.data.nombreGP,
                    documentos: response.data.documentos,
                    indiceDocumentoActual: 0,
                    documentoActual: response.data.documentos[0],
                })
                this.getDocument(0);
                const obs: Array<any> = [];
                this.state.documentos.map((doc: any) => {
                    doc.observaciones.map((ob: any) => {
                        obs.push({
                            documento: doc.nombreDocumento,
                            idDocumento: doc.idDocumento,
                            idObservacion: ob.id,
                            observacion: ob,
                            open: false,
                            corregido: ob.corregido,
                            revisado: ob.revisado,
                        });
                    })
                })
                this.setState({observaciones: obs});
            }).catch((e) => {
            console.log(e);
        });
    }

    retrieveData() {
        ObservationsReviewDataService.get("1")
            .then((response) => {
                this.setState({
                    nombreGrupoEmpresa: response.data.nombreGP,
                    documentos: response.data.documentos,
                })
                const obs: Array<any> = [];
                this.state.documentos.map((doc: any) => {
                    doc.observaciones.map((ob: any) => {
                        obs.push({
                            documento: doc.nombreDocumento,
                            idDocumento: doc.idDocumento,
                            idObservacion: ob.id,
                            observacion: ob,
                            open: false,
                            corregido: ob.corregido,
                            revisado: ob.revisado,
                        });
                    })
                })
                this.setState({observaciones: obs});
            }).catch((e) => {
            console.log(e);
        });
    }

    getDocument(n: number) {
        const index = this.state.indiceDocumentoActual + n;
        ObservationsReviewDataService.obtenerDocumento(
            this.state.documentos[index].rutaDocumento
        ).then((response) =>  {
            this.setState({
                documentoBase64: response.data,
                indiceDocumentoActual: index,
                documentoActual: this.state.documentos[index],
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    openCloseObservation(id: string) {
        let obs: Array<any> = this.state.observaciones;
        let ans: number = 0;
        for(let i = 0; i < obs.length; i++) {
            if(id === obs[i].idObservacion){
                ans = i;
            }
        }
        let o: any = this.state.observaciones[ans];
        o.open = !o.open;
        obs[ans] = o;
        this.setState({
            observaciones: obs,
        })
    }

    handleCorrect(id: string, b: boolean) {
        let obs: Array<any> = this.state.observaciones;
        let ans: number = 0;
        for(let i = 0; i < obs.length; i++) {
            if(id === obs[i].idObservacion){
                ans = i;
            }
        }
        let o: any = this.state.observaciones[ans];
        o.revisado = true;
        o.corregido = b;
        obs[ans] = o;
        this.setState({
            observaciones: obs,
        })
    }

    handleSave() {
        let da: Array<ObservationsReviewData> = [];
        this.state.observaciones.map((e: any) => {
            da.push({
                idObservacion: e.idObservacion,
                corregido: e.corregido,
                revisado: e.revisado,
                correccion: e.observacion.correccion,
            });
        });

        ObservationsReviewDataService.saveObservations(da).then((response) => {
            this.setState({
                message: response.data.mensaje,
                open: true,
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    handleFinish() {
        let i: number = 0;
        let bb: boolean = true;
        while(i < this.state.observaciones.length && bb) {
            if(!this.state.observaciones[i].revisado) {
                this.setState({
                    message: "Usted debe terminar de corregir todas las observaciones",
                    open: true,
                    correct: false,
                })
                bb = false;
            }
            i++;
        }
        if(bb) {
            this.setState({
                correct: true,
            })
        }
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
        let numbers: number = -1;

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
                                Se generara un <strong>contrato</strong>
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
                                    onClick={() => {
                                        window.location.reload();
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
                            <strong className="align-middle">Revision de observaciones</strong>
                        </div>
                        <div className="col-4">
                            <h4 className="mt-2">Nombre: {this.state.nombreGrupoEmpresa}</h4>
                        </div>
                        <div className="col-3">
                            <button className="btn-lg mb-2 col-12 btn-info text-white" data-bs-toggle={`${this.state.correct ? "modal" : ""}`}
                                    data-bs-target={`#asd`} onClick={this.handleFinish}>
                                Terminar calificacion
                            </button>
                        </div>
                    </h3>
                    <div className="row mb-2">
                        <div className="col-5">
                            <h4 className="mt-2">{this.state.documentoActual?.nombreDocumento}</h4>
                        </div>
                        <div className="col-2 mt-2 ms-5">
                            <button className={`btn ${this.state.indiceDocumentoActual === 0 ? "d-none" : ""}`}
                                    onClick={() => {this.getDocument(-1)}}>
                                <i className="fa fa-chevron-left fs-4"></i>
                            </button>
                            <button className={`btn ms-5 ${this.state.indiceDocumentoActual === (this.state.documentos.length - 1) ? "d-none" : ""}`}
                                    onClick={() => {this.getDocument(1)}}>
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
                            <div className="row border border-dark" style={{height: "600px"}}>
                                <span className="col-12">
                                    <TableContainer style={{height: "600px"}}>
                                    <Table aria-label="simple table">
                                      <TableBody>
                                          {observations && observations.map((ob: any) => {
                                              numbers++;
                                              return(
                                                  <>
                                                      <TableRow className={`row ${(ob.open) ? "d-none" : ""}`}>
                                                          <button className="btn btn-info btn-block mt-2 text-white" style={{fontSize: "17px"}} onClick={() => {this.openCloseObservation(ob.idObservacion)}}>
                                                              <div className="row">
                                                                  <div className="col-6">
                                                                      Observacion: {ob.observacion.id}
                                                                  </div>
                                                                  <div className="col-6">
                                                                      Corregida: <i className={`fs-5 fa
 ${(!ob.revisado) ? "fa-exclamation-circle text-warning" : ((ob.corregido) ? "fa-circle text-success" : "fa-circle text-danger")}`}>
                                                                  </i>
                                                                  </div>
                                                              </div>
                                                          </button>
                                                      </TableRow>
                                                      <TableRow className={`row ${(ob.open) ? "" : "d-none"}`}>
                                                          <button className="btn btn-info btn-block mt-2 text-white" style={{fontSize: "17px"}} onClick={() => {this.openCloseObservation(ob.idObservacion)}}>
                                                              <div className="row">
                                                                  <div className="col-4">
                                                                      Observacion: {ob.observacion.id}
                                                                  </div>
                                                              </div>
                                                          </button>
                                                          <div className="bg-info text-white">
                                                              <div className="row">
                                                                  <div className="col-5">
                                                                      Documento: {ob.documento}
                                                                  </div>
                                                                  <div className="col-6">
                                                                      Seccion: {ob.observacion.seccionDoc}
                                                                  </div>
                                                              </div>
                                                              <div className="row">
                                                                  <div className="col-6">
                                                                      Observacion corregida:
                                                                  </div>
                                                                  <div className="col-6">
                                                                      Si <input className="form-check-input ms-3 me-4" type="radio"
                                                                            name={`flexRadioDefault${ob.observacion.id}`} id={`radioButtonObservation${ob.observacion.id}`} onChange={() => {this.handleCorrect(ob.idObservacion, true)}} />
                                                                      No <input className="form-check-input ms-3 me-4" type="radio"
                                                                            name={`flexRadioDefault${ob.observacion.id}`} id={`radioButtonObservation${ob.observacion.id}`} onChange={() => {this.handleCorrect(ob.idObservacion, false)}} /> </div>
                                                              </div>
                                                              <div className="row">
                                                                  <div className="col-4">
                                                                      Descripcion:
                                                                  </div>
                                                              </div>
                                                              <div className="row">
                                                                  <div className="col-12">
                                                                      <textarea
                                                                          className="col-12 mt-1"
                                                                          style={{ resize: "none"}}
                                                                          disabled
                                                                          value={ob.observacion.descripcion}
                                                                      />
                                                                  </div>
                                                              </div>
                                                              <div className={`row ${(!this.state.observaciones[numbers].revisado || this.state.observaciones[numbers].corregido) ? "d-none" : ""}`}>
                                                                  <div className="col-4">
                                                                      Correccion:
                                                                  </div>
                                                              </div>
                                                              <div className={`row ${(!this.state.observaciones[numbers].revisado || this.state.observaciones[numbers].corregido) ? "d-none" : ""}`}>
                                                                  <div className="col-12">
                                                                      <textarea
                                                                          className="col-12 mt-1"
                                                                          style={{ resize: "none"}}
                                                                          value={this.state.observaciones[numbers].observacion.correccion}
                                                                          onChange={(e) => {
                                                                              let obs: Array<any> = this.state.observaciones;
                                                                              let ans: number = 0;
                                                                              for(let i = 0; i < obs.length; i++) {
                                                                                  if(ob.observacion.id === obs[i].idObservacion){
                                                                                      ans = i;
                                                                                  }
                                                                              }
                                                                              let o: any = this.state.observaciones[ans];
                                                                              o.observacion.correccion = e.target.value;
                                                                              this.setState({
                                                                                  observaciones: obs,
                                                                              })
                                                                          }}
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </TableRow>
                                                  </>
                                              );
                                          })}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </span>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <button className="offset-3 col-6 btn-lg btn-success text-white" onClick={this.handleSave}>
                                        Guardar
                                    </button>
                                </div>
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
