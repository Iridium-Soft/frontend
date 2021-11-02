import React, { Component } from "react";
import './WorkCalendar.css';
import WorkCalendarDataService from "../services/workCalendar.service";
import WorkCalendarData from "../types/workCalendar.type";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type Props = {

};

type State = {
    milestones: WorkCalendarData;
    nombre: string;
    fechaIni: string;
    fechaFin: string;
    porcentajeCobro: number;
    entregables: string;
    sum: number;
    message: string;
    open: boolean;
};

export default class WorkCalendar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            milestones: {
                id: "",
                hitos: [

                ]
            },
            nombre: "",
            fechaIni: "",
            fechaFin: "",
            porcentajeCobro: 0,
            entregables: "",
            sum: 0,
            message: "",
            open: false,
        }

        this.handleNombre = this.handleNombre.bind(this);
        this.handleFechaFin = this.handleFechaFin.bind(this);
        this.handleFechaIni = this.handleFechaIni.bind(this);
        this.handlePorcentaje = this.handlePorcentaje.bind(this);
        this.handleEntregables = this.handleEntregables.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNombre(event: ChangeElement) {
        this.setState({
            nombre: event.target.value,
        });
    }

    handleFechaFin(event: ChangeElement) {
        this.setState({
            fechaFin: event.target.value,
        });
    }

    handleFechaIni(event: ChangeElement) {
        this.setState({
            fechaIni: event.target.value,
        });
    }

    handlePorcentaje(event: ChangeElement) {
        this.setState({
            porcentajeCobro: parseInt(event.target.value),
        });
    }

    handleEntregables(event: ChangeElement) {
        this.setState({
            entregables: event.target.value,
        });
    }

    handleSubmit(e: any){
        e.preventDefault();
        if (!/[a-zA-Z]+/.test(this.state.nombre)) {
            this.setState({
                message: "Llene correctamente los campos. Título incorrecto",
                open: true,
            });
            return;
        } else if (
            this.state.fechaFin === "" ||
            this.state.fechaIni === "" ||
            new Date(this.state.fechaIni) > new Date(this.state.fechaFin)
        ) {
            this.setState({
                message: "Llene correctamente los campos. Fechas incorrectas",
                open: true,
            });
            return;
        } else if((this.state.porcentajeCobro + this.state.sum) > 100) {
            this.setState({
                message: "Llene correctamente los campos. Sumatoria de porcentaje sobrepasa 100%",
                open: true,
            });
            return;
        }
        let variable = this.state.milestones;
        variable.hitos.push(
            {
                nombre: this.state.nombre,
                fechaIni: this.state.fechaIni,
                fechaFin: this.state.fechaFin,
                porcentajeCobro: this.state.porcentajeCobro,
                entregables: this.state.entregables,
            }
        );
        this.setState({
            milestones: variable,
            sum: this.state.sum + this.state.porcentajeCobro,
        });
        console.log(this.state.milestones);
        this.setState({ message: "Registro de convocatoria exitoso", open: true });
    }

    sendWorkCalendar(e: any) {
        e.preventDefault();
        if (!/[a-zA-Z]+/.test(this.state.nombre)) {
            this.setState({
                message: "Llene correctamente los campos. Título incorrecto",
                open: true,
            });
            return;
        } else if (
            this.state.fechaFin === "" ||
            this.state.fechaIni === "" ||
            new Date(this.state.fechaIni) > new Date(this.state.fechaFin)
        ) {
            this.setState({
                message: "Llene correctamente los campos. Fechas incorrectas",
                open: true,
            });
            return;
        } else if((this.state.porcentajeCobro + this.state.sum) > 100) {
            this.setState({
                message: "Llene correctamente los campos. Sumatoria de porcentaje sobrepasa 100%",
                open: true,
            });
            return;
        }
        let variable = this.state.milestones;
        variable.hitos.push(
            {
                nombre: this.state.nombre,
                fechaIni: this.state.fechaIni,
                fechaFin: this.state.fechaFin,
                porcentajeCobro: this.state.porcentajeCobro,
                entregables: this.state.entregables,
            }
        );
        this.setState({
            milestones: variable,
            sum: this.state.sum + this.state.porcentajeCobro,
        });
        WorkCalendarDataService.create({
            id: this.state.milestones.id,
            hitos: this.state.milestones.hitos,
        });

    }

    render() {
        const { milestones } = this.state;
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
                                    className="btn btn-danger text-white"
                                    data-bs-dismiss="modal"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success text-white"
                                    onClick={() => {window.location.reload()}}
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
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
                                {milestones && milestones.hitos.map((hi: any) => (
                                    <>
                                        <tr>
                                            <td>
                                                {hi.nombre}
                                            </td>
                                            <td>
                                                {hi.fechaIni}
                                            </td>
                                            <td>
                                                {hi.fechaFin}
                                            </td>
                                            <td>
                                                {hi.porcentajeCobro}
                                            </td>
                                            <td>
                                                {hi.entregables}
                                            </td>
                                        </tr>
                                    </>
                                ))}
                                <tr>
                                    <td><input
                                        type="text"
                                        className="input"
                                        id="nombre"
                                        name="nombre"
                                        required
                                        onChange={this.handleNombre}
                                    /></td>
                                    <td>
                                        <input
                                            type="date"
                                            className="input"
                                            id="fechaIni"
                                            name="fechaIni"
                                            required
                                            onChange={this.handleFechaIni}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            className="input"
                                            id="fechaFin"
                                            name="fechaFin"
                                            onChange={this.handleFechaFin}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="input"
                                            id="porcentaje"
                                            name="porcentaje"
                                            onChange={this.handlePorcentaje}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="input"
                                            id="entregables"
                                            name="entregables"
                                            onChange={this.handleEntregables}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="borderless-cell"></td>
                                    <td className="borderless-cell"></td>
                                    <td className="borderless-cell"><div className="pt-3 text-center">
                                        Sumatoria:
                                    </div></td>
                                    <td><div className="pt-3 text-end">
                                        {this.state.sum} %
                                    </div></td>
                                    <td className="borderless-cell">
                                        <button className="btn btn-lg btn-success bg-success addButton" onClick={this.handleSubmit}>Agregar Hito</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mx-0 mb-2 mt-4">
                        <div className="row fixed-bottom">
                            <div className="col-2 offset-5"></div>
                            <div className="col-2 btn btn-danger text-white mb-1" data-bs-toggle="modal"
                                 data-bs-target={`#asd`}>
                                Cancelar
                            </div>
                            <button className="col-2 offset-1 btn btn-success mb-1" onClick={this.sendWorkCalendar}>
                                Enviar
                            </button>
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
        )
    }
}