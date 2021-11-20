import React, { Component } from "react";
import Snackbar from "@mui/material/Snackbar";
import ScoresTable from "./ScoresTable";
import ComplianceNotificationData from "../types/complianceNotification.type";
import ComplianceNotificationDataService from "../services/complianceNotification.service";
import IconButton from "@mui/material/IconButton";
import ChangeOrderData from "../types/changeOrder.type";
import ChangeOrderDataService from "../services/changeOrder.service";

type ChangeElement = React.ChangeEvent<HTMLInputElement>;

type Props = {

}

type State = {
    companyGroups: Array<any>,
    companyGroup: string,
    companyGroupId: number,
    dateOfIssue: string,
    scoresObtained: [{evaluacion_id: number, puntuacion: number}],
    scoresMessage: string,
    refScores: Array<any>,

    contractDeadline: string,
    contractTime: string,
    contractPlace: string,

    message: string,
    open: boolean,
}

export default class ComplianceNotification extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            companyGroups: [
                {
                    "nombreGrupoEmpresa": "Iridium",
                    "idGrupoEmpresa": 1,
                    "idConvocatoria": 1,
                    "codigoConvocatoria": "2020convo-2",
                    "tituloConvocatoria": "Convocatoria primera",
                    "id": 1
                },
                {
                    "nombreGrupoEmpresa": "Pacha",
                    "idGrupoEmpresa": 2,
                    "idConvocatoria": 1,
                    "codigoConvocatoria": "2020convo-2",
                    "tituloConvocatoria": "Convocatoria primera",
                    "id": 2
                },
                {
                    "nombreGrupoEmpresa": "AlgoSoft",
                    "idGrupoEmpresa": 3,
                    "idConvocatoria": 1,
                    "codigoConvocatoria": "2020convo-2",
                    "tituloConvocatoria": "Convocatoria primera",
                    "id": 3
                }
            ],
            companyGroup: "",
            companyGroupId: 0,
            dateOfIssue: "",
            scoresObtained: [{evaluacion_id: 0, puntuacion: NaN}],
            scoresMessage: "Tabla de puntajes: Alguno de los puntajes es incorrecto",
            refScores: [{
                evaluacion_id: 1,
                descripcion: "Cumplimiento de especificaciones del proponente",
                puntajeReferencial: 15,
            },{
                evaluacion_id: 2,
                descripcion: "Claridad en la organizacion de la empresa proponente",
                puntajeReferencial: 10,
            },{
                evaluacion_id: 3,
                descripcion: "Cumplimiento de especificaciones tecnicas",
                puntajeReferencial: 30,
            },{
                evaluacion_id: 4,
                descripcion: "Claridad de proceso de desarrollo",
                puntajeReferencial: 10,
            },{
                evaluacion_id: 5,
                descripcion: "Plazo de ejecucion",
                puntajeReferencial: 10,
            },{
                evaluacion_id: 6,
                descripcion: "Precio total",
                puntajeReferencial: 15,
            },{
                evaluacion_id: 7,
                descripcion: "Uso de herramientas en el proceso de desarrollo",
                puntajeReferencial: 10,
            }
            ],

            contractDeadline: "",
            contractTime: "",
            contractPlace: "",

            message: "",
            open: false,
        }
        this.retrieveComplianceNotification = this.retrieveComplianceNotification.bind(this);

        this.handleCompanyGroup = this.handleCompanyGroup.bind(this);
        this.handleDateOfIssue = this.handleDateOfIssue.bind(this);

        this.handleContractDeadline = this.handleContractDeadline.bind(this);
        this.handleContractTime = this.handleContractTime.bind(this);
        this.handleContractPlace = this.handleContractPlace.bind(this);

        this.checkScores = this.checkScores.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.postComplianceNotification = this.postComplianceNotification.bind(this);
    }

    componentDidMount() {
        this.retrieveComplianceNotification();
    }

    retrieveComplianceNotification() {
        ComplianceNotificationDataService.get("1")
            .then((response) => {
                this.setState({
                    companyGroups: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    handleCompanyGroup() {
        const cgps: any = this.state.companyGroups;
        let cgId: number = 0;

        for(let i = 0; i < cgps.length; i++) {
            if(cgps[i].nombre === this.state.companyGroup) {
                cgId = cgps[i].id;
            }
        }
        this.setState({
            companyGroupId: cgId,
        })
    }

    handleDateOfIssue(event: ChangeElement) {
        this.setState({
            dateOfIssue: event.target.value,
        })
    }

    handleContractDeadline(event: ChangeElement) {
        this.setState({
            contractDeadline: event.target.value.toString(),
        })
    }

    handleContractTime(event: ChangeElement) {
        this.setState({
            contractTime: event.target.value.toString(),
        })
    }

    handleContractPlace(event: ChangeElement) {
        this.setState({
            contractPlace: event.target.value,
        })
    }

    handleScores = (childData: any) => {
        this.setState(
            {scoresObtained: childData.scores}
        )
        this.checkScores();
    }

    checkScores() {
        for(let i = 0; i < this.state.refScores?.length; i++) {
            if(this.state.scoresObtained[i].puntuacion > this.state.refScores[i]?.puntajeReferencial || !this.state.scoresObtained[i].puntuacion) {
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

    handleSubmit() {
        this.checkScores();
        if(this.state.companyGroup === "") {
            this.setState({
                message: "No selecciono niguna Grupo Empresa",
                open: true,
            })
            return false;
        } else if(this.state.dateOfIssue === "") {
            this.setState({
                message: "No selecciono ninguna fecha de emision de contrato",
                open: true,
            });
            return false;
        } else if(this.state.scoresMessage !== "") {
            this.setState({
                message: this.state.scoresMessage,
                open: true,
            });
            return false;

        } else if(this.state.contractDeadline === ""){
            this.setState({
                message: "No selecciono ninguna fecha de firma de contrato",
                open: true,
            });
            return false;
        } else if(this.state.contractTime === ""){
            this.setState({
                message: "No selecciono ninguna hora de firma de contrato",
                open: true,
            });
            return false;
        } else if(!/[a-zA-Z]+/.test(this.state.contractPlace)){
            this.setState({
                message: "Lugar de reunion no valido",
                open: true,
            });
            return false;
        }
        this.setState({
            message: "Registro de notificacion de conformidad realizada exitosamente",
            open: true,
        });

        this.postComplianceNotification()
    }

    postComplianceNotification() {
        let ans: number = 0;
        for(let i = 0; i < this.state.companyGroups.length; i++) {
            if(this.state.companyGroupId === this.state.companyGroups[i]) {
                ans = i;
            }
        }

        const elem: ComplianceNotificationData = {
            grupoempresa_id: this.state.companyGroupId,
            postulacion_id: this.state.companyGroups[ans].id,
            convocatoria_id: this.state.companyGroups[ans].idConvocatoria,
            nombre: this.state.companyGroup,
            fechaFirma: this.state.contractDeadline,
            lugar: this.state.contractPlace,
            fecha_emision: this.state.dateOfIssue,
            evaluacion: this.state.scoresObtained,
        };

        let aidi: number = 0;

        ComplianceNotificationDataService.create(elem)
            .then((response) => {
                aidi = response.data.id;
                ComplianceNotificationDataService.generar(aidi + "");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { companyGroups } = this.state;
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
                                    ¿Está seguro de cancelar la el registro de su notificacion de conformidad?
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
                                value={this.state.companyGroup}
                                onChange={(e) => {
                                    this.setState({ companyGroup: e.target.value });
                                    this.handleCompanyGroup();
                                }}
                            >
                                <option value="" disabled selected>
                                    Seleccione una grupo empresa
                                </option>
                                {companyGroups && companyGroups.map((cg: any) => (
                                    <option value={cg.nombreGrupoEmpresa}>
                                        {cg.nombreGrupoEmpresa}
                                    </option>
                                ))}
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
                                onChange={this.handleDateOfIssue}
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
                                onChange={this.handleContractDeadline}
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
                                onChange={this.handleContractTime}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row m-3">
                        <label htmlFor="codigoPliego" className="col-md-4 col-form-label">
                            Lugar de reunion
                        </label>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                onChange={this.handleContractPlace}
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