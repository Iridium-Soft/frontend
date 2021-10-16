import { Component } from "react";
import { Link } from "react-router-dom";
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
    return (
      <div>
        <nav className="navbar bg-black navbar-expand-lg fixed-top">
          <div className="align-middle">
            <Link className="nav-link py-0 px-5 saetis" to="/home">
              <strong >S A E T I S</strong>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
