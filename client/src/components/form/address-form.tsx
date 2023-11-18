import Button from "../button/button";
import Textbox from "../inputbox/textbox";
import { FormState } from "../../model/form-state";

export class AddressFormFields {
  id: number = 0;
  street: string = "";
  city: string = "";
  houseNumber: string = "";
}

export class AddressFormErrors {
  street: string[] = [];
  city: string[] = [];
  houseNumber: string[] = [];
}

type AddressFormProps = {
  submit: () => void;
  back: () => void;
  state: FormState<AddressFormFields, AddressFormErrors>;
};

function AddressForm({ submit, back, state: { fields, errors, setField, clearFieldErrors } }: AddressFormProps) {
  return (
    <form action="" className="form address-form">
      <h1 className="form__header">Адрес</h1>
      <div className="form__input-group">
        <Textbox
          value={fields.city}
          label="Город"
          onChange={setField}
          name="city"
          clearErrors={clearFieldErrors}
          errors={errors.city}
        />
        <Textbox
          value={fields.street}
          label="Улица"
          onChange={setField}
          name="street"
          clearErrors={clearFieldErrors}
          errors={errors.street}
        />
        <Textbox
          value={fields.houseNumber}
          label="Номер дома"
          onChange={setField}
          name="houseNumber"
          clearErrors={clearFieldErrors}
          errors={errors.houseNumber}
        />
      </div>
      <div className="form__button-group">
        <Button wide text="Назад" style="dotted" action={back} />
        <Button wide text="Далее" style="filled" action={submit} />
      </div>
    </form>
  );
}

export default AddressForm;
