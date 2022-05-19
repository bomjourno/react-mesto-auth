import React from 'react';

const Login = () => {
  return (
    <div className="authorization">
      <h2 className="authorization__title">Вход</h2>
      <form>
        <input
          className="authorization__input authorization__input_email"
          placeholder="Email"
        ></input>
        <input
          className="authorization__input authorization__input_password"
          placeholder="Пароль"
        ></input>
        <button className="authorization__submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
