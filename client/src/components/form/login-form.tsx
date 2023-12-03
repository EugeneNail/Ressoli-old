import Button from "../button/button";
import { Field } from "../custom-control/field";
import { Errors } from "../../service/use-errors";
import { FormEvent } from "react";
import "./form.sass";

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
    <form action="" onSubmit={submit} className="form">
      <h1 className="form__header">Login</h1>
      <div className="form__input-group">
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
      <div className="form__button-group">
        <Button style="filled" wide text="Login" />
      </div>
      <p className="form__message">
        Don't have an account?
        <a href="/signup" className="form__link">
          Signup
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
