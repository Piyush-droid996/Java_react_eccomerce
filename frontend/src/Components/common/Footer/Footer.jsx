import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 EazyStore. All Rights Reserved.</p>
      <FontAwesomeIcon
        icon={faHeart}
        className="footer-icon"
        aria-hidden="true"
      />
    </footer>
  );
}

export default Footer;
