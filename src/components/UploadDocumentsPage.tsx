import { Component } from "react";
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
                        <div className="col-2 btn btn-danger text-white m-1">
                            Cancelar
                        </div>
                        <div className="col-2 btn btn-success m-1">
                            Enviar
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}