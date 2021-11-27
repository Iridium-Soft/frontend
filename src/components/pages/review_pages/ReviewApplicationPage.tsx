import React, { Component } from "react";

import ApplicationReviewDataService from "../../../services/applicationReview.service";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

import { Table, TableBody, TableCell, TableContainer,TableRow, TableHead, Box } from "@mui/material"

type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type Props = {};

type State = {
    nombreGrupoEmpresa: string,
    documentos: Array<any>,
    indiceDocumentoActual: number,
    documentoActual: any,
    seccion: string,
    descripcion: string,
    observaciones: Array<any>,

    open: boolean,
    message: string,
};

export default class ReviewApplicationPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            nombreGrupoEmpresa: "",
            documentos: [

            ],
            indiceDocumentoActual: 1,
            documentoActual: {

            },
            seccion: "",
            descripcion: "",
            observaciones: [

            ],

            open: false,
            message: "",
        };

        this.backDocument = this.backDocument.bind(this);
        this.skipDocument = this.skipDocument.bind(this);
        this.retrieveData = this.retrieveData.bind(this);
        this.handleSeccion = this.handleSeccion.bind(this);
        this.addObservation = this.addObservation.bind(this);
        this.deleteObservation = this.deleteObservation.bind(this);
    }

    componentDidMount() {
        this.retrieveData();
        this.backDocument();
    }

    retrieveData() {
        ApplicationReviewDataService.get("1")
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
                            observacion: ob,
                        });
                    })
                })
                this.setState({observaciones: obs});
            }).catch((e) => {
                console.log(e);
            });
    }

    backDocument() {
        const index = this.state.indiceDocumentoActual - 1;
        this.setState({
            indiceDocumentoActual: index,
            documentoActual: this.state.documentos[index],
        })
    }

    skipDocument() {
        const index = this.state.indiceDocumentoActual + 1;
        this.setState({
            indiceDocumentoActual: index,
            documentoActual: this.state.documentos[index],
        })
    }

    handleSeccion(event: ChangeElement) {
        this.setState({
            seccion: event.target.value,
        })
    }

    addObservation() {
        if(this.state.seccion === "" || this.state.descripcion === "") {
            this.setState({
                message: "Todos los campos deben estar llenos",
                open: true,
            })
            return;
        } else if(!/[a-zA-Z0-9.]+/.test(this.state.seccion)){
            this.setState({
                message: "El campo Seccion esta llenado incorrectamente",
                open: true,
            })
            return;
        } else if(!/[a-zA-Z]+/.test(this.state.descripcion)) {
            this.setState({
                message: "El campo Descripcion esta llenado incorrectamente",
                open: true,
            })
            return;
        }
        let o: any = {
            id: this.state.documentoActual.observaciones.length + 1,
            seccionDoc: this.state.seccion,
            descripcion: this.state.descripcion,
        }

        ApplicationReviewDataService.registerObservation({
            idDoc: this.state.documentoActual.idDocumento,
            seccion: this.state.seccion,
            descripcion: this.state.descripcion
        }).then((response) => {
            this.retrieveData();
        });
        this.retrieveData();
    }

    deleteObservation(event: any) {
        const ind: number = parseInt(event.target.id.charAt(event.target.id.length - 1));
        ApplicationReviewDataService.deleteObservation(
            this.state.observaciones[ind].id,
        ).then((response) => {
            this.retrieveData();
        });
        this.retrieveData();
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
                                En base a sus datos registrados se registrara una <strong>{(this.state.observaciones.length === 0)? "NOTIFICACION DE CONFORMIDAD" : "ORDEN DE CAMBIO"}</strong>
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
                            <strong className="align-middle">Revision de postulacion</strong>
                        </div>
                        <div className="col-4">
                            <h4 className="mt-2">Nombre: {this.state.nombreGrupoEmpresa}</h4>
                        </div>
                        <div className="col-3">
                            <button className="btn-lg mb-2 col-12 btn-info text-white" data-bs-toggle="modal"
                                    data-bs-target={`#asd`}>
                                Terminar revision
                            </button>
                        </div>
                    </h3>
                    <div className="row mb-2">
                        <div className="col-5">
                            <h4 className="mt-2">{this.state.documentoActual.nombreDocumento}</h4>
                        </div>
                        <div className="col-2 mt-2 ms-5">
                            <button className={`btn ${this.state.indiceDocumentoActual === 0 ? "d-none" : ""}`}
                            onClick={this.backDocument}>
                                <i className="fa fa-chevron-left fs-4"></i>
                            </button>
                            <button className={`btn ms-5 ${this.state.indiceDocumentoActual === (this.state.documentos.length - 1) ? "d-none" : ""}`}
                            onClick={this.skipDocument}>
                                <i className="fa fa-chevron-right fs-4"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <iframe
                                title="no"
                                src={`https://docs.google.com/gview?url=/revision/documentos/${this.state.documentoActual.rutaDocumento}&embedded=true`}
                                style={{ width: "100%", height: "690px" }}
                            ></iframe>
                        </div>
                        <div className="col-5">
                            <div className="row mb-4">
                                <div className="col-3 fs-5">
                                    Seccion:
                                </div>
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
                                <div className="col-12 fs-5 mb-3">
                                    Observacion:
                                </div>
                                <div className="col-12">
                                    <textarea
                                        className="col-12"
                                        style={{height: "100px", resize: "none"}}
                                        value={this.state.descripcion}
                                        onChange={
                                            (e) => {
                                                this.setState({
                                                    descripcion: e.target.value,
                                                })
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-4 offset-9">
                                    <button className="btn btn-info text-white" onClick={this.addObservation}>
                                        Registrar
                                    </button>
                                </div>
                            </div>
                            <div className="row border border-dark" style={{height: "400px"}}>
                                <span className="col-12">
                                    <TableContainer style={{height: "400px"}}>
                                    <Table aria-label="simple table">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell className="col-2"><strong>Documento</strong></TableCell>
                                          <TableCell className="col-2"><strong>Seccion</strong></TableCell>
                                          <TableCell className="col-8"><strong>Descripcion</strong></TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                          {observations && observations.map((ob: any) => {
                                              numbers++;
                                              return(<TableRow>
                                                  <TableCell component="th" scope="row">{ob.documento}</TableCell>
                                                  <TableCell>{ob.observacion.seccionDoc}</TableCell>
                                                  <TableCell width="15px">
                                                      {ob.observacion.descripcion}
                                                  </TableCell>
                                                  <TableCell><button className="btn" onClick={this.deleteObservation}><i className="fa fa-trash" id={`deleteObservationButton${numbers}`}></i></button></TableCell>
                                              </TableRow>);
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
