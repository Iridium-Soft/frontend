import { Component } from "react";
import AnnouncementDataService from "../services/announcement.service";
import "./AnnouncementsList.css";
import AnnouncementData from "../types/announcement.type";
import AnnouncementDetails from "./AnnouncementDetailsModal";

type Props = {};

type State = {
  announcements: Array<AnnouncementData>;
  currentAnnouncement: AnnouncementData;
};

export default class AnnouncementsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
    this.refreshList = this.refreshList.bind(this);

    this.state = {
      announcements: [],
      currentAnnouncement: {
        id: "",
        titulo: "",
        encargado: "",
        codigo: "",
        descripcion: "",
        fechaLimRec: "",
        fechaIniDur: "",
        fechaFinDur: "",
        documento: "",
        publica: false,
        pliego: "",
      },
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

  refreshList() {
    this.retrieveAnnouncements();
    this.setState({});
  }

  render() {
    const { announcements } = this.state;
    const modalId: string = "modalAplicar";

    return (
      <>
        <AnnouncementDetails
          announcement={this.state.currentAnnouncement}
          modalId={modalId}
        />
        <div className="container p-3 position-relative">
          <h2 className="row justify-content-center">Lista de convocatorias</h2>
          {announcements &&
            announcements.map((announcement: AnnouncementData) => (
              <>
                <div className="row mx-0 mb-2">
                  <button
                    className="btn btn-info col-12 btn-md announcement"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                    onClick={() =>
                      this.setState({ currentAnnouncement: announcement })
                    }
                  >
                    <div className="row">
                      <div className="col-xs-12 col-md-6 col-lg-4">
                        {announcement.titulo}
                      </div>
                      <div className="col-md-2 col-lg-4 d-none d-lg-block text-end">
                        {announcement.codigo}
                      </div>
                      <div className="col-md-4 col-lg-4 d-none d-md-block text-end">
                        {announcement.encargado}
                      </div>
                    </div>
                  </button>
                </div>
              </>
            ))}
        </div>
      </>
    );
  }
}
