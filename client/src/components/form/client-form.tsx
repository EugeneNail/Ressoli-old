import { FormEvent } from "react";
import "./form.sass";
import { Field } from "../custom-control/field";
import { Errors } from "../../service/use-errors";
import Button from "../button/button";

export class ClientFormErrors {
  name: string[] = [];
  surname: string[] = [];
  phoneNumber: string[] = [];
}

type ClientFormProps = {
  submit: (event: FormEvent) => void;
  errors: Errors<ClientFormErrors>;
};

export function ClientForm({ submit, errors }: ClientFormProps) {
  return (
    <form method="POST" className="form" onSubmit={submit}>
      <div className="form__control-group">
        <Field label="Name" name="name" icon="account_box" errors={errors.values.name} resetError={errors.reset} />
        <Field
          label="Surname"
          name="surname"
          icon="account_box"
          errors={errors.values.name}
          resetError={errors.reset}
        />
        <Field
          label="Phone number"
          name="phoneNumber"
          icon="contact_phone"
          errors={errors.values.name}
          resetError={errors.reset}
        />
      </div>
      <div className="form__button-group">
        <Button className="form__button" text="Confirm" />
      </div>
    </form>
  );
}
