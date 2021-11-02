import React, { Component } from "react";
import AnnouncementsList from "./AnnouncementsList";
import { Redirect, Route, Switch } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import SidebarComponent from "./SidebarComponent";
import UploadDocumentsPage from "./UploadDocumentsPage";
import MyAnnouncementsList from "./MyAnnouncementsList";
import AnnouncementsForm from "./AnnouncementsForm";
import ApplyToAnnouncement from "./ApplyToAnnouncement";
import PetisForm from "./PetisForm";

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
                    <Route exact path="/petis_form" component={PetisForm} />
                    <Redirect to="/" />
                </Switch>
            </>
        );
    }
}