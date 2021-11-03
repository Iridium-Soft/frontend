import { Component } from "react";
import AnnouncementDataService from "../services/announcement.service";
import "./AnnouncementsList.css";
import AnnouncementData from "../types/announcement.type";
import AnnouncementDetails from "./AnnouncementDetailsModal";
import DocumentsDataService from "../services/documents.service";

type Props = {};

type State = {
  announcements: Array<AnnouncementData>;
  currentAnnouncement: AnnouncementData;
  currectDocument: string;
};

export default class AnnouncementsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.retrieveAnnouncementDoc = this.retrieveAnnouncementDoc.bind(this);

    this.state = {
      announcements: [],
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
    };
  }

  componentDidMount() {
    this.retrieveAnnouncements();
  }

  retrieveAnnouncements() {
    AnnouncementDataService.getAll()
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
                      {() =>
                        this.state.currentAnnouncement.pliego !== "" && (
                          <li>
                            <a className="dropdown-item" href="">
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
