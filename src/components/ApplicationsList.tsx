import { Component } from "react";
import ApplicationsDataService from "../services/applications.service";
import ChangeOrderDataService from "../services/changeOrder.service";
import ConformityNotificationDataService from "../services/conformityNotification.service";
import AddendumDataService from "../services/addendum.service";
import "./AnnouncementsList.css";
import ApplicationsData from "../types/applications.type";
import { PostulationDetails } from "./PostulationDetailsModal";
import { PostModal } from "./PostModal";
import WorkCalendarData from "../types/workCalendar.type";
import DocumentsDataService from "../services/documents.service";

type Props = {};

type State = {
  applications: Array<ApplicationsData>;
  currentApplication: ApplicationsData;
  modalTitle: string;
  titleDoc: string;
  typeDoc: string;
  downloadHref: string;
  milestones: WorkCalendarData;
  functionPublicar: any;

  partAHref: string;
  partBHref: string;
  warrantyHref: string;
  presentationHref: string;
  constitutionHref: string;
};

export default class AnnouncementsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveApplications = this.retrieveApplications.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      applications: [],
      currentApplication: {
        codigoConvocatoria: "",
        fechaRegistro: "",
        idConvocatoria: -1,
        idGrupoEmpresa: -1,
        idNotiConf: -1,
        idOrdenCambio: 2,
        idPostulacion: 2,
        nombreGrupoEmpresa: "",
        tituloConvocatoria: "",
      },

      milestones: { id: "", hitos: [] },

      modalTitle: "",
      titleDoc: "",
      typeDoc: "",
      downloadHref: "",
      functionPublicar: () => "",

      partAHref: "",
      partBHref: "",
      warrantyHref: "",
      presentationHref: "",
      constitutionHref: "",
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

    return (
      <>
        <PostulationDetails
          modalId={modalId}
          milestones={this.state.milestones}
          nameAnnouncement={this.state.currentApplication.tituloConvocatoria}
          nameCompany={this.state.currentApplication.nombreGrupoEmpresa}
          codeAnnouncement={this.state.currentApplication.codigoConvocatoria}
          partAHref={this.state.partAHref}
          partBHref={this.state.partBHref}
          warrantyHref={this.state.warrantyHref}
          presentationHref={this.state.presentationHref}
          constitutionHref={this.state.constitutionHref}
          fechaReg={this.state.currentApplication.fechaRegistro}
        />
        <PostModal
          modalId={postModalId}
          nameCompany={this.state.currentApplication.nombreGrupoEmpresa}
          modalTitle={this.state.modalTitle}
          functionPublicar={this.state.functionPublicar}
          titleDoc={this.state.currentApplication.tituloConvocatoria}
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
              <div key={application.idGrupoEmpresa} className="row mx-0 mb-2">
                <button
                  className="btn btn-info col-8 btn-md announcement"
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalId}`}
                  onClick={() => {
                    this.setState({ currentApplication: application });
                    DocumentsDataService.getPostulationDocs(
                      this.state.currentApplication.idPostulacion
                    ).then((res) => {
                      this.setState({
                        partAHref: res.data.parteA,
                        partBHref: res.data.parteB,
                        warrantyHref: res.data.boletaDeGarantia,
                        presentationHref: res.data.cartaDePresentacion,
                        constitutionHref: res.data.constitucion,
                      });
                    });
                    ApplicationsDataService.getApplicationMilestones(
                      application.idPostulacion
                    ).then((response) => {
                      this.setState({ milestones: { hitos: response.data } });
                    });
                  }}
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
                            titleDoc: "Titulo de la convocatoria registrada",
                            typeDoc: "Orden de cambio",
                          });
                          this.setState({
                            functionPublicar: async () => {
                              let res = "";
                              await ChangeOrderDataService.updatePostOrder(
                                this.state.currentApplication.idOrdenCambio
                              ).then((response) => {
                                res = response.data.mensaje;
                              });
                              return res;
                            },
                          });
                          ChangeOrderDataService.getOrderName(
                            this.state.currentApplication.idOrdenCambio
                          ).then((res1) => {
                            ChangeOrderDataService.getOrderDownload(
                              res1.data.documento
                            ).then((res2) => {
                              this.setState({ downloadHref: res2.data });
                            });
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
                            modalTitle: "Publicar notificación de conformidad",
                            titleDoc: "Titulo de la convocatoria registrada",
                            typeDoc: "Notificación de conformidad",
                            functionPublicar: async () => {
                              let res = "";
                              await ConformityNotificationDataService.updatePostNotification(
                                1
                              ).then((response) => {
                                res = response.data.mensaje;
                              });
                              return res;
                            },
                          });
                          ConformityNotificationDataService.getNotifyName(
                            this.state.currentApplication.idNotiConf
                          ).then((res1) => {
                            ConformityNotificationDataService.getNotifyDownload(
                              res1.data.documento
                            ).then((res2) => {
                              this.setState({ downloadHref: res2.data });
                            });
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
                            titleDoc: "Titulo de la convocatoria registrada",
                            typeDoc: "Adenda",
                            downloadHref: "#",
                            functionPublicar: async () => {
                              let res = "";
                              await AddendumDataService.updatePostAddendum(
                                1
                              ).then((response) => {
                                res = response.data.mensaje;
                              });
                              return res;
                            },
                          });
                        }}
                      >
                        Publicar adenda
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }
}
