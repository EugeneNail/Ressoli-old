import { MouseEvent, FC } from "react";
import Textbox from "../../components/inputbox/textbox";
import Passwordbox from "../../components/inputbox/passwordbox";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import api from "../../service/api";
import useFormState from "../../service/use-form-state";
import { useNavigate } from "react-router";

class LoginFormFields {
  email: string = "";
  password: string = "";
}

class LoginFormErrors {
  email: string[] = [];
  password: string[] = [];
}

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { fields, errors, setField, setErrors, clearFieldErrors } = useFormState(
    new LoginFormFields(),
    new LoginFormErrors()
  );

  const submit = async (event: MouseEvent) => {
    event.preventDefault();
    const response = await api.post("/login", fields);
    const data = response.data;

    if (response.status === 422 || response.status === 401) {
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
      <h1 className="guest__header">ВХОД</h1>
      <div className="guest__input-group">
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
      </div>
      <button onClick={submit} className="guest__button button button_regular button_wide">
        Войти
      </button>
      <p className="guest__message">
        Еще нет аккаунта?
        <a href="/signup" className="guest__link">
          Зарегистрироваться
        </a>
      </p>
    </form>
  );
};

export default LoginPage;
