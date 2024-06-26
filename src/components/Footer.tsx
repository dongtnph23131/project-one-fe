import { Link } from "react-router-dom";
import { Logo } from "./icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-list">
          <div className="footer-item">
            <Link to="/" className="header__logo">
              <img src={Logo} alt="#" />
            </Link>
          </div>
          <div className="footer-nav">
            <div className="footer-item">
              <h2 className="footer__title">Links</h2>
              <ul className="footer-menu-list">
                <li className="footer-menu-item">
                  <a className="footer-menu-link">Home</a>
                </li>
                <li className="footer-menu-item">
                  <a className="footer-menu-link">Shop</a>
                </li>
                <li className="footer-menu-item">
                  <a className="footer-menu-link">Blog</a>
                </li>
                <li className="footer-menu-item">
                  <a className="footer-menu-link">Contact</a>
                </li>
              </ul>
            </div>
            <div className="footer-item">
              <h2 className="footer__title">Help</h2>
              <ul className="footer-menu-list">
                <li className="footer-menu-item">
                  <a className="footer-menu-link">Payment Options</a>
                </li>
                <li className="footer-menu-item">
                  <a className="footer-menu-link">Returns</a>
                </li>
                <li className="footer-menu-item">
                  <a className="footer-menu-link">Privacy Policies</a>
                </li>
                <li className="footer-menu-item">
                  <a className="footer-menu-link">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-item">
            <h2 className="footer__title">Newsletter</h2>
            <form className="newsletter">
              <input
                type="text"
                className="newsletter__input"
                placeholder="Enter Your Email Address"
              />
              <button className="newsletter__btn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
