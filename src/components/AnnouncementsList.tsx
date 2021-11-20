import { Component } from "react";
import AnnouncementDataService from "../services/announcement.service";
import "./AnnouncementsList.css";
import AnnouncementData from "../types/announcement.type";
import AnnouncementDetails from "./AnnouncementDetailsModal";
import DocumentsDataService from "../services/documents.service";
import PetisDataService from "../services/petis.service"

type Props = {};

type State = {
  announcements: Array<AnnouncementData>;
  currentAnnouncement: AnnouncementData;
  currectDocument: string;
  currentPetis: string;
};

export default class AnnouncementsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.retrieveAnnouncementDoc = this.retrieveAnnouncementDoc.bind(this);

    this.state = {
      announcements: [
        {
          codigo: "codigo 1",
          titulo: "titulo 1",
          descripcion: "descripcion 1",
          consultorEnc: "consultorEnc 1",
          fechaLimRec: "1635567441",
          fechaIniDur: "1635567441",
          fechaFinDur: "1635567441",
          documento: "documento 1",
          publica: false,
          pliego: "P1",
          id: "1"
        },
        {
          codigo: "codigo 1",
          titulo: "titulo 1",
          descripcion: "descripcion 1",
          consultorEnc: "consultorEnc 1",
          fechaLimRec: "1635567441",
          fechaIniDur: "1635567441",
          fechaFinDur: "1635567441",
          documento: "documento 1",
          publica: false,
          pliego: "",
          id: "2"
        },

      ],
      currentAnnouncement: {
        id: "",
        titulo: "",
        consultorEnc: "",
        codigo: "",
        descripcion: "",
        fechaLimRec: "",
        fechaIniDur: "",
        fechaFinDur: "",
        documento: "",
        publica: false,
        pliego: "",
      },
      currectDocument: "",
      currentPetis: "",
    };
  }

  componentDidMount() {
    this.retrieveAnnouncements();
  }

  retrieveAnnouncements() {
    AnnouncementDataService.getAnnouncementsPub()
      .then((response) => {
        this.setState({
          announcements: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveAnnouncementDoc = () => {
    DocumentsDataService.get(this.state.currentAnnouncement.documento)
      .then((response) => {
        this.setState({
          currectDocument: response.data,
        });
        if(this.state.currentAnnouncement.pliego !== "") {
          DocumentsDataService.getPliegoByConvocatoria(this.state.currentAnnouncement.id).then((response) => {
            this.setState({
              currentPetis: response.data,
            })
          }).catch((e) => {
            console.log(e);
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  refreshList() {
    this.retrieveAnnouncements();
    this.setState({});
  }

  render() {
    const { announcements } = this.state;
    const consultor = announcements[0]?.consultorEnc;
    const modalId: string = "modalAplicar";

    return (
      <>
        <AnnouncementDetails
          announcement={this.state.currentAnnouncement}
          modalId={modalId}
        />
        <div className="container p-3 position-relative">
          <div className="row">
            <div className="col-8">
              <h3>Convocatorias Publicas</h3>
            </div>
            <div className="col-4">
              <p className="text-secondary pb-0">
                <strong>Consultor: {consultor}</strong>
              </p>
            </div>
          </div>
          {announcements &&
            announcements.map((announcement: AnnouncementData) => (
              <>
                <div className="row mx-0 mb-2">
                  <button
                    className="btn btn-info col-9 btn-md announcement"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                    onClick={() =>
                      this.setState({ currentAnnouncement: announcement })
                    }
                  >
                    <div className="row">
                      <div className="col-xs-12 col-md-6 col-lg-8">
                        {announcement.titulo}
                      </div>
                      <div className="col-md-6 col-lg-4">
                        {announcement.codigo}
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
                      onClick={async () => {
                        await this.setState({
                          currentAnnouncement: announcement,
                        });
                        await this.retrieveAnnouncementDoc();
                      }}
                    >
                      Archivos
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          download={`${this.state.currentAnnouncement.titulo}.pdf`}
                          className="dropdown-item"
                          href={this.state.currectDocument}
                          onClick={async () => {
                            await this.retrieveAnnouncementDoc();
                          }}
                        >
                          Descargar Convocatoria
                        </a>
                      </li>
                      {this.state.currentAnnouncement.pliego && (
                        <li>
                          <a className="dropdown-item" href="">
                            Descargar Pliego de Especificacion
                          </a>
                        </li>
                        )}
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
