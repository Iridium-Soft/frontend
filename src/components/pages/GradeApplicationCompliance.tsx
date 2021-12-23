import React, { Component } from "react";
import ChangeOrderData from "../../types/changeOrder.type";
import ChangeOrderDataService from '../../services/changeOrder.service'
import ComplianceNotificationDataService from '../../services/complianceNotification.service'
import Snackbar from "@mui/material/Snackbar";
import ScoresTable from "../ScoresTable";
import IconButton from "@mui/material/IconButton";

type ChangeElement = React.ChangeEvent<HTMLInputElement>;

type Props = {

}

type State = {
    companyGroup: string,
    changeOrderCode: string,
    dateOfIssue: string,
    refScores: Array<any>,
    scoresObtained: [{
        evaluacion_id: number,
        puntuacion: number,
    }],
    scoresMessage: string,
    document: string,
    section: string,
    description: string,

    correctionDeadline: string,
    correctionTime: string,
    correctionPlace: string,

    message: string,
    open: boolean,
}

export default class GradeApplicationCompliance extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            companyGroup: "",
            changeOrderCode: "",
            dateOfIssue: "",
            refScores: [],
            scoresObtained: [{evaluacion_id: 0, puntuacion: NaN}],
            scoresMessage: "Tabla de puntajes: Alguno de los puntajes es incorrecto",
            document: "",
            section: "",
            description: "",

            correctionDeadline: "",
            correctionTime: "",
            correctionPlace: "",

            message: "",
            open: false,
        }

        this.retrieveComplianceData = this.retrieveComplianceData.bind(this);

        this.convertDate = this.convertDate.bind(this);

        this.handleChangeOrderCode = this.handleChangeOrderCode.bind(this);
        this.handleDateOfIssue = this.handleDateOfIssue.bind(this);

        this.handleSection = this.handleSection.bind(this);
        this.handleDescription = this.handleDescription.bind(this);

        this.handleCorrectionDeadline = this.handleCorrectionDeadline.bind(this);
        this.handleCorrectionTime = this.handleCorrectionTime.bind(this);
        this.handleCorrectionPlace = this.handleCorrectionPlace.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.postGrade = this.postGrade.bind(this);
        this.checkScores = this.checkScores.bind(this);
    }

    componentDidMount() {
        this.retrieveComplianceData();
    }

    retrieveComplianceData() {
            ComplianceNotificationDataService.getInfo(localStorage.getItem("idPostulacionCalificacion") + "")
                .then((response) => {
                    this.setState({
                        companyGroup: response.data.grupoEmpresa,
                        dateOfIssue: response.data.fechaEm,
                        refScores: response.data.calificacion,
                        correctionDeadline: this.convertDate(response.data.fechayHoraEntrega, true),
                        correctionTime: this.convertDate(response.data.fechayHoraEntrega, false),
                        correctionPlace: response.data.lugarEntrega,
                    });
                })
                .catch((e) => {
                    console.log(e);
                });

    }
    convertDate(dat: string, typ: boolean) {
        let ans: string = "";
        let i: number = dat.length - 1;
        let bb = false;
        while(i >= 0 && !bb) {
            if(dat.charAt(i) !== ".") {
                dat = dat.substring(0, i);
            } else {
                bb = true;
            }
            i--;
        }
        dat += "00Z";
        let date: any = new Date(dat);
        if(typ) {
            let year: any = date.getFullYear();
            let month: any = date.getMonth()+1;
            let dt: any = date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }
            ans = year + '-' + month + '-' + dt;
        } else {
            let hour = date.getUTCHours();
            let minute = date.getUTCMinutes();
            let mil = date.getUTCMilliseconds();
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (mil < 10) {
                mil = '0' + mil;
            }
            ans = hour + ':' + minute + ':' + mil;
        }
        return ans;
    }

    handleChangeOrderCode(event: ChangeElement) {
        this.setState({
            changeOrderCode: event.target.value,
        })
    }

    handleDateOfIssue(event: ChangeElement) {
        console.log(event.target.value);
        this.setState({
            dateOfIssue: event.target.value,
        })
    }

    handleScores = (childData: any) => {
        this.setState(
            {
                scoresObtained: childData.scores,
            }
        )
        this.checkScores();
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
        this.checkScores();
        if(this.state.companyGroup === "") {
            this.setState({
                message: "No selecciono niguna Grupo Empresa",
                open: true,
            })
            return false;
        } else if(this.state.scoresMessage !== "") {
            this.setState({
                message:
                this.state.scoresMessage,
                open: true,
            });
            return false;

        } else if(!/[a-zA-Z]+/.test(this.state.correctionPlace)){
            this.setState({
                message: "Lugar de entrega no valido",
                open: true,
            });
            return false;
        }
        this.setState({
            message: "Registro de calificacion realizada exitosamente",
            open: true,
        });
        this.postGrade();
    }

    postGrade() {
        const elem: any = {
            fecha_entrega: this.state.dateOfIssue,
            lugar_entrega: this.state.correctionPlace,
            fecha_emision: this.state.correctionTime,
            evaluacion: this.state.scoresObtained,
        };

            ChangeOrderDataService.createComplianceNotification(elem, "1")
                .then(() => {

                })
                .catch((e) => {
                    console.log(e);
                });

    }

    checkScores() {
        for(let i = 0; i < this.state.refScores?.length; i++) {
            if(this.state.scoresObtained[i].puntuacion > this.state.refScores[i]?.puntajeReferencial || !this.state.scoresObtained[i].puntuacion || this.state.scoresObtained[i].puntuacion < 0) {
                this.setState({
                    scoresMessage: "Tabla de puntajes: Alguno de los puntajes es incorrecto"
                })
                return;
            }
        }
        this.setState({
            scoresMessage: ""
        });
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
                                    ¿Está seguro de cancelar la el registro de su notificacion de conformidad
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
                    <div className="row">
                        <div className="col-12">
                            <h3>Registrar calificiacion - Notificacion de conformidad</h3>
                        </div>
                    </div>
                    <div className="form-group row m-3">
                        <label
                            htmlFor="codigoConvocatoria"
                            className="col-md-4 col-form-label"
                        >
                            Grupo Empresa
                        </label>
                        <div className="col-md-8">
                            <input
                                className="form-control-lg col-12 text-dark"
                                value={this.state.companyGroup}
                                disabled
                            >

                            </input>
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
                                value={this.state.dateOfIssue}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row m-3">
                        <ScoresTable parentCallback={this.handleScores} refScores={this.state.refScores}/>
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
                                required
                                value={this.state.correctionDeadline}
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
                                value={this.state.correctionTime}
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
                                value={this.state.correctionPlace}
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
                                data-bs-target={`#asd`}
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