import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/Auth';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          setEmail('');
          setPassword('');
          handleLogin(data);
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="authorization">
      <h2 className="authorization__title">Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="authorization__input authorization__input_email"
          onChange={handleChangeEmail}
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="authorization__input authorization__input_password"
          onChange={handleChangePassword}
          name="password"
          placeholder="Пароль"
          type="password"
          required
        />
        <button type="submit" className="authorization__submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
