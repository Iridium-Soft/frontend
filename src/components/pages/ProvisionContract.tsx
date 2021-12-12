import React, { Component } from "react";
import Snackbar from "@mui/material/Snackbar";
import ScoresTable from "../ScoresTable";

type Props = {

}

type State = {
    scoresObtained: Array<number>,
}

export default class ProvisionContract extends Component<Props, State> {
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
                    <div className="row">
                        <div className="col-8">
                            <h3>
                                Contrato de prestacion de servicios
                            </h3>
                        </div>
                    </div>
                    <div className="form-group row m-3 pt-4">
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
                    <div className="form-group row m-3 pt-4">
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

                    <div className="form-group row m-3 pt-4 d-flex justify-content-end">
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