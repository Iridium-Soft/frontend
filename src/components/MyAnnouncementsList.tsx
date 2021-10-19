import { Component } from "react";
import AnnouncementDataService from "../services/announcement.service";
import "./AnnouncementsList.css";
import AnnouncementData from "../types/announcement.type";

type Props = {};

type State = {
    announcements: Array<AnnouncementData>,
};

export default class MyAnnouncementsList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.retrieveAnnouncements = this.retrieveAnnouncements.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.state = {
            announcements: [],
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
        this.setState({
        });
    }

    render() {
        const { announcements } =
            this.state;

        return (
            <>
                <div className="container p-3 position-relative">
                    <h3 className="row justify-content-center">Mis convocatorias</h3>
                    {announcements && announcements.map((announcement: AnnouncementData) => (
                        <div className="row mx-0 mb-2">
                            <div
                                className="
              btn btn-info col-12 btn-md announcement"
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
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}
