import Button from "../button/button";
import Textbox from "../inputbox/textbox";
import { FormState } from "../../model/form-state";
import { faBuilding, faCity, faMap, faRoad } from "@fortawesome/free-solid-svg-icons";
import { Address } from "../../model/address";
import SelectBox from "../inputbox/selectbox";
import { AddressOptions } from "../../model/options/address-options";
import { useEffect, useState } from "react";
import api from "../../service/api";

export class AddressFormErrors {
  typeOfCity: string[] = [];
  city: string[] = [];
  typeOfStreet: string[] = [];
  street: string[] = [];
  houseNumber: string[] = [];
  apartmentNumber: string[] = [];
}

type AddressFormProps = {
  submit: () => void;
  back: () => void;
  state: FormState<Address, AddressFormErrors>;
  full?: boolean;
  label?: string;
};

function AddressForm({
  submit,
  back,
  full,
  label = "Номер дома",
  state: { fields, errors, setField, clearFieldErrors },
}: AddressFormProps) {
  const [options, setOptions] = useState(new AddressOptions());

  useEffect(() => {
    api.get("/options/address").then((response) => setOptions(response.data));
  }, []);

  return (
    <form action="" className="form address-form">
      <h1 className="form__header">Адрес</h1>
      <div className="form__input-group">
        <div className="address-form__city-group">
          <SelectBox
            label="Пункт"
            name="typeOfCity"
            value={fields.typeOfCity}
            icon={faCity}
            options={options.city}
            onChange={setField}
            clearErrors={clearFieldErrors}
            errors={errors.typeOfCity}
          />
          <Textbox
            value={fields.city}
            label={fields.typeOfCity}
            onChange={setField}
            name="city"
            clearErrors={clearFieldErrors}
            errors={errors.city}
          />
        </div>
        <div className="address-form__street-group">
          <SelectBox
            label="Улица"
            name="typeOfStreet"
            icon={faRoad}
            value={fields.typeOfStreet}
            options={options.street}
            onChange={setField}
            clearErrors={clearFieldErrors}
            errors={errors.typeOfStreet}
          />
          <Textbox
            value={fields.street}
            label={fields.typeOfStreet}
            onChange={setField}
            name="street"
            clearErrors={clearFieldErrors}
            errors={errors.street}
          />
        </div>
        <Textbox
          value={fields.houseNumber}
          label={label as string}
          icon={faMap}
          onChange={setField}
          name="houseNumber"
          clearErrors={clearFieldErrors}
          errors={errors.houseNumber}
        />
        {full && (
          <Textbox
            value={fields.apartmentNumber}
            label="Номер квартиры"
            icon={faBuilding}
            onChange={setField}
            name="apartmentNumber"
            clearErrors={clearFieldErrors}
            errors={errors.apartmentNumber}
          />
        )}
      </div>
      <div className="form__button-group">
        <Button wide text="Назад" style="dotted" action={back} />
        <Button wide text="Далее" style="filled" action={submit} />
      </div>
    </form>
  );
}

export default AddressForm;
