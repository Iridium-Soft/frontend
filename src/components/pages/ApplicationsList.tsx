import { Component } from "react";
import { Link } from "react-router-dom";
import ApplicationsDataService from "../../services/applications.service";
import ApplicationsData from "../../types/applications.type";
import { PostulationDetailsModal } from "../modals/PostulationDetailsModal";
import { PostModal } from "../modals/PostModal";
import { Tooltip } from "@mui/material";
import "./ApplicationsList.css";
import "./AnnouncementsList.css";

type Props = {};

type State = {
  applications: Array<ApplicationsData>;
  currentApplication: ApplicationsData;
  typeDoc: string;
  loading: boolean;
};

export default class AnnouncementsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const defaultValuesCurrentApplication = {
      nombreGrupoEmpresa: "",
      idGrupoEmpresa: -1,
      idConvocatoria: -1,
      codigoConvocatoria: "",
      tituloConvocatoria: "",
      estado: -1,
      nombreEstado: "",
      adenda: "",
      orden_cambio: "",
      notificacion_conformidad: "",
      contrato: "",
      fechaRegistro: "",
      idPostulacion: -1,
    };

    this.state = {
        applications: [],
      //applications: [] as ApplicationsData[],
      currentApplication: defaultValuesCurrentApplication,
      typeDoc: "",
      loading: true,
    };

    this.retrieveApplications = this.retrieveApplications.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.renderStateTwoOptions = this.renderStateTwoOptions.bind(this);
    this.renderStateThreeOptions = this.renderStateThreeOptions.bind(this);
    this.renderStateFourOptions = this.renderStateFourOptions.bind(this);
    this.renderStateFiveOptions = this.renderStateFiveOptions.bind(this);
    this.renderStateSixOptions = this.renderStateSixOptions.bind(this);
    this.renderStateSevenOptions = this.renderStateSevenOptions.bind(this);
    this.renderStateNineOptions = this.renderStateNineOptions.bind(this);
    this.renderStateTenOptions = this.renderStateTenOptions.bind(this);
  }

  componentDidMount() {
    this.retrieveApplications();
  }

  retrieveApplications() {
    ApplicationsDataService.get(1).then(
        (response) => {
          this.setState(
              {
                applications: response.data,
                loading: false,
              }
          )
        }
    ).catch((e) => {
      console.log(e);
    })
  }

  refreshList() {
    this.retrieveApplications();
    this.setState({});
  }

  renderStateTwoOptions(idGrupoEmpresa: number) {
    return (
      <>
        <a
          className="btn btn-info dropdown-toggle announcement"
          role="button"
          id={`dropdown${idGrupoEmpresa}`}
          data-bs-toggle="dropdown"
          aria-expanded={false}
        >
          Opciones
        </a>
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdown${idGrupoEmpresa}`}
        >
          <li>
            <Link to="/application_review" style={{ textDecoration: 'none' }}><a className="dropdown-item">Revisar documentos</a></Link>
          </li>
        </ul>
      </>
    );
  }

  renderStateThreeOptions(idGrupoEmpresa: number) {
    return (
      <>
        <a
          className="btn btn-info dropdown-toggle announcement"
          role="button"
          id={`dropdown${idGrupoEmpresa}`}
          data-bs-toggle="dropdown"
          aria-expanded={false}
        >
          Opciones
        </a>
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdown${idGrupoEmpresa}`}
        >
          <li>
              <Link to="/grade_application" style={{ textDecoration: 'none' }}><a className="dropdown-item">Calificar documentos</a></Link>
          </li>
        </ul>
      </>
    );
  }

  renderStateFourOptions(
    application: ApplicationsData,
    idModal: string,
    index: number
  ) {
    return (
      <>
        <button
          className="btn btn-info btn-md dropdown-toggle announcement"
          type="button"
          id={`dropdownMenuButton${index}`}
          data-bs-toggle="dropdown"
          aria-expanded={false}
          onClick={() => {
            this.setState({ currentApplication: application });
          }}
        >
          Opciones
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdownMenuButton${index}`}
        >
          <li>
            <a
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target={`#${idModal}`}
              onClick={() => {
                this.setState({ typeDoc: "conformidad" });
              }}
            >
              Publicar notificacion de conformidad
            </a>
          </li>
        </ul>
      </>
    );
  }

  renderStateFiveOptions(
    application: ApplicationsData,
    idModal: string,
    index: number
  ) {
    return (
      <>
        <button
          className="btn btn-info btn-md dropdown-toggle announcement"
          type="button"
          id={`dropdownMenuButton${index}`}
          data-bs-toggle="dropdown"
          aria-expanded={false}
          onClick={() => {
            this.setState({ currentApplication: application });
          }}
        >
          Opciones
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdownMenuButton${index}`}
        >
          <li>
            <a
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target={`#${idModal}`}
              onClick={() => {
                this.setState({ typeDoc: "contrato" });
              }}
            >
              Publicar contrato
            </a>
          </li>
        </ul>
      </>
    );
  }

  renderStateSixOptions(idGrupoEmpresa: number) {
    return (
      <>
        <a
          className="btn btn-info dropdown-toggle announcement"
          role="button"
          id={`dropdown${idGrupoEmpresa}`}
          data-bs-toggle="dropdown"
          aria-expanded={false}
        >
          Opciones
        </a>
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdown${idGrupoEmpresa}`}
        >
          <li>
              <Link to="/grade_observations" style={{ textDecoration: 'none' }}><a className="dropdown-item">Calificar documentos</a></Link>
          </li>
        </ul>
      </>
    );
  }

  renderStateSevenOptions(
    application: ApplicationsData,
    idModal: string,
    index: number
  ) {
    return (
      <>
        <button
          className="btn btn-info btn-md dropdown-toggle announcement"
          type="button"
          id={`dropdownMenuButton${index}`}
          data-bs-toggle="dropdown"
          aria-expanded={false}
          onClick={() => {
            this.setState({ currentApplication: application });
          }}
        >
          Opciones
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdownMenuButton${index}`}
        >
          <li>
            <a
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target={`#${idModal}`}
              onClick={() => {
                this.setState({ typeDoc: "cambio" });
              }}
            >
              Publicar orden de cambio
            </a>
          </li>
        </ul>
      </>
    );
  }

  renderStateNineOptions(idGrupoEmpresa: number) {
    return (
      <>
        <a
          className="btn btn-info dropdown-toggle announcement"
          role="button"
          id={`dropdown${idGrupoEmpresa}`}
          data-bs-toggle="dropdown"
          aria-expanded={false}
        >
          Opciones
        </a>
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdown${idGrupoEmpresa}`}
        >
          <li>
              <Link to="/observations_review" style={{ textDecoration: 'none' }}><a className="dropdown-item">Revisar documentacion corregida</a></Link>
          </li>
        </ul>
      </>
    );
  }

  renderStateTenOptions(
    application: ApplicationsData,
    idModal: string,
    index: number
  ) {
    return (
      <>
        <button
          className="btn btn-info btn-md dropdown-toggle announcement"
          type="button"
          id={`dropdownMenuButton${index}`}
          data-bs-toggle="dropdown"
          aria-expanded={false}
          onClick={() => {
            this.setState({ currentApplication: application });
          }}
        >
          Opciones
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby={`dropdownMenuButton${index}`}
        >
          <li>
            <a
              className="dropdown-item"
              data-bs-toggle="modal"
              data-bs-target={`#${idModal}`}
              onClick={() => {
                this.setState({ typeDoc: "adenda" });
              }}
            >
              Publicar adenda
            </a>
          </li>
        </ul>
      </>
    );
  }

  render() {
    const { applications } = this.state;

    const modalDetailsApplicationId = "modal-details-application";
    const modalPostDocumentsId = "modal-post-documents";

    return (
      <>
        <PostulationDetailsModal
          modalId={modalDetailsApplicationId}
          currentApplication={this.state.currentApplication}
        />
        <PostModal
          modalId={modalPostDocumentsId}
          typeDoc={this.state.typeDoc}
          currentApplication={this.state.currentApplication}
        />
        <div className="container p-3 position-relative">
          <div className="row">
            <div className="col-12">
              <h3>Postulaciones</h3>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-4 ms-5">Nombre</div>
            <div className="col-3">Titulo</div>
            <div className="col-3">Estado</div>
          </div>
          {applications &&
            applications.map((application, index) => (
              <div key={index} className="row mx-0 mb-2">
                <button
                  className="btn btn-info col-8 btn-md application-left"
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalDetailsApplicationId}`}
                  onClick={() => {
                    this.setState({ currentApplication: application });
                  }}
                >
                  <div className="row">
                    <div className="col-md-5">
                      {application.nombreGrupoEmpresa}
                    </div>
                    <div className="col-md-7">
                      {application.tituloConvocatoria}
                    </div>
                  </div>
                </button>
                <Tooltip
                  title={
                    <p style={{ fontSize: "18px" }}>
                      {application.nombreEstado}
                    </p>
                  }
                  arrow
                >
                  <div
                    className={`btn btn-info col-3 btn-md application-right
                  ${
                    application.estado === 1 || application.estado === 8
                      ? "state-one"
                      : application.estado === 2 || application.estado === 9
                      ? "state-two"
                      : application.estado === 3 || application.estado === 6
                      ? "state-three"
                      : application.estado === 4 ||
                        application.estado === 5 ||
                        application.estado === 7 ||
                        application.estado === 10
                      ? "state-four"
                      : application.estado === 11
                      ? "state-five"
                      : ""
                  }`}
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalDetailsApplicationId}`}
                  >
                    {application.estado === 1 || application.estado === 8
                      ? "En espera de documentos"
                      : application.estado === 2 || application.estado === 9
                      ? "Postulacion no revisada"
                      : application.estado === 3 || application.estado === 6
                      ? "En espera de calificacion"
                      : application.estado === 4 ||
                        application.estado === 5 ||
                        application.estado === 7 ||
                        application.estado === 10
                      ? "En espera de publicacion"
                      : application.estado === 11
                      ? "Postulacion concluida"
                      : ""}
                  </div>
                </Tooltip>
                <div className="dropdown col-1">
                  {(application.estado === 2 &&
                    this.renderStateTwoOptions(application.idGrupoEmpresa)) ||
                    (application.estado === 3 &&
                      this.renderStateThreeOptions(
                        application.idGrupoEmpresa
                      )) ||
                    (application.estado === 4 &&
                      this.renderStateFourOptions(
                        application,
                        modalPostDocumentsId,
                        index
                      )) ||
                    (application.estado === 5 &&
                      this.renderStateFiveOptions(
                        application,
                        modalPostDocumentsId,
                        index
                      )) ||
                    (application.estado === 6 &&
                      this.renderStateSixOptions(application.idGrupoEmpresa)) ||
                    (application.estado === 7 &&
                      this.renderStateSevenOptions(
                        application,
                        modalPostDocumentsId,
                        index
                      )) ||
                    (application.estado === 9 &&
                      this.renderStateNineOptions(
                        application.idGrupoEmpresa
                      )) ||
                    (application.estado === 10 &&
                      this.renderStateTenOptions(
                        application,
                        modalPostDocumentsId,
                        index
                      ))}
                </div>
              </div>
            ))}
          {applications.length === 0 && !this.state.loading && (
            <div className="container">
              <div
                className="row align-items-center text-info"
                style={{ minHeight: "50vh" }}
              >
                <div className="col-12">
                  <div>
                    <h1>¡Vaya!</h1>
                  </div>
                  <div>
                    <h5 className="text-secondary">
                      Parece que no hay ningun elemento para mostrar
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          )}
            {this.state.loading && <div className="container">
                <div
                    className="row align-items-center text-info"
                    style={{minHeight: "60vh"}}>
                    <div className="col-2 offset-2">
                        <div className="spinner-border fs-1" style={{width: "4rem", height:"4rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
      </>
    );
  }
}

