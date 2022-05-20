import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ signOut }) {
  const [buttonsData, setButtonsData] = useState({
    name: '',
    link: '',
  });
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/sign-in':
        setButtonsData({
          name: 'Регистрация',
          link: '/sign-up',
        });
        break;
      case '/sign-up':
        setButtonsData({
          name: 'Войти',
          link: '/sign-in',
        });
        break;
      default:
        setButtonsData({
          name: 'Выйти',
          link: '/sign-in',
        });
        break;
    }
  }, [location.pathname]);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      <Link onClick={signOut} className="header__authorization" to={buttonsData.link}>
        {buttonsData.name}
      </Link>
    </header>
  );
}

export default Header;
