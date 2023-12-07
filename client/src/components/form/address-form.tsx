import { Saveable } from "../../model/saveable";
import { FormProps } from "../../model/form-props";
import Button from "../button/button";
import { Field } from "../custom-control/field";
import { SaveMark } from "./save-mark";
import "./form.sass";
import { Address } from "../../model/address";

export class AddressFormErrors {
  addressNumber: string[] = [];
  city: string[] = [];
  postalCode: string[] = [];
  street: string[] = [];
  typeOfStreet: string[] = [];
}

type AddressFormProps = FormProps<AddressFormErrors, Address> & Saveable & {};

export function AddressForm({ submit, errors, saved, unsave, initialState = new Address() }: AddressFormProps) {
  return (
    <form action="" className="form" onSubmit={submit} onClick={unsave}>
      <div className="form__control-group">
        <Field
          label="Address Number"
          name="addressNumber"
          icon="location_on"
          errors={errors.values.addressNumber}
          resetError={errors.reset}
          initialValue={initialState?.addressNumber}
        />
        <Field
          label="Street"
          name="street"
          icon="add_road"
          errors={errors.values.street}
          resetError={errors.reset}
          initialValue={initialState?.street}
        />
        <Field
          label="City"
          name="city"
          icon="location_city"
          errors={errors.values.city}
          resetError={errors.reset}
          initialValue={initialState?.city}
        />
        <Field
          label="Postal Code (optional)"
          name="zipCode"
          icon="mail"
          errors={errors.values.postalCode}
          resetError={errors.reset}
          initialValue={initialState?.postalCode}
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
