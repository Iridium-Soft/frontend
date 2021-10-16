import React, { Component } from "react";
import "./SidebarComponent.css";

type Props = {};
type State = {
  isSideBarOpen: boolean,
  isDocumentsOpen: boolean,
};

export default class SidebarComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSideBarOpen: false,
      isDocumentsOpen: false,
    };
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.toggleDocumentsSubMenu = this.toggleDocumentsSubMenu.bind(this);
  }

  toggleSideBar() {
    this.setState({
      isSideBarOpen: !this.state.isSideBarOpen,
      isDocumentsOpen: this.state.isDocumentsOpen,
    });
  }

  toggleDocumentsSubMenu() {
    this.setState({
      isSideBarOpen: this.state.isSideBarOpen,
      isDocumentsOpen: !this.state.isDocumentsOpen,
    })
  }

  render() {
    const { isSideBarOpen, isDocumentsOpen } = this.state;

    return (
      <div className={`sidebar bg-black ${isSideBarOpen ? "" : "close"}`}>
        <ul className="nav-links">
          <li onClick={this.toggleSideBar}>
            <a>
              <i className="fa fa-bars"></i>
              <span className="link_name">Menu</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-bullhorn"></i>
              <span className="link_name">Convocatorias</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Category
                </a>
              </li>
            </ul>
          </li>
          <li className={`${isDocumentsOpen ? "showMenu" : ""}`} onClick={this.toggleDocumentsSubMenu}>
            <div className="iocn-link">
              <a href="#">
                <i className="fa fa-file-alt"></i>
                <span className="link_name">Documentos</span>
              </a>
              <i className="fa fa-chevron-down arrow" ></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Documentos
                </a>
              </li>
              <li>
                <a href="#">Parte A</a>
              </li>
              <li>
                <a href="#">Parte B</a>
              </li>
              <li>
                <a href="#">Resumen GE</a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="fa fa-plus"></i>
                <span className="link_name">Posts</span>
              </a>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Posts
                </a>
              </li>
              <li>
                <a href="#">Web Design</a>
              </li>
              <li>
                <a href="#">Login Form</a>
              </li>
              <li>
                <a href="#">Card Design</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-plus"></i>
              <span className="link_name">Analytics</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Analytics
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
