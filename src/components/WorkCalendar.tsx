import React, { Component } from "react";
import WorkCalendarDataService from "../services/workCalendar.service";

type Props = {

};

type State = {

};

export default class WorkCalendar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return(
            <div className="container p-3 position-relative">
                <h3 className="row">Planificacion</h3>
                <div className="row">
                    <div className="col col-8">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">Nombre Hito</th>
                                <th scope="col">Fecha Inicial</th>
                                <th scope="col">Fecha Final</th>
                                <th scope="col">Porcentaje % de Cobro</th>
                                <th scope="col">Entregables</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><input
                                    type="text"
                                    className="input"
                                    id="nombre"
                                    name="titulo"
                                    required
                                /></td>
                                <td>
                                    <input
                                        type="date"
                                        className="input"
                                        id="nombre"
                                        name="titulo"
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        className="input"
                                        id="nombre"
                                        name="titulo"
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input"
                                        id="nombre"
                                        name="titulo"
                                        required
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="input"
                                        id="nombre"
                                        name="titulo"
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button className="btn btn-lg btn-success bg-success">Agregar Hito</button>

                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}