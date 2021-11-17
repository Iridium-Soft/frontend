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
            scoresObtained: [{evaluacion_id: 0, puntuacion: NaN}],
            scoresMessage: "Tabla de puntajes: Alguno de los puntajes es incorrecto",
            observations: [
                {
                    documento: "",
                    seccion: "",
                    descripcion: ""
                }
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

        let arreglito: any = this.state.observations;
        arreglito.pop();
        this.setState(
            {
                observations: arreglito,
            }
        )

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
        this.checkScores = this.checkScores.bind(this);
    }

    componentDidMount() {
        this.retrieveChangeOrderData();
    }

    retrieveChangeOrderData() {
        ChangeOrderDataService.get("1")
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
        } else if(this.state.dateOfIssue === "") {
            this.setState({
                message: "No selecciono ninguna fecha de contrato",
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
                    message: "No registro ninguna observacion",
                    open: true,
                });
                return false;
        } else if(this.state.correctionDeadline === ""){
            this.setState({
                message: "No selecciono ninguna fecha de entrega de correccion",
                open: true,
            });
            return false;
        } else if(this.state.correctionTime === ""){
            this.setState({
                message: "No selecciono ninguna hora de entrega de correccion",
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
        this.postChangeOrder();
    }

    postChangeOrder() {
        let ans: number = 0;
        for(let i = 0; i < this.state.companyGroups.length; i++) {
            if(this.state.companyGroupId === this.state.companyGroups[i]) {
                ans = i;
            }
        }
        const elem: ChangeOrderData = {
            grupoempresa_id: this.state.companyGroupId,
            postulacion_id: this.state.companyGroups[ans].postulacion_id,
            convocatoria_id: this.state.companyGroups[ans].convocatoria_id,
            nombre: this.state.companyGroup,
            cod_orden_cambio: "j",
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
                    "Tabla de observaciones: No selecciono nigun documento",
                open: true,
            });
            return false;
        } else if(!/^[.0-9]+$/.test(this.state.section)) {
            this.setState({
                message:
                    "Tabla de observaciones: Seccion incorrecta",
                open: true,
            });
            return false;
        } else if(!/[a-zA-Z]+/.test(this.state.description)) {
            this.setState({
                message:
                    "Tabla de observaciones: Descripcion incorrecta",
                open: true,
            });
            return false;
        }
        const ob: any = {
            documento: this.state.document,
            seccion: this.state.section,
            descripcion: this.state.description,
        }
        let variable: any = this.state.observations;
        variable.push(ob);
        this.setState({
            observations: variable,
        });
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

    render() {
        const { observations, companyGroups } = this.state;
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
                                        <td>{obs.documento}</td>
                                        <td>{obs.seccion}</td>
                                        <td>{obs.descripcion}</td>
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