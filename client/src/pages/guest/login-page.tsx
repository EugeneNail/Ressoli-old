import { FC } from "react";

const LoginPage: FC = () => {
  return (
    <div className="guest__form">
      <div className="guest__logo-group">
        <img src="" alt="" className="guest__logo" />
        <h1 className="guest__header">Вход</h1>
      </div>
      <div className="guest__input-group"></div>
      <button className="guest__button button button_regular">Войти</button>
      <button className="guest__button button button_light">Войти</button>
      <div className="guest__navigation-group">
        <p className="guest__message">
          Еще нет аккаунта?
          <a href="" className="guest__link">
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