// <div className="dropdown col-2">
//   <a
//       className="btn btn-info dropdown-toggle announcement"
//       href="#"
//       role="button"
//       id={`dropdown${application.idGrupoEmpresa}`}
//       data-bs-toggle="dropdown"
//       aria-expanded={false}
//   >
//     Opciones
//   </a>
//
//   <ul
//       className="dropdown-menu"
//       aria-labelledby={`dropdown${application.idGrupoEmpresa}`}
//   >
//     <li>
//       <a
//           className="dropdown-item"
//           href="#"
//           data-bs-toggle="modal"
//           data-bs-target={`#${postModalId}`}
//           onClick={() => {
//             this.setState({
//               currentApplication: application,
//               modalTitle: "Publicar orden de cambio",
//               titleDoc: "Titulo de la convocatoria registrada",
//               typeDoc: "Orden de cambio",
//             });
//             this.setState({
//               functionPublicar: async () => {
//                 let res = "";
//                 await ChangeOrderDataService.updatePostOrder(
//                     this.state.currentApplication.idOrdenCambio
//                 ).then((response) => {
//                   res = response.data.mensaje;
//                 });
//                 return res;
//               },
//             });
//             ChangeOrderDataService.getOrderName(
//                 this.state.currentApplication.idOrdenCambio
//             ).then((res1) => {
//               ChangeOrderDataService.getOrderDownload(
//                   res1.data.documento
//               ).then((res2) => {
//                 this.setState({ downloadHref: res2.data });
//               });
//             });
//           }}
//       >
//         Publicar orden de cambio
//       </a>
//     </li>
//     <li>
//       <a
//           className="dropdown-item"
//           href="#"
//           data-bs-toggle="modal"
//           data-bs-target={`#${postModalId}`}
//           onClick={() => {
//             this.setState({
//               currentApplication: application,
//               modalTitle: "Publicar notificación de conformidad",
//               titleDoc: "Titulo de la convocatoria registrada",
//               typeDoc: "Notificación de conformidad",
//               functionPublicar: async () => {
//                 let res = "";
//                 await ConformityNotificationDataService.updatePostNotification(
//                     1
//                 ).then((response) => {
//                   res = response.data.mensaje;
//                 });
//                 return res;
//               },
//             });
//             ConformityNotificationDataService.getNotifyName(
//                 this.state.currentApplication.idNotiConf
//             ).then((res1) => {
//               ConformityNotificationDataService.getNotifyDownload(
//                   res1.data.documento
//               ).then((res2) => {
//                 this.setState({ downloadHref: res2.data });
//               });
//             });
//           }}
//       >
//         Publicar notificación de aceptación
//       </a>
//     </li>
//     <li>
//       <a
//           className="dropdown-item"
//           href="#"
//           data-bs-toggle="modal"
//           data-bs-target={`#${postModalId}`}
//           onClick={() => {
//             this.setState({
//               currentApplication: application,
//               modalTitle: "Publicar adenda",
//               titleDoc: "Titulo de la convocatoria registrada",
//               typeDoc: "Adenda",
//               downloadHref: "#",
//               functionPublicar: async () => {
//                 let res = "";
//                 await AddendumDataService.updatePostAddendum(
//                     1
//                 ).then((response) => {
//                   res = response.data.mensaje;
//                 });
//                 return res;
//               },
//             });
//           }}
//       >
//         Publicar adenda
//       </a>
//     </li>
//   </ul>
// </div>
