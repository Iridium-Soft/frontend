import React, { Component } from "react";
import AnnouncementsList from "./AnnouncementsList";
import { Route, Switch } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";
import UploadDocumentsPage from "./UploadDocumentsPage";
import MyAnnouncementsList from "./MyAnnouncementsList";
import AnnouncementsForm from "./AnnouncementsForm";

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
            path="/announcements_list"
            component={AnnouncementsList}
          ></Route>
          <Route path="/documents" component={UploadDocumentsPage}></Route>
          <Route
            path="/my_announcements"
            component={MyAnnouncementsList}
          ></Route>
          <Route
            exact
            path="/announcement_form"
            component={AnnouncementsForm}
          />
        </Switch>
      </>
    );
  }
}
