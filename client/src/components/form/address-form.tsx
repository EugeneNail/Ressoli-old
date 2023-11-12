import { FC } from "react";
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
  submit?: () => void;
  back?: () => void;
  state: FormState<AddressFormFields, AddressFormErrors>;
};

const AddressForm: FC<AddressFormProps> = ({ submit, back, state: { errors, setField, clearFieldErrors } }) => {
  return (
    <form action="" className="form address-form">
      <h1 className="form__header">Адрес</h1>
      <div className="form__input-group">
        <Textbox label="Город" onChange={setField} name="city" clearErrors={clearFieldErrors} errors={errors.city} />
        <Textbox
          label="Улица"
          onChange={setField}
          name="street"
          clearErrors={clearFieldErrors}
          errors={errors.street}
        />
        <Textbox
          label="Номер дома"
          onChange={setField}
          name="houseNumber"
          clearErrors={clearFieldErrors}
          errors={errors.houseNumber}
        />
      </div>
      <div className="form__button-group">
        <Button type="light" wide text="Назад" action={() => back?.()} />
        <Button type="regular" wide text="Далее" action={() => submit?.()} />
      </div>
    </form>
  );
};

export default AddressForm;
