import { Component } from "react";
import ApplicationsDataService from "../services/applications.service";
import "./AnnouncementsList.css";
import ApplicationsData from "../types/applications.type";
import { PostulationDetails } from "./PostulationDetailsModal";

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
    const modalId: string = "modalPostulacion";

    return (
      <>
        <PostulationDetails modalId={modalId} milestones={[]} />
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
                    className="btn btn-info col-12 btn-md announcement"
                    data-bs-toggle="modal"
                    data-bs-target={`#${modalId}`}
                    onClick={() =>
                      this.setState({ currentApplication: application })
                    }
                  >
                    <div className="row">
                      <div className="col-xs-12 col-md-3">
                        {application.nombreGrupoEmp}
                      </div>
                      <div className="col-md-3">{application.tituloConv}</div>
                      <div className="col-md-3">{application.codigoConv}</div>
                      <div className="col-md-3">{application.estadoEd}</div>
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
