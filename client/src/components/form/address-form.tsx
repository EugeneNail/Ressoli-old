import { FC } from "react";
import useFormState from "../../service/useFormState";
import Button from "../button/button";
import Textbox from "../inputbox/textbox";
import api from "../../service/api";

class AddressFormFields {
  id: number = 0;
  street: string = "";
  city: string = "";
  houseNumber: string = "";
}

class AddressFormErrors {}

type AddressFormProps = {
  next?: () => void;
  back?: () => void;
};

const AddressForm: FC<AddressFormProps> = (props) => {
  const [fields, errors, { setField, setErrors, clearFieldErrors }] = useFormState(
    new AddressFormFields(),
    new AddressFormErrors()
  );

  const submit = async () => {
    const response = await api.post("/addresses", fields);
    if (response.status >= 400) {
      setErrors(response.data.errors);
      return;
    }
    fields.id = response.data;
    props.next?.();
  };

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
        <Button type="light" text="Назад" action={() => props.back?.()} />
        <Button type="regular" text="Далее" action={submit} />
      </div>
    </form>
  );
};

export default AddressForm;
