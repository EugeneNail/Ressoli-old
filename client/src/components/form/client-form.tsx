import { FC } from "react";
import Textbox from "../inputbox/textbox";
import Button from "../button/button";
import "./form.sass";
import { FormState } from "../../model/form-state";

export class ClientFormFields {
  id: number = 0;
  name: string = "";
  surname: string = "";
  phoneNumber: string = "";
  test: boolean = false;
}

export class ClientFormErrors {
  name: string[] = [];
  surname: string[] = [];
  phoneNumber: string[] = [];
}

type ClientFormProps = {
  submit: () => void;
  state: FormState<ClientFormFields, ClientFormErrors>;
};

const ClientForm: FC<ClientFormProps> = ({ submit, state: { fields, errors, setField, clearFieldErrors } }) => {
  return (
    <form action="" className="client-form form">
      <h1 className="form__header">Клиент</h1>
      <div className="form__input-group">
        <Textbox
          name="name"
          label="Имя"
          value={fields.name}
          onChange={setField}
          errors={errors.name}
          clearErrors={clearFieldErrors}
        />
        <Textbox
          value={fields.surname}
          name="surname"
          label="Фамилия"
          onChange={setField}
          errors={errors.surname}
          clearErrors={clearFieldErrors}
        />
        <Textbox
          value={fields.phoneNumber}
          name="phoneNumber"
          label="Номер телефона"
          onChange={setField}
          errors={errors.phoneNumber}
          clearErrors={clearFieldErrors}
        />
      </div>
      <div className="form__button-group">
        <Button wide style="filled" text="Далее" action={submit} />
      </div>
    </form>
  );
};

export default ClientForm;
