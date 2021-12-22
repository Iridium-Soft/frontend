import React, { Component } from "react";
import AnnouncementsList from "./pages/AnnouncementsList";
import { Redirect, Route, Switch } from "react-router-dom";
import HeaderComponent from "./frame/HeaderComponent";
import SidebarComponent from "./frame/SidebarComponent";
import UploadDocumentsPage from "./pages/UploadDocumentsPage";
import MyAnnouncementsList from "./pages/MyAnnouncementsList";
import AnnouncementsForm from "./forms/AnnouncementsForm";
import ApplyToAnnouncement from "./forms/ApplyToAnnouncement";
import WorkCalendar from "./pages/WorkCalendar";
import PetisForm from "./forms/PetisForm";
import ApplicationsList from "./pages/ApplicationsList";
import GradeApplication from "./pages/GradeApplication";
import Addendum from "./pages/Addendum";
import ProvisionContract from "./pages/ProvisionContract";
import ReviewApplicationPage from "./pages/review_pages/ReviewApplicationPage";
import ReviewObservationsPage from "./pages/review_pages/ReviewObservationsPage";
import { DocumentsPostulation } from "./pages/DocumentsPostulation";
import SidebarDataService from "../services/sidebar.service";

type Props = {};

type State = {
  permissions: Array<any>;
};

export default class MainComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      permissions: [],
    };

    this.retrievePermissions = this.retrievePermissions.bind(this);
  }

  componentDidMount() {
    this.retrievePermissions();
  }

  retrievePermissions() {
    const user_id = localStorage.getItem("token")
      ? localStorage.getItem("id") + ""
      : "";
    SidebarDataService.get(user_id)
      .then((response) => {
        this.setState({
          permissions: response.data.permisos,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  routesDictionary: any = {
    1: <Route exact path="/documents" component={UploadDocumentsPage} />,
    2: (
      <Route
        exact
        path="/apply_to_announcement"
        component={ApplyToAnnouncement}
      />
    ),
    3: <Route exact path="/my_work_calendar" component={WorkCalendar} />,
    4: (
      <Route exact path="/inbox_postulation" component={DocumentsPostulation} />
    ),
    5: <Route exact path="/my_announcements" component={MyAnnouncementsList} />,
    6: <Route exact path="/announcement_form" component={AnnouncementsForm} />,
    7: <Route exact path="/petis_form" component={PetisForm} />,
    8: <Route exact path="/my_applications" component={ApplicationsList} />,
    9: (
      <Route
        exact
        path="/grade_application"
        component={() => <GradeApplication flag={1} />}
      />
    ),
    10: (
      <Route
        exact
        path="/grade_observations"
        component={() => <GradeApplication flag={0} />}
      />
    ),
    11: <Route exact path="/addendum" component={Addendum} />,
    12: (
      <Route exact path="/provision_contract" component={ProvisionContract} />
    ),
    13: (
      <Route
        exact
        path="/application_review"
        component={ReviewApplicationPage}
      />
    ),
    14: (
      <Route
        exact
        path="/observations_review"
        component={ReviewObservationsPage}
      />
    ),
  };

  render() {
    const { permissions } = this.state;
    return (
      <>
        <HeaderComponent />
        <SidebarComponent permissions={permissions} />
        <Switch>
          {permissions &&
            permissions.map((per, index) => {
              if (permissions.length - 1 === index) {
                return (
                  <>
                    {this.routesDictionary[per.id]}
                    <Route
                      exact
                      path="/announcements_list"
                      component={AnnouncementsList}
                    />
                    {/*<Redirect to="/announcements_list" />*/}
                  </>
                );
              } else {
                return this.routesDictionary[per.id];
              }
            })}
          {permissions &&
            permissions.length === 0 &&
            !localStorage.getItem("token") && (
              <>
                <Route
                  exact
                  path="/announcements_list"
                  component={AnnouncementsList}
                />
                <Redirect to="/announcements_list" />
              </>
            )}
        </Switch>
      </>
    );
  }
}
