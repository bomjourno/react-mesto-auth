import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="authorization">
      <h2 className="authorization__title">Регистрация</h2>
      <form>
        <input className="authorization__input authorization__input_email" placeholder="Email"></input>
        <input className="authorization__input authorization__input_password" placeholder="Пароль"></input>
        <button className="authorization__submit">Зарегистрироваться</button>
        <Link className="authorization__caption" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
};

export default Register;
