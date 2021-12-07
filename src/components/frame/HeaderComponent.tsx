import { Component } from "react";
import { Link } from "react-router-dom";
import { ModalLogin } from "../modals/ModalLogin";
import "./HeaderComponent.css";

type Props = {};
type State = {
  isNavOpen: boolean;
};
export default class HeaderComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
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
            <button
              type="button"
              className="btn btn-secondary me-3"
              data-bs-toggle="modal"
              data-bs-target={`#${modalId}`}
            >
              Iniciar sesión
            </button>
          </div>
        </nav>
      </>
    );
  }
}
