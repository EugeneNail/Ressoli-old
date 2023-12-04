import { Saveable } from "../../model/saveable";
import { FormProps } from "../../model/form-props";
import Button from "../button/button";
import { Field } from "../custom-control/field";
import { SaveMark } from "./save-mark";
import "./form.sass";

export class AddressFormErrors {
  addressNumber: string[] = [];
  city: string[] = [];
  postalCode: string[] = [];
  street: string[] = [];
  typeOfStreet: string[] = [];
}

type AddressFormProps = FormProps<AddressFormErrors> & Saveable & {};

export function AddressForm({ submit, errors, saved, unsave }: AddressFormProps) {
  return (
    <form action="" className="form" onSubmit={submit} onClick={unsave}>
      <div className="form__control-group">
        <Field
          label="Address Number"
          name="addressNumber"
          icon="location_on"
          errors={errors.values.addressNumber}
          resetError={errors.reset}
        />
        <Field label="Street" name="street" icon="add_road" errors={errors.values.street} resetError={errors.reset} />
        <Field label="City" name="city" icon="location_city" errors={errors.values.city} resetError={errors.reset} />
        <Field
          label="Postal Code (optional)"
          name="zipCode"
          icon="mail"
          errors={errors.values.postalCode}
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
