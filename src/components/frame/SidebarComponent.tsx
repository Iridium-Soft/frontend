import React, { Component } from "react";
import "./SidebarComponent.css";
import { Link } from "react-router-dom";

type Props = {};
type State = {
  isSideBarOpen: boolean,
  isApplicationOpen: boolean,
  isDocumentOpen: boolean,
  isWorkSpaceOpen: boolean,
};

export default class SidebarComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSideBarOpen: true,
      isApplicationOpen: false,
      isDocumentOpen: false,
      isWorkSpaceOpen: false,
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
  }

  toggleSideBar() {
    this.setState({
      isSideBarOpen: !this.state.isSideBarOpen,
      isApplicationOpen: false,
      isDocumentOpen: false,
      isWorkSpaceOpen: false,
    });
  }

  toggleSubMenu(sb: number) {
    if(sb === 0) {
      this.setState({
        isApplicationOpen: !this.state.isApplicationOpen,
      })
    } else if(sb === 1) {
      this.setState({
        isDocumentOpen: !this.state.isDocumentOpen,
      })
    } else if(sb === 2) {
      this.setState({
        isWorkSpaceOpen: !this.state.isWorkSpaceOpen,
      })
    }
  }

  render() {
    const { isSideBarOpen, isApplicationOpen, isDocumentOpen, isWorkSpaceOpen } = this.state;

    return (
      <div className={`sidebar bg-black ${isSideBarOpen ? "close" : ""}`}>
        <ul className="nav-links">
          <li onClick={this.toggleSideBar}>
            <a>
              <i className="fa fa-bars"></i>
              <span className="link_name">Menu</span>
            </a>
          </li>
          <li>
            <Link to="/announcements_list">
              <i className="fa fa-bullhorn"></i>
              <span className="link_name">{!isSideBarOpen ? "Convocatorias disponibles" : ""}</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/announcements_list">
                  Convocatorias disponibles
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${isApplicationOpen ? "showMenu" : ""}`} onClick={() => {this.toggleSubMenu(0)}}>
            <div className="iocn-link">
              <a href="#">
                <i className="fa fa-mail-bulk"></i>
                <span className="link_name">{!isSideBarOpen ? "Postulacion" : ""}</span>
              </a>
              <i className="fa fa-chevron-down arrow" ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Postulacion
                </a>
              </li>
              <li>
                <a href="#">Aplicar a convocatoria</a>
              </li>
              <li>
                <a href="#">Registrar calendario de trabajo</a>
              </li>
              <li>
                <a href="#">Registrar documentos</a>
              </li>
            </ul>
          </li>
          <li className={`${isDocumentOpen ? "showMenu" : ""}`} onClick={() => {this.toggleSubMenu(1)}}>
            <div className="iocn-link" style={!isSideBarOpen ? {height: "90px"} : {height: "50px"}}>
              <a href="#">
                <i className="fa fa-file-alt"></i>
                <span className="link_name">{!isSideBarOpen ? "Nuevo documento" : ""}</span>
              </a>
              <i className="fa fa-chevron-down arrow" ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Nuevo documento
                </a>
              </li>
              <li>
                <a href="#">Nueva convocatoria</a>
              </li>
              <li>
                <a href="#">Nuevo pliego de especificacion</a>
              </li>
            </ul>
          </li>
          <li className={`${isWorkSpaceOpen ? "showMenu" : ""}`} onClick={() => {this.toggleSubMenu(2)}}>
            <div className="iocn-link" style={!isSideBarOpen ? {height: "90px"} : {height: "50px"}}>
              <a href="#">
                <i className="fas fa-chalkboard-teacher"></i>
                <span className="link_name">{!isSideBarOpen ? "Espacio de trabajo" : ""}</span>
              </a>
              <i className="fa fa-chevron-down arrow" ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Espacio de trabajo
                </a>
              </li>
              <li>
                <a href="#">Mis convocatorias</a>
              </li>
              <li>
                <a href="#">Postulaciones</a>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/announcements_list">
              <i className="fa fa-inbox"></i>
              <span className="link_name">{!isSideBarOpen ? "Bandeja de entrada" : ""}</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/announcements_list">
                  Bandeja de entrada
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}


