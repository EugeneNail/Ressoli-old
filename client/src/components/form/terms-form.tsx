import { useEffect, useState } from "react";
import { FormProps } from "../../model/form-props";
import Button from "../button/button";
import { Checkbox } from "../custom-control/checkbox";
import { Dropdown } from "../custom-control/dropdown";
import { Numeric } from "../custom-control/numeric";
import { TermsOptions } from "../../model/options/terms-options";
import api from "../../service/api";
import { Saveable } from "../../model/saveable";
import { SaveMark } from "./save-mark";
import { Terms } from "../../model/terms";

export class TermsFormErrors {
  contract: string[] = [];
  hasMortgage: string[] = [];
  hasVat: string[] = [];
  price: string[] = [];
}

type TermsFormProps = FormProps<TermsFormErrors, Terms> & Saveable;

export function TermsForm({ submit, errors, saved, unsave, initialState = new Terms() }: TermsFormProps) {
  const [options, setOptions] = useState(new TermsOptions());

  useEffect(() => {
    api.get<TermsOptions>("/options/terms").then(({ data }) => {
      setOptions(data);
    });
  }, []);

  return (
    <form action="" className="form" onSubmit={submit} onClick={unsave}>
      <div className="form__control-group">
        <Dropdown
          initialValue={initialState.contract}
          label="Contract"
          name="contract"
          icon="description"
          options={options.contract}
          errors={errors.values.contract}
          resetError={errors.reset}
        />
        <Numeric
          initialValue={initialState.price?.toString()}
          label="Price"
          name="price"
          icon="payments"
          min={1}
          step={1000}
          max={100000000}
          errors={errors.values.price}
          resetError={errors.reset}
        />
      </div>
      <div className="form__control-group vertical">
        <Checkbox label="Mortgage" name="hasMortgage" checked={initialState.hasMortgage} />
        <Checkbox label="VAT" name="hasVat" checked={initialState.hasVat} />
      </div>
      {saved && <SaveMark />}
      <div className="form__button-group">{!saved && <Button className="form__button" text="Save" />}</div>
    </form>
  );
}
