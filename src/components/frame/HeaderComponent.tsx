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
    this.setState({ currentUser: AuthService.getCurrentUser() });
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
                className="btn btn-secondary me-3"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
              >
                Iniciar sesión
              </button>
            ) : (
              <div className="dropdown me-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuUserGE"
                  data-bs-toggle="dropdown"
                  aria-expanded={false}
                >
                  {this.state.currentUser ? this.state.currentUser.name : "..."}
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
                      LogOut
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
