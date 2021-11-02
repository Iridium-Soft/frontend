import { Component } from "react";
import ApplicationsDataService from "../services/applications.service";
import "./AnnouncementsList.css";
import ApplicationsData from "../types/applications.type";

type Props = {};

type State = {
    applications: Array<ApplicationsData>;
    currentApplication: ApplicationsData;
};

export default class AnnouncementsList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveApplications = this.retrieveApplications.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            applications: [],
            currentApplication: {
                id: "",
                nombreGrupoEmp: "",
                tituloConv: "",
                codigoConv: "",
                estadoEd: "",
            },
        };
    }

    componentDidMount() {
        this.retrieveApplications();
    }

    retrieveApplications() {
        ApplicationsDataService.getAll()
            .then((response) => {
                this.setState({
                    applications: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveApplications();
        this.setState({});
    }

    render() {
        const { applications } = this.state;
        const modalId: string = "modalAplicar";

        return (
            <>
                <div className="container p-3 position-relative">
                    <div className="row">
                        <div className="col-8">
                            <h3>Convocatorias Publicas</h3>
                        </div>
                        <div className="col-4">
                            <p className="text-secondary pb-0">
                                <strong>Consultor: {}</strong>
                            </p>
                        </div>
                    </div>
                    {applications &&
                    applications.map((application: ApplicationsData) => (
                        <>
                            <div className="row mx-0 mb-2">
                                <button
                                    className="btn btn-info col-9 btn-md announcement"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#${modalId}`}
                                    onClick={() =>
                                        this.setState({ currentApplication: application })
                                    }
                                >
                                    <div className="row">
                                        <div className="col-xs-12 col-md-6 col-lg-8">
                                            {application.titulo}
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            {application.codigo}
                                        </div>
                                    </div>
                                </button>

                                <div className="dropdown col-3">
                                    <button
                                        className="btn btn-info dropdown-toggle announcement"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Archivos
                                    </button>
                                    <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                    >
                                        <li>
                                            <a
                                                className="dropdown-item"
                                                href={this.state.currentApplication.documento}
                                            >
                                                Descargar Convocatoria
                                            </a>
                                        </li>
                                        {() =>
                                            this.state.currentApplication.pliego !== "" && (
                                                <li>
                                                    <a className="dropdown-item" href="#">
                                                        Descargar Pliego de Especificacion
                                                    </a>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </>
        );
    }
}
