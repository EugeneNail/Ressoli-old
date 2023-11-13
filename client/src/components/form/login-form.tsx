import { FC } from "react";
import Button from "../button/button";
import { FormState } from "../../model/form-state";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Passwordbox from "../inputbox/passwordbox";
import Textbox from "../inputbox/textbox";

export class LoginFormFields {
  email: string = "";
  password: string = "";
}

export class LoginFormErrors {
  email: string[] = [];
  password: string[] = [];
}

type LoginFormProps = {
  submit: () => void;
  state: FormState<LoginFormFields, LoginFormErrors>;
};

const LoginForm: FC<LoginFormProps> = ({ submit, state: { errors, setField, clearFieldErrors } }) => {
  return (
    <form action="" className="form">
      <h1 className="form__header">Вход</h1>
      <div className="form__input-group">
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
      <div className="form__button-group">
        <Button style="filled" wide action={submit} text="Войти" />
      </div>
      <p className="form__message">
        Еще нет аккаунта?
        <a href="/signup" className="form__link">
          Зарегистрироваться
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
