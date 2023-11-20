import Button from "../button/button";
import Textbox from "../inputbox/textbox";
import { FormState } from "../../model/form-state";
import { faCity, faMap, faRoad } from "@fortawesome/free-solid-svg-icons";
import { Address } from "../../model/address";

export class AddressFormErrors {
  street: string[] = [];
  city: string[] = [];
  houseNumber: string[] = [];
}

type AddressFormProps = {
  submit: () => void;
  back: () => void;
  state: FormState<Address, AddressFormErrors>;
};

function AddressForm({ submit, back, state: { fields, errors, setField, clearFieldErrors } }: AddressFormProps) {
  return (
    <form action="" className="form address-form">
      <h1 className="form__header">Адрес</h1>
      <div className="form__input-group">
        <Textbox
          value={fields.city}
          label="Город"
          icon={faCity}
          onChange={setField}
          name="city"
          clearErrors={clearFieldErrors}
          errors={errors.city}
        />
        <Textbox
          value={fields.street}
          label="Улица"
          icon={faRoad}
          onChange={setField}
          name="street"
          clearErrors={clearFieldErrors}
          errors={errors.street}
        />
        <Textbox
          value={fields.houseNumber}
          label="Номер участка"
          icon={faMap}
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
