import React, { Component } from "react";
import ChangeOrderData from "../types/changeOrder.type";
import ChangeOrderDataService from '../services/changeOrder.service'
import Snackbar from "@mui/material/Snackbar";
import AnnouncementData from "../types/announcement.type";
import ScoresTable from "./ScoresTable";

type ChangeElement = React.ChangeEvent<HTMLInputElement>;

type Props = {

}

type State = {
    scoresObtained: Array<number>,
    observations: Array<{
        document: string,
        section: string,
        description: string
    }>
    document: string,
    section: string,
    description: string,
}

export default class ChangeOrderPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            scoresObtained: [],
            observations: [],
            document: "",
            section: "",
            description: "",
        }

        this.addObservation = this.addObservation.bind(this);
        this.deleteObservation = this.deleteObservation.bind(this);
        this.handleSection = this.handleSection.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
    }

    handleScores = (childData: Array<number>) => {
        this.setState(
            {scoresObtained: childData}
        )
    }

    handleSection(event: ChangeElement) {
        this.setState({
            section: event.target.value
        })
    }

    handleDescription(event: ChangeElement) {
        this.setState({
            description: event.target.value
        })
    }

    addObservation() {
        const ob: any = {
            document: this.state.document,
            section: this.state.section,
            description: this.state.description,
        }
        let variable: any = this.state.observations;
        variable.push(ob);
        this.setState({
            observations: variable,
        });
    }

    deleteObservation() {
        let variable: any = this.state.observations;
        variable.pop();
        this.setState({
            observations: variable,
        });
    }

    render() {
        const { observations } = this.state;
        return (
            <>
                <div className="container p-3 position-relative">
                    <h3 className="row"><strong>Orden de cambio</strong></h3>
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
                                id="codigoConvocatoria"
                                name="codigoConvocatoria"
                            >
                                <option value="" selected>
                                    Seleccione la Grupo Empresa
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row m-3">
                        <label htmlFor="codigoPliego" className="col-md-4 col-form-label">
                            Código orden de cambio
                        </label>
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="form-control"
                                id="codigoPliego"
                                name="codigoPliego"
                                required
                            />
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
                    <div className="form-group row m-3">
                        <ScoresTable parentCallback={this.handleScores}/>
                    </div>
                    <div className="form-group row m-3">
                        Observaciones de contrato
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td className="col-2 fs-5 p-2"><strong>Documento</strong></td>
                                <td className="col-2 fs-5 p-2"><strong>Seccion</strong></td>
                                <td className="col-8 fs-5 p-2"><strong>Descripcion de la observacion</strong></td>
                                <td className="borderless-cell"></td>
                            </tr>
                            {observations &&
                            observations.map((obs: any) => (
                                <>
                                    <tr>
                                        <td>{obs.document}</td>
                                        <td>{obs.section}</td>
                                        <td>{obs.description}</td>
                                        <td className="borderless-cell"></td>
                                    </tr>
                                </>
                            ))}
                            <tr>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        id="codigoConvocatoria"
                                        name="codigoConvocatoria"
                                        onChange={(e) => {
                                            this.setState({ document: e.target.value });
                                        }}
                                    >
                                        <option value="Parte A" selected>
                                            Parte A
                                        </option>
                                        <option value="Boleta de garantia">
                                            Boleta de garantia
                                        </option>
                                        <option value="Carta de presentacion">
                                            Carta de presentacion
                                        </option>
                                        <option value="Constitucion">
                                            Constitucion
                                        </option>
                                        <option value="Parte B">
                                            Parte B
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="1.0"
                                        className="input col-12"
                                        id="porcentaje"
                                        name="porcentaje"
                                        onChange={this.handleSection}
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input col-12"
                                        id="entregables"
                                        name="entregables"
                                        onChange={this.handleDescription}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="borderless-cell"></td>
                                <td className="borderless-cell"></td>
                                <td className="borderless-cell">
                                    <div className="col-4 offset-8">
                                        <button
                                            className="btn btn-lg btn-success bg-success addButton"
                                            onClick={this.addObservation}
                                        >
                                            Agregar Observacion
                                        </button>
                                    </div>
                                </td>
                                <td className="borderless-cell">
                                    <button
                                        className="btn btn-secondary"
                                        title="Borrar hito"
                                        onClick={this.deleteObservation}
                                    >
                                        <i className="fa fa-trash fs-3"></i>
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group row m-3">
                        <h5><strong>Informacion de entrega de correcion</strong></h5>
                    </div>
                    <div className="form-group row m-3">
                        <label htmlFor="fechaContrato" className="col-md-4 col-form-label">
                            Fecha de entrega de correcion
                        </label>
                        <div className="col-md-2">
                            <input
                                type="date"
                                className="form-control"
                                id="fechaContrato"
                                name="fechaContrato"
                                required
                            />
                        </div>
                        <label htmlFor="fechaContrato" className="col-md-1 offset-1 col-form-label">
                            a horas
                        </label>
                        <div className="col-md-2">
                            <input
                                type="time"
                                className="form-control"
                                id="fechaContrato"
                                name="fechaContrato"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row m-3">
                        <label htmlFor="codigoPliego" className="col-md-4 col-form-label">
                            Lugar de entrega
                        </label>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                id="codigoPliego"
                                name="codigoPliego"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row m-3 d-flex justify-content-end">
                        <div className="col-2">
                            <button
                                type="button"
                                className="btn btn-lg btn-danger text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#popupCancelModalPetis"
                            >
                                Cancelar
                            </button>
                        </div>
                        <div className="col-2">
                            <button type="submit" className="btn btn-lg btn-success">
                                Registrar
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}