import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import './index.css';

import AnnouncementsList from "./components/AnnouncementsList";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" component={AnnouncementsList}>

          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
