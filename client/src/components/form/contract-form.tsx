import { FormState } from "../../model/form-state";
import Button from "../button/button";
import Numberbox from "../inputbox/numberbox";
import Checkbox from "../inputbox/checkbox";
import SelectBox from "../inputbox/selectbox";
import { faCreditCard, faFileSignature, faPercent, faRuble } from "@fortawesome/free-solid-svg-icons";
import { Contract } from "../../model/contract";
import { useEffect, useState } from "react";
import api from "../../service/api";

export class ContractFormErrors {
  price: string[] = [];
  contract: string[] = [];
}

type ContractFormProps = {
  back: () => void;
  submit: () => void;
  willCreate?: boolean;
  state: FormState<Contract, ContractFormErrors>;
};

function ContractForm({
  back,
  submit,
  willCreate,
  state: { fields, errors, setField, clearFieldErrors },
}: ContractFormProps) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    api.get("/options/contract").then((response) => setOptions(response.data));
  }, []);

  return (
    <form action="" className="form">
      <h1 className="form__header">Ценовые условия</h1>
      <div className="form__input-group">
        <SelectBox
          value={fields.contract}
          label="Форма договора"
          name="contract"
          icon={faFileSignature}
          options={options}
          onChange={setField}
          errors={errors.contract}
          clearErrors={clearFieldErrors}
        />
        <Numberbox
          value={fields.price}
          label="Стоимость"
          name="price"
          icon={faRuble}
          onChange={setField}
          errors={errors.price}
          min={0}
          max={100000000}
          step={1000}
          clearErrors={clearFieldErrors}
        />
        <Checkbox
          value={fields.hasVat}
          label="С учетом НДС"
          name="hasVat"
          icon={faPercent}
          onChange={setField}
          clearErrors={clearFieldErrors}
        />
        <Checkbox
          value={fields.hasMortgage}
          label="Есть ипотека"
          name="hasMortgage"
          icon={faCreditCard}
          onChange={setField}
          clearErrors={clearFieldErrors}
        />
      </div>
      <div className="form__button-group">
        <Button style="dotted" wide text="Назад" action={back} />
        <Button style="filled" wide text={willCreate ? "Создать заявку" : "Отредактировать"} action={submit} />
      </div>
    </form>
  );
}

export default ContractForm;
