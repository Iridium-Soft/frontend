import React, { Component } from "react";
import Snackbar from "@mui/material/Snackbar";
import ScoresTable from "./ScoresTable";

type Props = {

}

type State = {
    scoresObtained: Array<number>,
}

export default class ComplianceNotification extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }

    handleScores = (childData: Array<number>) => {
        this.setState(
            {scoresObtained: childData}
        )
    }

    render() {
        return (
            <>
                <div className="container p-3 position-relative">
                    <h3 className="row"><strong>Notificacion de Conformidad</strong></h3>
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
                        <h5><strong>Informacion de firma de contrato</strong></h5>
                    </div>
                    <div className="form-group row m-3">
                        <label htmlFor="fechaContrato" className="col-md-4 col-form-label">
                            Fecha de firma de contrato
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
                            Código orden de cambio
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