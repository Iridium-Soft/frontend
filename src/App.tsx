import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import './index.css';
import MainComponent from "./components/MainComponent"

require('bootstrap');

class App extends Component {
  render() {
    return (
      <div className="app">
        <MainComponent />
      </div>
    );
  }
}

export default App;
