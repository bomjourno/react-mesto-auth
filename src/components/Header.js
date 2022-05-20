import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ isAuthorized }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      {location.pathname === '/sign-in' ? (
        <Link
          className={classNames('header__authorization', {
            header__authorization_hidden: isAuthorized,
          })}
          to="/sign-up"
        >
          Регистрация
        </Link>
      ) : (
        <Link
          className={classNames('header__authorization', {
            header__authorization_hidden: isAuthorized,
          })}
          to="sign-in"
        >
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
