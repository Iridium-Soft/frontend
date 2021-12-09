import { Component } from "react";
import ApplicationsDataService from "../../services/applications.service";
import ChangeOrderDataService from "../../services/changeOrder.service";
import ConformityNotificationDataService from "../../services/conformityNotification.service";
import AddendumDataService from "../../services/addendum.service";
import "./AnnouncementsList.css";
import ApplicationsData from "../../types/applications.type";
import { PostulationDetails } from "../modals/PostulationDetailsModal";
import { PostModal } from "../modals/PostModal";
import WorkCalendarData from "../../types/workCalendar.type";
import DocumentsDataService from "../../services/documents.service";
import "./ApplicationsList.css";
import { Tooltip } from "@mui/material";

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
      applications: [
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 3,
          idGrupoEmpresa: 2,
          idNotiConf: 1,
          idOrdenCambio: 1,
          idPostulacion: 1,
          nombreGrupoEmpresa: "IridiumSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 1,
          nombreEstado: "En espera de reenvio de documentos"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 4,
          idGrupoEmpresa: 3,
          idNotiConf: 2,
          idOrdenCambio: 2,
          idPostulacion: 2,
          nombreGrupoEmpresa: "HolaSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 2,
          nombreEstado: "Aun no ha revisado la postulacion de esta grupo empresa"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 5,
          idGrupoEmpresa: 4,
          idNotiConf: 3,
          idOrdenCambio: 3,
          idPostulacion: 3,
          nombreGrupoEmpresa: "FracasoSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 3,
          nombreEstado: "Registrada con notificacion de conformidad"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 6,
          idGrupoEmpresa: 5,
          idNotiConf: 4,
          idOrdenCambio: 4,
          idPostulacion: 4,
          nombreGrupoEmpresa: "MundoSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 4,
          nombreEstado: "Ya se finalzo toto lo concerniente a esta postulacion"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 7,
          idGrupoEmpresa: 7,
          idNotiConf: 7,
          idOrdenCambio: 7,
          idPostulacion: 7,
          nombreGrupoEmpresa: "MundoSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 5,
          nombreEstado: "Ya se finalzo toto lo concerniente a esta postulacion"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 8,
          idGrupoEmpresa: 8,
          idNotiConf: 8,
          idOrdenCambio: 8,
          idPostulacion: 8,
          nombreGrupoEmpresa: "MundoSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 6,
          nombreEstado: "Ya se finalzo toto lo concerniente a esta postulacion"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 9,
          idGrupoEmpresa: 9,
          idNotiConf: 9,
          idOrdenCambio: 9,
          idPostulacion:9,
          nombreGrupoEmpresa: "MundoSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 7,
          nombreEstado: "Ya se finalzo toto lo concerniente a esta postulacion"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 10,
          idGrupoEmpresa: 10,
          idNotiConf: 10,
          idOrdenCambio: 10,
          idPostulacion: 10,
          nombreGrupoEmpresa: "MundoSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 8,
          nombreEstado: "Ya se finalzo toto lo concerniente a esta postulacion"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 11,
          idGrupoEmpresa: 11,
          idNotiConf: 11,
          idOrdenCambio: 11,
          idPostulacion: 11,
          nombreGrupoEmpresa: "MundoSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 9,
          nombreEstado: "Ya se finalzo toto lo concerniente a esta postulacion"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 12,
          idGrupoEmpresa: 12,
          idNotiConf: 12,
          idOrdenCambio: 12,
          idPostulacion: 12,
          nombreGrupoEmpresa: "MundoSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 10,
          nombreEstado: "Ya se finalzo toto lo concerniente a esta postulacion"
        },
        {
          codigoConvocatoria: "",
          fechaRegistro: "",
          idConvocatoria: 13,
          idGrupoEmpresa: 13,
          idNotiConf: 13,
          idOrdenCambio: 13,
          idPostulacion: 13,
          nombreGrupoEmpresa: "MundoSoft",
          tituloConvocatoria: "Titulo convocatoria",
          estado: 11,
          nombreEstado: "Ya se finalzo toto lo concerniente a esta postulacion"
        }
      ],
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
        estado: -1,
        nombreEstado: "",
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
    // ApplicationsDataService.get("1")
    //   .then((response) => {
    //     this.setState({
    //       applications: response.data,
    //     });
    //     console.log(response.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }

  refreshList() {
    this.retrieveApplications();
    this.setState({});
  }

  renderStateTwoOptions(idGrupoEmpresa: number) {
    return(
        <>
          <a
              className="btn btn-info dropdown-toggle announcement"
              href="#"
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
              <a className="dropdown-item">
                Revisar documentos
              </a>
            </li>
          </ul>
        </>
    );
  }

  renderStateThreeOptions(idGrupoEmpresa: number) {
    return(
        <>
          <a
              className="btn btn-info dropdown-toggle announcement"
              href="#"
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
              <a className="dropdown-item">
                Calificar observacion
              </a>
            </li>
          </ul>
        </>
    );
  }

  renderStateFourOptions(idGrupoEmpresa: number) {
    return(
        <>
          <a
              className="btn btn-info dropdown-toggle announcement"
              href="#"
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
              <a className="dropdown-item">
                Publicar notificacion de conformidad
              </a>
            </li>
          </ul>
        </>
    );
  }

  renderStateFiveOptions(idGrupoEmpresa: number) {
    return(
        <>
          <a
              className="btn btn-info dropdown-toggle announcement"
              href="#"
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
              <a className="dropdown-item">
                Publicar contrato
              </a>
            </li>
          </ul>
        </>
    );
  }

  renderStateSixOptions(idGrupoEmpresa: number) {
    return(
        <>
          <a
              className="btn btn-info dropdown-toggle announcement"
              href="#"
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
              <a className="dropdown-item">
                Calificar documentos
              </a>
            </li>
          </ul>
        </>
    );
  }

  renderStateSevenOptions(idGrupoEmpresa: number) {
    return(
        <>
          <a
              className="btn btn-info dropdown-toggle announcement"
              href="#"
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
              <a className="dropdown-item">
                Publicar orden de cambio
              </a>
            </li>
          </ul>
        </>
    );
  }

  renderStateNineOptions(idGrupoEmpresa: number) {
    return(
        <>
          <a
              className="btn btn-info dropdown-toggle announcement"
              href="#"
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
              <a className="dropdown-item">
                Revisar documentacion corregida
              </a>
            </li>
          </ul>
        </>
    );
  }

  renderStateTenOptions(idGrupoEmpresa: number) {
    return(
        <>
          <a
              className="btn btn-info dropdown-toggle announcement"
              href="#"
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
              <a className="dropdown-item">
                Publicar adenda
              </a>
            </li>
          </ul>
        </>
    );
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
          <div className="row mb-2">
              <div className="col-3 ms-5">
                Nombre
              </div>
              <div className="col-3">
                Titulo
              </div>
              <div className="col-3">
                Estado
              </div>
          </div>
          {applications &&
            applications.map((application: ApplicationsData) => (
              <div key={application.idGrupoEmpresa} className="row mx-0 mb-2">
                <button
                  className="btn btn-info col-7 btn-md application-left"
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
                    <div className="col-md-5">
                      {application.nombreGrupoEmpresa}
                    </div>
                    <div className="col-md-7">
                      {application.tituloConvocatoria}
                    </div>
                  </div>
                </button>
                <Tooltip title={<p style={{fontSize: '18px'}}>{application.nombreEstado}</p>} arrow>
                  <div className={`btn btn-info col-3 btn-md application-right 
                  ${(application.estado === 1 || application.estado === 8) ? "state-one" : ((application.estado === 2 || application.estado === 9) ? "state-two": ((application.estado === 3 || application.estado === 6) ? "state-three" : ((application.estado === 4 || application.estado === 5 || application.estado === 7 || application.estado === 10) ? "state-four" : ((application.estado === 11) ? "state-five" : ""))))}`}
                          data-bs-toggle="modal"
                          data-bs-target={`#${modalId}`}
                  >
                    {(application.estado === 1 || application.estado === 8) ? "En espera de documentos" : ((application.estado === 2 || application.estado === 9) ? "Postulacion no revisada": ((application.estado === 3 || application.estado === 6) ? "En espera de calificacion" : ((application.estado === 4 || application.estado === 5 || application.estado === 7 || application.estado === 10) ? "En espera de publicacion" : ((application.estado === 11) ? "Postulacion concluida" : ""))))}
                  </div>
                </Tooltip>
                <div className="dropdown col-2">

                  {(application.estado === 2 && this.renderStateTwoOptions(application.idGrupoEmpresa)) || (application.estado === 3 && this.renderStateThreeOptions(application.idGrupoEmpresa)) || (application.estado === 4 && this.renderStateFourOptions(application.idGrupoEmpresa)) || (application.estado === 5 && this.renderStateFiveOptions(application.idGrupoEmpresa)) || (application.estado === 6 && this.renderStateSixOptions(application.idGrupoEmpresa)) || (application.estado === 7 && this.renderStateSevenOptions(application.idGrupoEmpresa)) || (application.estado === 9 && this.renderStateNineOptions(application.idGrupoEmpresa)) || (application.estado === 10 && this.renderStateTenOptions(application.idGrupoEmpresa))}
                </div>
              </div>
            ))}
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
