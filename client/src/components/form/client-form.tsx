import "./form.sass";
import { Field } from "../custom-control/field";
import Button from "../button/button";
import { FormProps } from "../../model/form-props";

export class ClientFormErrors {
  name: string[] = [];
  surname: string[] = [];
  phoneNumber: string[] = [];
}

type ClientFormProps = FormProps<ClientFormErrors> & {};

export function ClientForm({ submit, errors }: ClientFormProps) {
  return (
    <form method="POST" className="form" onSubmit={submit}>
      <div className="form__control-group">
        <Field label="Name" name="name" icon="account_box" errors={errors.values.name} resetError={errors.reset} />
        <Field
          label="Surname"
          name="surname"
          icon="account_box"
          errors={errors.values.surname}
          resetError={errors.reset}
        />
        <Field
          label="Phone number"
          name="phoneNumber"
          icon="contact_phone"
          errors={errors.values.phoneNumber}
          resetError={errors.reset}
        />
      </div>
      <div className="form__button-group">
        <Button className="form__button" text="Confirm" />
      </div>
    </form>
  );
}
