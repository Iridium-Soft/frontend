import { Component } from "react";
import ApplicationsDataService from "../services/applications.service";
import "./AnnouncementsList.css";
import ApplicationsData from "../types/applications.type";
import { PostulationDetails } from "./PostulationDetailsModal";
import { PostModal } from "./PostModal";

type Props = {};

type State = {
  applications: Array<ApplicationsData>;
  currentApplication: ApplicationsData;
  modalTitle: string;
  messageTrue: string;
  messageFalse: string;
  titleDoc: string;
  typeDoc: string;
  downloadHref: string;
};

export default class AnnouncementsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveApplications = this.retrieveApplications.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      applications: [],
      currentApplication: {
        nombreGrupoEmpresa: "",
        idGrupoEmpresa: -1,
        idConvocatoria: -1,
        codigoConvocatoria: "",
        tituloConvocatoria: "",
      },

      modalTitle: "",
      messageTrue: "",
      messageFalse: "",
      titleDoc: "",
      typeDoc: "",
      downloadHref: "",
    };
  }

  componentDidMount() {
    this.retrieveApplications();
  }

  retrieveApplications() {
    ApplicationsDataService.get("1")
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

    const postModalId = "postModal";
    const modalId: string = "modalPostulacion";

    const publicar = () => {
      return true;
    };

    return (
      <>
        <PostulationDetails
          modalId={modalId}
          milestones={{ id: "", hitos: [] }}
        />
        <PostModal
          modalId={postModalId}
          modalTitle={this.state.modalTitle}
          functionPublicar={publicar}
          messageTrue={this.state.messageTrue}
          messageFalse={this.state.messageFalse}
          titleDoc={this.state.titleDoc}
          typeDoc={this.state.typeDoc}
          downloadHref={this.state.downloadHref}
        />
        <div className="container p-3 position-relative">
          <div className="row">
            <div className="col-8">
              <h3>Postulaciones</h3>
            </div>
          </div>
          {applications &&
            applications.map((application: ApplicationsData) => (
              <>
                <div className="row mx-0 mb-2">
                  <button
                    className="btn btn-info col-8 btn-md announcement"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                    onClick={() =>
                      this.setState({ currentApplication: application })
                    }
                  >
                    <div className="row">
                      <div className="col-xs-12 col-md-3">
                        {application.nombreGrupoEmpresa}
                      </div>
                      <div className="col-md-3">
                        {application.tituloConvocatoria}
                      </div>
                      <div className="col-md-3">
                        {application.codigoConvocatoria}
                      </div>
                    </div>
                  </button>
                  <div className="dropdown col-3">
                    <a
                      className="btn btn-info dropdown-toggle announcement"
                      href="#"
                      role="button"
                      id={`dropdown${application.idGrupoEmpresa}`}
                      data-bs-toggle="dropdown"
                      aria-expanded={false}
                    >
                      Opciones
                    </a>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdown${application.idGrupoEmpresa}`}
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target={`#${postModalId}`}
                          onClick={() => {
                            this.setState({
                              currentApplication: application,
                              modalTitle: "Publicar orden de cambio",
                              messageTrue:
                                "Orden de cambio correctamente publicada",
                              messageFalse:
                                "La orden de cambio ya está publicada",
                              titleDoc: "Titulo de la convocatoria registrada",
                              typeDoc: "Orden de cambio",
                              downloadHref: "#",
                            });
                          }}
                        >
                          Publicar orden de cambio
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target={`#${postModalId}`}
                          onClick={() => {
                            this.setState({
                              currentApplication: application,
                              modalTitle:
                                "Publicar notificación de conformidad",
                              messageTrue:
                                "Notificación de conformidad correctamente publicada",
                              messageFalse:
                                "La notificación de conformidad ya está publicada",
                              titleDoc: "Titulo de la convocatoria registrada",
                              typeDoc: "Notificación de conformidad",
                              downloadHref: "#",
                            });
                          }}
                        >
                          Publicar notificación de aceptación
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target={`#${postModalId}`}
                          onClick={() => {
                            this.setState({
                              currentApplication: application,
                              modalTitle: "Publicar adenda",
                              messageTrue: "Adenda correctamente publicada",
                              messageFalse: "La adenda ya está publicada",
                              titleDoc: "Titulo de la convocatoria registrada",
                              typeDoc: "Adenda",
                              downloadHref: "#",
                            });
                          }}
                        >
                          Publicar adenda
                        </a>
                      </li>
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
