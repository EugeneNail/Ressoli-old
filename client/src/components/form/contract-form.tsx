import { FC } from "react";
import { FormState } from "../../model/form-state";
import Button from "../button/button";
import Numberbox from "../inputbox/numberbox";
import Checkbox from "../inputbox/checkbox";

export class ContractFormFields {
  price: number = 0;
  hasMortgage: boolean = false;
  hasVat: boolean = false;
}

export class ContractFormErrors {
  price: string[] = [];
}

type ContractFormProps = {
  back: () => void;
  submit: () => void;
  state: FormState<ContractFormFields, ContractFormErrors>;
};

const ContractForm: FC<ContractFormProps> = ({
  back,
  submit,
  state: { fields, errors, setField, setErrors, clearFieldErrors },
}) => {
  return (
    <form action="" className="form">
      <h1 className="form__header">Ценовые условия</h1>
      <div className="form__input-group">
        <Numberbox
          value={fields.price}
          label="Стоимость"
          name="Price"
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
          onChange={setField}
          clearErrors={clearFieldErrors}
        />
        <Checkbox
          value={fields.hasMortgage}
          label="Есть ипотека"
          name="hasMortgage"
          onChange={setField}
          clearErrors={clearFieldErrors}
        />
      </div>
      <div className="form__button-group">
        <Button style="dotted" wide text="Назад" action={back} />
        <Button style="filled" wide text="Создать заявку" action={submit} />
      </div>
    </form>
  );
};

export default ContractForm;
