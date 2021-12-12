import { Component } from "react";
import AnnouncementDataService from "../../services/announcement.service";
import "./AnnouncementsList.css";
import AnnouncementData from "../../types/announcement.type";
import PostAnnouncement from "../modals/PostAnnouncement";
import PostSimpleAnnouncement from "../modals/PostSimpleAnnouncement";
import PostSpecificationsTIS from "../modals/PostSpecificationsTIS";
import PetisData from "../../types/petis.type";
import PetisDataService from "../../services/petis.service";
import PetisDetailModal from "../modals/PetisDetailModal";
type Props = {};

type State = {
  announcements: Array<AnnouncementData>;
  currentAnnouncement: AnnouncementData;
  currentPetis: PetisData;
};

export default class MyAnnouncementsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.retrievePetis = this.retrievePetis.bind(this);

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
      currentPetis: {
        id: "",
        titulo: "",
        codigo: "",
        convocatoria_id: "",
        documento: "",
        publica: false,
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
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAnnouncements();
    this.setState({});
  }

  retrievePetis(codConv: string) {
    PetisDataService.get(codConv)
      .then((response) => {
        this.setState({
          currentPetis: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { announcements } = this.state;
    const modalIdAplicarPliego: string = "modalAplicarPliego";
    const modalIdAplicarConv: string = "modalAplicarConvocatoria";
    const modalIdPliego: string = "modalPliego";
    return (
      <>
        <PostSpecificationsTIS
          petis={this.state.currentPetis}
          modalId={modalIdAplicarPliego}
          tituloConv={this.state.currentAnnouncement.titulo}
        />
        <PostSimpleAnnouncement
          announcement={this.state.currentAnnouncement}
          refresh={this.refreshList}
          modalId={modalIdAplicarConv}
        />
        <PetisDetailModal
          petis={this.state.currentPetis}
          announcement={this.state.currentAnnouncement.titulo}
          modalId={modalIdPliego}
        />
        <div className="container p-3 position-relative">
          <h2 className="row"> <div className="col-8">
            <h3> Mis convocatorias</h3>
          </div></h2>
          {announcements &&
            announcements.map((announcement: AnnouncementData) => (
              <>
                <div className="row mx-0 mb-2">
                  <button
                    className="btn btn-info col-8 btn-md announcement"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalIdPliego}`}
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
                      {announcement.publica ? (
                        <div className="col-md-2 col-lg-4 d-none d-lg-block text-end">
                          {`Publicado `}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <i className="fa fa-circle text-success pl-1"> </i>
                        </div>
                      ) : (
                        <div className="col-md-2 col-lg-4 d-none d-lg-block text-end">
                          {`No publicado `}
                          <i className="fa fa-circle text-danger"></i>
                        </div>
                      )}
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
                      Opciones
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <button
                          className="btn col-8 btn-md "
                          data-bs-toggle="modal"
                          data-bs-target={`#${modalIdAplicarConv}`}
                          onClick={() => {
                            this.setState({
                              currentAnnouncement: announcement,
                            });
                          }}
                        >
                          Publicar convocatoria
                        </button>
                        <button
                          className="btn col-8 btn-md text-start"
                          data-bs-toggle="modal"
                          data-bs-target={`#${modalIdAplicarPliego}`}
                          onClick={async () => {
                            await this.setState({
                              currentAnnouncement: announcement,
                            });
                            await this.retrievePetis(
                              this.state.currentAnnouncement.id
                            );
                          }}
                        >
                          Publicar pliego
                        </button>
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
