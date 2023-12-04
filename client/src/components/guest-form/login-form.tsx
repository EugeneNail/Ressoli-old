import Button from "../button/button";
import { Field } from "../custom-control/field";
import { Errors } from "../../service/use-errors";
import { FormEvent } from "react";
import "./guest-form.sass";

export class LoginFormErrors {
  email: string[] = [];
  password: string[] = [];
}

type LoginFormProps = {
  submit: (event: FormEvent) => void;
  errors: Errors<LoginFormErrors>;
};

function LoginForm({ submit, errors }: LoginFormProps) {
  return (
    <form action="" onSubmit={submit} className="guest-form">
      <h1 className="guest-form__header">Login</h1>
      <div className="guest-form__input-group">
        <Field icon="mail" label="Email" name="email" errors={errors.values.email} resetError={errors.reset} />
        <Field
          icon="lock"
          helperText={errors.values.password?.[0]}
          label="Password"
          name="password"
          password
          errors={errors.values.password}
          resetError={errors.reset}
        />
      </div>
      <div className="guest-form__button-group">
        <Button wide text="Login" />
      </div>
      <p className="guest-form__message">
        Don't have an account?
        <a href="/signup" className="guest-form__link">
          Signup
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
