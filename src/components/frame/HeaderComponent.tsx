import { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { ModalLogin } from "../modals/ModalLogin";
import "./HeaderComponent.css";

type Props = {};
type State = {
  isNavOpen: boolean;
  currentUser: any;
};
export default class HeaderComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isNavOpen: false,
      currentUser: null,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  componentDidMount() {
    const geData = AuthService.getCurrentUser();
    if (geData) {
      this.setState({
        currentUser: geData,
      });
    }
  }

  render() {
    const modalId = "login-modal";

    return (
      <>
        <ModalLogin modalId={modalId} />
        <nav className="navbar bg-black navbar-expand-lg fixed-top">
          <div className="container-fluid align-middle">
            <Link
              className="nav-link py-0 px-5 saetis"
              to="/announcements_list"
            >
              <strong>S A E T I S</strong>
            </Link>
            {!localStorage.getItem("token") ? (
              <button
                type="button"
                className="btn border-white border-2 login-button"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
              >
                Iniciar sesión
              </button>
            ) : (
              <div className="dropdown me-5">
                <button
                  className="btn border-white border-2 still-button"
                  type="button"
                  id="dropdownMenuUserGE"
                  data-bs-toggle="dropdown"
                  aria-expanded={false}
                >
                  <i
                    className="fa fa-circle pe-2"
                    style={{ fontSize: "13px", color: "#24bf61" }}
                  ></i>
                  <strong>
                    {this.state.currentUser
                      ? this.state.currentUser.nombre
                      : "..."}
                  </strong>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuUserGE"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        AuthService.logout();
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </>
    );
  }
}
