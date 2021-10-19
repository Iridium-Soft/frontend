import React, { Component } from "react";
import UploadDocument from "./UploadDocument";
import "./UploadDocument.css";

type Props = {

}

type State = {

}

export default class UploadDocumentsPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return(
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
                    <h3 className="row justify-content-center">Documentos</h3>
                    <div className="row mx-0 mb-2">
                        <h5 className="col-12 offset-1">Parte A</h5>
                        <div className="col-4 offset-1 mt-2">
                            <UploadDocument name="Parte A"/>
                        </div>
                        <div className="col-4 offset-1 mt-2">
                            <UploadDocument name="Boleta de garantia"/>
                        </div>
                        <div className="col-4 offset-1 mt-4">
                            <UploadDocument name="Carta de presentacion"/>
                        </div>
                        <div className="col-4 offset-1 mt-4">
                            <UploadDocument name="Constitucion"/>
                        </div>
                    </div>
                    <div className="row mx-0 mb-2 mt-4">
                        <h5 className="col-12 offset-1">Parte B</h5>
                        <div className="col-4 offset-1 mt-2">
                            <UploadDocument name="Parte B"/>
                        </div>
                    </div>
                    <div className="row mx-0 mb-2 mt-4">
                        <div className="row">
                            <div className="col-2 offset-4"></div>
                            <div className="col-2 btn btn-danger text-white m-1" data-bs-toggle="modal"
                                 data-bs-target={`#asd`}>
                                Cancelar
                            </div>
                            <button className="col-2 btn btn-success m-1" >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}