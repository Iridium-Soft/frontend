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

type Props = {};

type State = {};

export default class MainComponent extends Component<Props, State> {
  render() {
    return (
      <>
        <HeaderComponent />
        <SidebarComponent />
        <Switch>
          <Route
            exact
            path="/announcements_list"
            component={AnnouncementsList}
          />
          <Route exact path="/documents" component={UploadDocumentsPage} />
          <Route
            exact
            path="/my_announcements"
            component={MyAnnouncementsList}
          />
          <Route
            exact
            path="/announcement_form"
            component={AnnouncementsForm}
          />
          <Route
            exact
            path="/apply_to_announcement"
            component={ApplyToAnnouncement}
          />
          <Route exact path="/my_work_calendar" component={WorkCalendar} />
          <Route exact path="/petis_form" component={PetisForm} />
          <Route exact path="/my_applications" component={ApplicationsList} />
          <Route exact path="/grade_application" component={() => <GradeApplication flag={1}/>}/>
          <Route exact path="/grade_observations" component={() => <GradeApplication flag={0}/>}/>
          <Route exact path="/addendum" component={Addendum} />
          <Route
            exact
            path="/provision_contract"
            component={ProvisionContract}
          />
          <Route
            exact
            path="/application_review"
            component={ReviewApplicationPage}
          />
          <Route
            exact
            path="/observations_review"
            component={ReviewObservationsPage}
          />
          <Route
            exact
            path="/inbox_postulation/1"
            component={() => <DocumentsPostulation companyId={1} />}
          />
          <Route
            exact
            path="/inbox_postulation/2"
            component={() => <DocumentsPostulation companyId={2} />}
          />
          <Redirect to="/announcements_list" />
        </Switch>
      </>
    );
  }
}
