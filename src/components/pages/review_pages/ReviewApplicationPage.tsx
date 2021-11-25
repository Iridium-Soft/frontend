import React, { Component } from "react";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

import { Table, TableBody, TableCell, TableContainer,TableRow, TableHead } from "@mui/material"

type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type Props = {};

type State = {
    
};

export default class ReviewApplicationPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {

        };
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

        const URL =
            "https://www.redalyc.org/pdf/1341/134116845005.pdf";
        const src = `https://docs.google.com/gview?url=${URL}&embedded=true`;

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
                                    ¿Está seguro de cancelar la el registro de sus documentos?
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
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container p-3 position-relative">
                    <h3 className="row border-bottom border-dark">
                        <div className="col-5">
                            <strong className="align-middle">Revision de planificacion</strong>
                        </div>
                        <div className="col-4">
                            <h4 className="mt-2">[Nombre de Grupo Empresa]</h4>
                        </div>
                        <div className="col-3">
                            <button className="btn-lg mb-2 col-12 btn-primary">
                                Terminar revision
                            </button>
                        </div>
                    </h3>
                    <div className="row mb-2">
                        <div className="col-5">
                            <h4 className="mt-2">[Nombre del documento]</h4>
                        </div>
                        <div className="col-2 mt-2 ms-5">
                            <button className="btn">
                                <i className="fa fa-chevron-left fs-4"></i>
                            </button>
                            <button className="btn ms-5">
                                <i className="fa fa-chevron-right fs-4"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <iframe
                                title="no"
                                src={src}
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
                                        style={{height: "100px"}}
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-4 offset-9">
                                    <button className="btn btn-primary">
                                        Registrar
                                    </button>
                                </div>
                            </div>
                            <div className="row border border-dark" style={{height: "400px"}}>
                                <span className="col-12">
                                    <TableContainer style={{height: "400px"}}>
                                    <Table style={{minHeight: "400px"}} aria-label="simple table">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell className="col-2"><strong>Documento</strong></TableCell>
                                          <TableCell className="col-2"><strong>Seccion</strong></TableCell>
                                          <TableCell className="col-8"><strong>Descripcion</strong></TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                          <TableRow>
                                              <TableCell component="th" scope="row">Parte A</TableCell>
                                              <TableCell>4.1.2</TableCell>
                                              <TableCell>dddddddddddddddddddddddddd</TableCell>
                                              <TableCell><button className="btn"><i className="fa fa-trash"></i></button></TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell component="th" scope="row">Parte A</TableCell>
                                              <TableCell>4.1.2</TableCell>
                                              <TableCell>dddddddddddddddddddddddddd</TableCell>
                                              <TableCell><button className="btn"><i className="fa fa-trash"></i></button></TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell component="th" scope="row">Parte A</TableCell>
                                              <TableCell>4.1.2</TableCell>
                                              <TableCell>dddddddddddddddddddddddddd</TableCell>
                                              <TableCell><button className="btn"><i className="fa fa-trash"></i></button></TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell component="th" scope="row">Parte A</TableCell>
                                              <TableCell>4.1.2</TableCell>
                                              <TableCell>dddddddddddddddddddddddddd</TableCell>
                                              <TableCell><button className="btn"><i className="fa fa-trash"></i></button></TableCell>
                                          </TableRow>



                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={false}
                    autoHideDuration={6000}
                    onClose={closeSnackbar}
                    message={"ad"}
                    action={actionCloseSnackbar}
                />
            </>
        );
    }
}
