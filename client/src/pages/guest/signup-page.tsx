import { MouseEvent, FC } from "react";
import Textbox from "../../components/inputbox/textbox";
import Passwordbox from "../../components/inputbox/passwordbox";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import useFormState from "../../service/useFormState";
import api from "../../service/api";
import { useNavigate } from "react-router";

class SignupFormFields {
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
  password_confirmation: string = "";
}

class SignupFormErrors {
  name: string[] = [];
  surname: string[] = [];
  email: string[] = [];
  password: string[] = [];
  password_confirmation: string[] = [];
}

const SignupPage: FC = () => {
  const navigate = useNavigate();
  const [fields, errors, { setField, setErrors, clearFieldErrors }] = useFormState(
    new SignupFormFields(),
    new SignupFormErrors()
  );

  const submit = async (event: MouseEvent) => {
    event.preventDefault();
    const response = await api.post("/signup", fields);
    const data = response.data;

    if (response.status === 422 || response.status === 409) {
      setErrors(data.errors);
      return;
    }

    api.get("/csrf");
    localStorage.setItem("access_token", data.token);
    localStorage.setItem("user_name", data.username);
    localStorage.setItem("image_url", data.imageUrl);
    navigate("/");
  };

  return (
    <form className="guest__form">
      <div className="guest__logo-group">
        <h1 className="guest__header">Регистрация</h1>
      </div>
      <div className="guest__input-group">
        <Textbox
          label="Имя"
          name="name"
          onChange={setField}
          leadingIcon={faUser}
          errors={errors.name}
          clearErrors={clearFieldErrors}
        />
        <Textbox
          label="Фамилия"
          name="surname"
          onChange={setField}
          leadingIcon={faUser}
          errors={errors.surname}
          clearErrors={clearFieldErrors}
        />
        <Textbox
          label="Электронная почта"
          name="email"
          onChange={setField}
          leadingIcon={faEnvelope}
          errors={errors.email}
          clearErrors={clearFieldErrors}
        />
        <Passwordbox
          label="Пароль"
          name="password"
          onChange={setField}
          leadingIcon={faKey}
          errors={errors.password}
          clearErrors={clearFieldErrors}
        />
        <Passwordbox
          label="Повторите пароль"
          name="password_confirmation"
          onChange={setField}
          leadingIcon={faKey}
          errors={errors.password_confirmation}
          clearErrors={clearFieldErrors}
        />
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
    </form>
  );
};

export default SignupPage;
