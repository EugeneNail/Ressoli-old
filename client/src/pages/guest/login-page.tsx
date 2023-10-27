import { ChangeEvent, MouseEvent, FC, useState } from "react";
import Textbox from "../../components/inputbox/textbox";
import Passwordbox from "../../components/inputbox/passwordbox";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";

class LoginPageData {
  email: string = "";
  password: string = "";
}

const LoginPage: FC = () => {
  const [data, setData] = useState(new LoginPageData());

  //TODO вынести в отдельный хук
  const updateData = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    setData({
      ...data,
      [input.name]: input.type === "checkbox" ? input.checked : input.value,
    });
  };

  const submit = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="guest__form">
      <div className="guest__logo-group">
        <img src="./img/logo.svg" alt="" className="guest__logo" />
        <h1 className="guest__header">ВХОД</h1>
      </div>
      <div className="guest__input-group">
        <Textbox label="Электронная почта" name="email" onChange={updateData} leadingIcon={faEnvelope} />
        <Passwordbox label="Пароль" name="password" onChange={updateData} leadingIcon={faKey} />
      </div>
      <button onClick={submit} className="guest__button button button_regular button_wide">
        Войти
      </button>
      <p className="guest__message">
        Еще нет аккаунта?
        <a href="" className="guest__link">
          Зарегистрироваться
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
