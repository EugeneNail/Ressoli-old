import "./form.sass";
import { Field } from "../custom-control/field";
import Button from "../button/button";
import { FormProps } from "../../model/form-props";
import { SaveMark } from "./save-mark";
import { Saveable } from "../../model/saveable";
import { Client } from "../../model/client";

export class ClientFormErrors {
  name: string[] = [];
  surname: string[] = [];
  phoneNumber: string[] = [];
}

type ClientFormProps = FormProps<ClientFormErrors, Client> & Saveable;

export function ClientForm({ submit, errors, saved, unsave, initialState = new Client() }: ClientFormProps) {
  return (
    <form method="POST" className="form" onSubmit={submit} onClick={unsave}>
      <div className="form__control-group">
        <Field
          initialValue={initialState.name}
          label="Name"
          name="name"
          icon="account_box"
          errors={errors.values.name}
          resetError={errors.reset}
        />
        <Field
          initialValue={initialState.surname}
          label="Surname"
          name="surname"
          icon="account_box"
          errors={errors.values.surname}
          resetError={errors.reset}
        />
        <Field
          initialValue={initialState.phoneNumber}
          label="Phone number"
          name="phoneNumber"
          icon="contact_phone"
          errors={errors.values.phoneNumber}
          resetError={errors.reset}
        />
      </div>
      {!saved && (
        <div className="form__button-group">
          <Button className="form__button" text="Confirm" />
        </div>
      )}
      {saved && <SaveMark />}
    </form>
  );
}
