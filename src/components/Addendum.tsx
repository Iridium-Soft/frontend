import React, { Component } from "react";
import Snackbar from "@mui/material/Snackbar";
import ScoresTable from "./ScoresTable";

type Props = {

}

type State = {
    scoresObtained: Array<number>,
}

export default class Addendum extends Component<Props, State> {
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
                    <h3 className="row"><strong>
                        Adenda
                    </strong></h3>
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
                    <div className="form-group row m-3 pt-4">
                        Observaciones de la documentacion
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td className="col-4 fs-5 p-2"><strong>Observacion</strong></td>
                                <td className="col-8 fs-5 p-2"><strong>Descripcion de la observacion</strong></td>
                                <td className="borderless-cell"></td>
                            </tr>
                            <tr>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        id="codigoConvocatoria"
                                        name="codigoConvocatoria"
                                    >
                                        <option value="" selected>
                                        </option>
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
                                        <button
                                            className="btn btn-lg btn-success bg-success addButton"
                                        >
                                            Agregar Observacion
                                        </button>
                                    </div>
                                </td>
                                <td className="borderless-cell">
                                    <button
                                        className="btn btn-secondary"
                                        title="Borrar hito"
                                    >
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