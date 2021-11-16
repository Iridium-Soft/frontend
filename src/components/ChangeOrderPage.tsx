import React, { Component } from "react";
import ChangeOrderData from "../types/changeOrder.type";
import ChangeOrderDataService from '../services/changeOrder.service'
import Snackbar from "@mui/material/Snackbar";
import ScoresTable from "./ScoresTable";
import IconButton from "@mui/material/IconButton";

type ChangeElement = React.ChangeEvent<HTMLInputElement>;

type Props = {

}

type State = {
    companyGroups: Array<any>;
    companyGroup: string,
    companyGroupId: number,
    changeOrderCode: string,
    dateOfIssue: string,
    refScores: Array<any>,
    scoresObtained: [{
        evaluacion_id: number,
        puntuacion: number,
    }],
    scoresMessage: string,
    observations: [{
        documento: string,
        seccion: string,
        descripcion: string
    }],
    document: string,
    section: string,
    description: string,

    correctionDeadline: string,
    correctionTime: string,
    correctionPlace: string,

    message: string,
    open: boolean,
}

export default class ChangeOrderPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            companyGroups: [],
            companyGroup: "",
            companyGroupId: 0,
            changeOrderCode: "",
            dateOfIssue: "",
            refScores: [],
            scoresObtained: [{evaluacion_id: 0, puntuacion: 0}],
            scoresMessage: "",
            observations: [
                {documento: "",
                seccion: "",
                descripcion: ""}
            ],
            document: "",
            section: "",
            description: "",

            correctionDeadline: "",
            correctionTime: "",
            correctionPlace: "",

            message: "",
            open: false,
        }

        this.retrieveChangeOrderData = this.retrieveChangeOrderData.bind(this);

        this.handleCompanyGroup = this.handleCompanyGroup.bind(this);
        this.handleChangeOrderCode = this.handleChangeOrderCode.bind(this);
        this.handleDateOfIssue = this.handleDateOfIssue.bind(this);

        this.deleteObservation = this.deleteObservation.bind(this);
        this.handleSection = this.handleSection.bind(this);
        this.handleDescription = this.handleDescription.bind(this);

        this.handleCorrectionDeadline = this.handleCorrectionDeadline.bind(this);
        this.handleCorrectionTime = this.handleCorrectionTime.bind(this);
        this.handleCorrectionPlace = this.handleCorrectionPlace.bind(this);

        this.validateObservation = this.validateObservation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.postChangeOrder = this.postChangeOrder.bind(this);
    }

    componentDidMount() {
        this.retrieveChangeOrderData();
    }

    retrieveChangeOrderData() {
        ChangeOrderDataService.getPostulaciones({id: "1"})
            .then((response) => {
                this.setState({
                    companyGroups: response.data.grupoEmpresas,
                    refScores: response.data.evaluacion,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    handleCompanyGroup(event: ChangeElement) {
        const cgps: any = this.state.companyGroups;
        const cg: string = event.target.value;
        let cgId: number = 0;

        for(let i = 0; i < cgps.length; i++) {
            if(cgps[i].nombre === cg) {
                cgId = cgps[i].id;
            }
        }
        this.setState({
            companyGroup: cg,
            companyGroupId: cgId,
        })
    }

    handleChangeOrderCode(event: ChangeElement) {
        this.setState({
            changeOrderCode: event.target.value,
        })
    }

    handleDateOfIssue(event: ChangeElement) {
        this.setState({
            dateOfIssue: event.target.value,
        })
    }

    handleScores = (childData: any) => {
        this.setState(
            {
                scoresObtained: childData.scores,
                scoresMessage: childData.message
            }
        )
    }

    handleCorrectionDeadline(event: ChangeElement) {
        this.setState({
            correctionDeadline: event.target.value.toString(),
        })
    }

    handleCorrectionTime(event: ChangeElement) {
        this.setState({
            correctionTime: event.target.value.toString(),
        })
    }

    handleCorrectionPlace(event: ChangeElement) {
        this.setState({
            correctionPlace: event.target.value,
        })
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

    handleSubmit() {
        if(this.state.companyGroup !== "") {
            this.setState({
                message: "El siguiente campo debe ser correctamente llenado: No selecciono niguna Grupo Empresa",
                open: true,
            })
            return false;
        } else if(!/[a-zA-Z]+/.test(this.state.changeOrderCode)) {
            this.setState({
                message: "El siguiente campo debe ser correctamente llenado: El codigo de orden de cambio no es correcto",
                open: true,
            })
            return false;
        } else if(this.state.dateOfIssue === "") {
            this.setState({
                message: "El siguiente campo debe ser correctamente llenado: No selecciono ninguna fecha de contrato",
                open: true,
            });
            return false;
        } else if(this.state.scoresMessage !== "") {
            this.setState({
                message:
                this.state.scoresMessage,
                open: true,
            });
            return false;

        } else if(this.state.observations.length < 1){
                this.setState({
                    message: "El siguiente campo debe ser correctamente llenado: No registro ninguna observacion",
                    open: true,
                });
                return false;
        } else if(this.state.correctionDeadline === ""){
            this.setState({
                message: "El siguiente campo debe ser correctamente llenado: No selecciono ninguna fecha de entrega de correccion",
                open: true,
            });
            return false;
        } else if(this.state.correctionTime === ""){
            this.setState({
                message: "El siguiente campo debe ser correctamente llenado: No selecciono ninguna hora de entrega de correccion",
                open: true,
            });
            return false;
        } else if(!/[a-zA-Z]+/.test(this.state.correctionPlace)){
            this.setState({
                message: "El siguiente campo debe ser correctamente llenado: Lugar de entrega no valido",
                open: true,
            });
            return false;
        }
        this.postChangeOrder();
    }

    postChangeOrder() {
        const elem: ChangeOrderData = {
            grupoempresa_id: this.state.companyGroupId,
            postulacion_id: 0,
            convocatoria_id: 0,
            nombre: this.state.companyGroup,
            cod_orden_cambio: this.state.changeOrderCode,
            fecha_entrega: this.state.correctionDeadline,
            lugar_entrega: this.state.correctionPlace,
            fecha_emision: this.state.dateOfIssue,
            evaluacion: this.state.scoresObtained,
            observacion: this.state.observations,
        };

        ChangeOrderDataService.create(elem);
    }

    deleteObservation() {
        let variable: any = this.state.observations;
        variable.pop();
        this.setState({
            observations: variable,
        });
    }

    validateObservation() {
        if(this.state.document === "") {
            this.setState({
                message:
                    "El siguiente campo debe ser correctamente llenado: No selecciono nigun documento",
                open: true,
            });
            return false;
        } else if(!/^[.0-9]+$/.test(this.state.section)) {
            this.setState({
                message:
                    "El siguiente campo debe ser correctamente llenado: Seccion incorrecta",
                open: true,
            });
            return false;
        } else if(!/[a-zA-Z]+/.test(this.state.description)) {
            this.setState({
                message:
                    "El siguiente campo debe ser correctamente llenado: Descripcion incorrecta",
                open: true,
            });
            return false;
        }
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

    render() {
        const { observations } = this.state;
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
                                onChange={this.handleChangeOrderCode}
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
                                onChange={this.handleDateOfIssue}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row m-3">
                        <ScoresTable parentCallback={this.handleScores} refScores={this.state.refScores}/>
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
                                        <option value="default" disabled selected>
                                            Seleccione un documento
                                        </option>
                                        <option value="Parte A">
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
                                        // type="number"
                                        // step="0.1"
                                        // min="1.0"
                                        // className="input col-12"
                                        // id="porcentaje"
                                        // name="porcentaje"
                                        // onChange={this.handleSection}
                                        // required
                                        type="text"
                                        className="input col-12"
                                        id="entregables"
                                        name="entregables"
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
                                            onClick={this.validateObservation}
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
                                required
                                onChange={this.handleCorrectionDeadline}
                            />
                        </div>
                        <label htmlFor="fechaContrato" className="col-md-1 offset-1 col-form-label">
                            a horas
                        </label>
                        <div className="col-md-2">
                            <input
                                type="time"
                                className="form-control"
                                onChange={this.handleCorrectionTime}
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
                                onChange={this.handleCorrectionPlace}
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
                            <button type="submit" className="btn btn-lg btn-success" onClick={this.handleSubmit}>
                                Registrar
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
        );
    }
}