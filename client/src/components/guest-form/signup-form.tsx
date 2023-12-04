import Button from "../button/button";
import { FormEvent } from "react";
import { Field } from "../custom-control/field";
import { Errors } from "../../service/use-errors";
import "./guest-form.sass";

export class SignupFormErrors {
  name: string[] = [];
  surname: string[] = [];
  email: string[] = [];
  password: string[] = [];
  password_confirmation: string[] = [];
}

type SignupFormProps = {
  submit: (event: FormEvent) => {};
  errors: Errors<SignupFormErrors>;
};

function SignupForm({ submit, errors }: SignupFormProps) {
  return (
    <form action="" onSubmit={submit} className="guest-form">
      <h1 className="guest-form__header">Signup</h1>
      <div className="guest-form__input-group">
        <Field label="Email address" name="email" icon="mail" errors={errors.values.email} resetError={errors.reset} />
        <Field label="Name" name="name" icon="person" errors={errors.values.name} resetError={errors.reset} />
        <Field label="Surname" name="surname" icon="person" errors={errors.values.surname} resetError={errors.reset} />
        <Field
          label="Password"
          name="password"
          icon="lock"
          password
          errors={errors.values.password}
          resetError={errors.reset}
        />
        <Field
          label="Confirm password"
          name="password_confirmation"
          icon="lock"
          password
          errors={errors.values.password_confirmation}
          resetError={errors.reset}
        />
      </div>
      <div className="guest-form__button-group">
        <Button wide text="Signup" />
      </div>
      <p className="guest-form__message">
        Already have an account?
        <a href="/login" className="guest-form__link">
          Login
        </a>
      </p>
    </form>
  );
}

export default SignupForm;
