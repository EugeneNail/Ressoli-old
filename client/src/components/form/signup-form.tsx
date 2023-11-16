import { FC } from "react";
import { FormState } from "../../model/form-state";
import { faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import Passwordbox from "../inputbox/passwordbox";
import Textbox from "../inputbox/textbox";
import Button from "../button/button";

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

type SignupFormProps = {
  submit: () => {};
  state: FormState<SignupFormFields, SignupFormErrors>;
};

const SignupForm: FC<SignupFormProps> = ({ submit, state: { fields, errors, setField, clearFieldErrors } }) => {
  return (
    <form action="" className="form">
      <h1 className="form__header">Регистрация</h1>
      <div className="form__input-group">
        <Textbox
          value={fields.name}
          label="Имя"
          name="name"
          onChange={setField}
          leadingIcon={faUser}
          errors={errors.name}
          clearErrors={clearFieldErrors}
        />
        <Textbox
          value={fields.surname}
          label="Фамилия"
          name="surname"
          onChange={setField}
          leadingIcon={faUser}
          errors={errors.surname}
          clearErrors={clearFieldErrors}
        />
        <Textbox
          value={fields.email}
          label="Электронная почта"
          name="email"
          onChange={setField}
          leadingIcon={faEnvelope}
          errors={errors.email}
          clearErrors={clearFieldErrors}
        />
        <Passwordbox
          value={fields.password}
          label="Пароль"
          name="password"
          onChange={setField}
          leadingIcon={faKey}
          errors={errors.password}
          clearErrors={clearFieldErrors}
        />
        <Passwordbox
          value={fields.password_confirmation}
          label="Повторите пароль"
          name="password_confirmation"
          onChange={setField}
          leadingIcon={faKey}
          errors={errors.password_confirmation}
          clearErrors={clearFieldErrors}
        />
      </div>
      <div className="form__button-group">
        <Button style="filled" wide text="Создать аккаунт" action={() => submit()} />
      </div>
      <p className="guest__message">
        Уже есть аккаунт?
        <a href="/login" className="guest__link">
          Войти
        </a>
      </p>
    </form>
  );
};

export default SignupForm;
