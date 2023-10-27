import { ChangeEvent, MouseEvent, FC, useState } from "react";
import Textbox from "../../components/inputbox/textbox";
import Passwordbox from "../../components/inputbox/passwordbox";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

class SignupPageData {
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";
}

const SignupPage: FC = () => {
  const [data, setData] = useState(new SignupPageData());

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
        <h1 className="guest__header">Регистрация</h1>
      </div>
      <div className="guest__input-group">
        <Textbox label="Имя" name="name" onChange={updateData} leadingIcon={faUser} />
        <Textbox label="Фамилия" name="surname" onChange={updateData} leadingIcon={faUser} />
        <Textbox label="Электронная почта" name="email" onChange={updateData} leadingIcon={faEnvelope} />
        <Passwordbox label="Пароль" name="password" onChange={updateData} leadingIcon={faKey} />
        <Passwordbox label="Повторите пароль" name="password_confirmation" onChange={updateData} leadingIcon={faKey} />
      </div>
      <button onClick={submit} className="guest__button button button_regular button_wide">
        Создать аккаунт
      </button>
      <p className="guest__message">
        Уже есть аккаунт?
        <a href="/login" className="guest__link">
          Войти
        </a>
      </p>
    </div>
  );
};

export default SignupPage;
