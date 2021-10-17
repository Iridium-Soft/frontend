import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";

import AnnouncementsList from "./components/AnnouncementsList";
import AnnouncementsForm from "./components/AnnouncementsForm";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/announcements_list"
            component={AnnouncementsList}
          />
          <Route
            exact
            path="/announcement_form"
            component={AnnouncementsForm}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
