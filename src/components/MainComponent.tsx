import React, { Component } from "react";
import AnnouncementsList from "./AnnouncementsList";
import { Redirect, Route, Switch } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";

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
          <Redirect to="/" />
        </Switch>
      </>
    );
  }
}
