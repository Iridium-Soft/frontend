import React, { Component } from "react";
import AnnouncementsList from "./AnnouncementsList";
import { Redirect, Route, Switch } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";
import UploadDocumentsPage from "./UploadDocumentsPage";
import MyAnnouncementsList from "./MyAnnouncementsList";
import AnnouncementsForm from "./AnnouncementsForm";
import ApplyToAnnouncement from "./ApplyToAnnouncement";
import WorkCalendar from "./WorkCalendar";
import PetisForm from "./PetisForm";
import ApplicationsList from "../components/ApplicationsList";
import ChangeOrderPage from "./ChangeOrderPage";
import ComplianceNotification from "./ComplianceNotification";
import Addendum from "./Addendum";
import ProvisionContract from "./ProvisionContract";

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
          <Route exact path="/change_order" component={ChangeOrderPage} />
          <Route exact path="/compliance_notification" component={ComplianceNotification}/>
          <Route exact path="/addendum" component={Addendum} />
          <Route exact path="/provision_contract" component={ProvisionContract} />
          <Redirect to="/announcements_list" />
        </Switch>
      </>
    );
  }
}
