import { FormProps } from "../../model/form-props";
import Button from "../button/button";
import { Field } from "../custom-control/field";
import "./form.sass";

export class AddressFormErrors {
  addressNumber: string[] = [];
  city: string[] = [];
  postalCode: string[] = [];
  street: string[] = [];
  typeOfStreet: string[] = [];
}

type AddressFormProps = FormProps<AddressFormErrors> & {};

export function AddressForm({ submit, errors }: AddressFormProps) {
  return (
    <form action="" className="form" onSubmit={submit}>
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
      <div className="form__button-group">
        <Button className="form__button" text="Confirm" />
      </div>
    </form>
  );
}
