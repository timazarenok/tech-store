import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector} from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import { Shop } from "react-bootstrap-icons";

import "./header.css";

const Header = (props) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  const { totalCount } = useSelector(({ cart }) => cart);

  const { user } = useSelector(({ auth }) => auth);
  return (
    <div>
      <header>
        <div className="top-nav">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand text-uppercase" to="/">
              Техно Торг Онлайн <Shop />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-center pr-md-4"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Главная
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/catalog" className="nav-link">
                    Каталог
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    style={{
                      display: user.email === undefined ? "block" : "none",
                    }}
                    className="nav-link"
                  >
                    Войти
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/cart"
                    style={{
                      display: user.email === undefined ? "none" : "block",
                    }}
                    className="nav-link"
                  >
                    Корзина {totalCount === 0 ? null : <span>{totalCount}</span>}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin"
                    style={{
                      display: user.email === "admin@gmail.com" ? "block" : "none",
                    }}
                    className="nav-link"
                  >
                    Админ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/add-product"
                    style={{
                      display: user.email === "admin@gmail.com" ? "block" : "none",
                    }}
                    className="nav-link"
                  >
                    Товары
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/add-color"
                    style={{
                      display: user.email === "admin@gmail.com" ? "block" : "none",
                    }}
                    className="nav-link"
                  >
                    Цвета
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/add-manufacturer"
                    style={{
                      display: user.email === "admin@gmail.com" ? "block" : "none",
                    }}
                    className="nav-link"
                  >
                    Производители
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/add-category"
                    style={{
                      display: user.email === "admin@gmail.com" ? "block" : "none",
                    }}
                    className="nav-link"
                  >
                    Категории
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/add-delivery"
                    style={{
                      display: user.email === "admin@gmail.com" ? "block" : "none",
                    }}
                    className="nav-link"
                  >
                    Доставка
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    onClick={onLogoutClick}
                    style={{
                      display: user.email === undefined ? "none" : "block",
                    }}
                  >
                    Выход
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(mapStateToProps, { logoutUser })(Header);
