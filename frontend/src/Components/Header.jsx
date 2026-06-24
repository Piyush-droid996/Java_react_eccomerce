import "./Header.css";
import {
  faShoppingBasket,
  faTags,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <>
      <div className="top-bar">
        🚚 Free Shipping on orders above $25 | Use code: EAZY25
      </div>

      <header className="header">
        <div className="container">
          {/* Logo */}
          <a href="/" className="logo">
            <FontAwesomeIcon icon={faTags} />
            <span>Eazy Stickers</span>
          </a>

          {/* Search */}
          <div className="search-box">
            <input type="text" placeholder="Search for stickers..." />
            <button>Search</button>
          </div>

          {/* Navigation */}
          <nav className="eazynav">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>

              <li>
                <a href="/about">About</a>
              </li>

              <li>
                <a href="/contact">Contact</a>
              </li>

              <li>
                <a href="/login">Login</a>
              </li>

              <li>
                <a href="/cart" className="cart-icon">
                  <FontAwesomeIcon icon={faShoppingBasket} />

                  <span className="cart-badge">0</span>
                </a>
              </li>
            </ul>
          </nav>

          <button className="mobile-menu">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>
    </>
  );
}
