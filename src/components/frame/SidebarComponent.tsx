import React, { Component } from "react";
import "./SidebarComponent.css";
import { Link } from "react-router-dom";
import SidebarDataService from "../../services/sidebar.service"

type Props = {};
type State = {
  isSideBarOpen: boolean,
  isApplicationOpen: boolean,
  isDocumentOpen: boolean,
  isWorkSpaceOpen: boolean,
  permissions: Array<any>,
};

export default class SidebarComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSideBarOpen: true,
      isApplicationOpen: false,
      isDocumentOpen: false,
      isWorkSpaceOpen: false,
      permissions: [
            {
              "id": 5,
              "name": "/my_announcements",
              "guard_name": "api",
              "created_at": "2021-12-12T15:02:10.000000Z",
              "updated_at": "2021-12-12T15:02:10.000000Z",
              "pivot": {
                "role_id": 2,
                "permission_id": 5
              }
            },
            {
              "id": 6,
              "name": "/announcement_form",
              "guard_name": "api",
              "created_at": "2021-12-12T15:02:10.000000Z",
              "updated_at": "2021-12-12T15:02:10.000000Z",
              "pivot": {
                "role_id": 2,
                "permission_id": 6
              }
            },
          ],
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
    this.retrievePermissions = this.retrievePermissions.bind(this);
    this.checkPermissions = this.checkPermissions.bind(this);
  }

  componentDidMount() {
    this.retrievePermissions();
  }

  retrievePermissions() {
    SidebarDataService.get("1").then((response) => {
      this.setState({
        permissions: response.data.permisos,
      });
    }).catch((e) => {
      console.log(e)
    })
  }

  checkPermissions(id: number) {
    let per: any = this.state.permissions;
    let ans: boolean = false;
    per.map((p: any) => {
      if(p.id === id) {
        ans = true;
      }
    })
    return ans;
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
    const { isSideBarOpen, isApplicationOpen, isDocumentOpen, isWorkSpaceOpen} = this.state;

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
            <div className={`iocn-link ${(this.checkPermissions(2) || this.checkPermissions(1) || this.checkPermissions(3) ? "" : "d-none")}`}>
              <a>
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
              <li className={`${(this.checkPermissions(2) ? "" : "d-none")}`} >
                <a>Aplicar a convocatoria</a>
              </li>
              <li className={`${(this.checkPermissions(1) ? "" : "d-none")}`} >
                <a>Registrar calendario de trabajo</a>
              </li>
              <li className={`${(this.checkPermissions(3) ? "" : "d-none")}`} >
                <a>Registrar documentos</a>
              </li>
            </ul>
          </li>
          <li className={`${isDocumentOpen ? "showMenu" : ""}`} onClick={() => {this.toggleSubMenu(1)}}>
            <div className={`iocn-link ${(this.checkPermissions(6) || this.checkPermissions(7) ? "" : "d-none")}`} style={!isSideBarOpen ? {height: "90px"} : {height: "50px"}}>
              <a>
                <i className="fa fa-file-alt"></i>
                <span className="link_name">{!isSideBarOpen ? "Nuevo documento" : ""}</span>
              </a>
              <i className="fa fa-chevron-down arrow" ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name">
                  Nuevo documento
                </a>
              </li>
              <li className={`${(this.checkPermissions(6) ? "" : "d-none")}`}>
                <Link to="/announcement_form">Nueva convocatoria</Link>
              </li>
              <li className={`${(this.checkPermissions(7) ? "" : "d-none")}`}>
                <Link to="/petis_form">Nuevo pliego de especificacion</Link>
              </li>
            </ul>
          </li>
          <li className={`${isWorkSpaceOpen ? "showMenu" : ""}`} onClick={() => {this.toggleSubMenu(2)}}>
            <div className={`iocn-link ${(this.checkPermissions(5) || this.checkPermissions(8) ? "" : "d-none")}`} style={!isSideBarOpen ? {height: "90px"} : {height: "50px"}}>
              <a>
                <i className="fas fa-chalkboard-teacher"></i>
                <span className="link_name">{!isSideBarOpen ? "Espacio de trabajo" : ""}</span>
              </a>
              <i className="fa fa-chevron-down arrow" ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name">
                  Espacio de trabajo
                </a>
              </li>
              <li className={`${(this.checkPermissions(5) ? "" : "d-none")}`}>
                <Link to="/my_announcements">Mis convocatorias</Link>
              </li>
              <li className={`${(this.checkPermissions(8) ? "" : "d-none")}`}>
                <Link to="/my_applications">Postulaciones</Link>
              </li>
            </ul>
          </li>
          <li className={`${(this.checkPermissions(4) ? "" : "d-none")}`}>
            <Link to="/inbox_postulation">
              <i className="fa fa-inbox"></i>
              <span className="link_name">{!isSideBarOpen ? "Bandeja de entrada" : ""}</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/inbox_postulation">
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


