import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/Auth';
import positiveResponseImg from '../images/OK.svg';
import negativeResponseImg from '../images/notOK.svg';

function Register({ isNoticeAlertPopupOpen, setIsNoticeAlertPopupOpen, setNoticeOfRegistration }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .register(password, email)
      .then(() => navigate('/sign-in'))
      .then(() => {
        setNoticeOfRegistration({
          message: 'Вы успешно зарегистрировались!',
          link: positiveResponseImg,
        });
      })
      .then(() => setIsNoticeAlertPopupOpen(!isNoticeAlertPopupOpen))
      .catch((err) => {
        setNoticeOfRegistration({
          message: `Ошибка! ${err.message}`,
          link: negativeResponseImg,
        });
      });
  }

  return (
    <div className="authorization">
      <h2 className="authorization__title">Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="authorization__input authorization__input_email"
          onChange={handleChangeEmail}
          placeholder="Email"
          required
        />
        <input
          className="authorization__input authorization__input_password"
          onChange={handleChangePassword}
          placeholder="Пароль"
          type="password"
          required
        />
        <button className="authorization__submit" type="submit">
          Зарегистрироваться
        </button>
        <Link className="authorization__caption" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
