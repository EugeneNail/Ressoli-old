import { FormProps } from "../../model/form-props";
import Button from "../button/button";
import { Checkbox } from "../custom-control/checkbox";
import { Dropdown } from "../custom-control/dropdown";
import { Numeric } from "../custom-control/numeric";

export class TermsFormErrors {
  contract: string[] = [];
  hasMortgage: string[] = [];
  hasVat: string[] = [];
  price: string[] = [];
}

type TermsFormProps = FormProps<TermsFormErrors> & {};

export function TermsForm({ submit, errors }: TermsFormProps) {
  return (
    <form action="" className="form" onSubmit={submit}>
      <div className="form__control-group">
        <Dropdown
          label="Contract"
          name="contract"
          icon="description"
          options={["Test", "test2"]}
          errors={errors.values.contract}
          resetError={errors.reset}
        />
        <Numeric
          label="Price"
          name="price"
          icon="payments"
          min={1}
          step={1000}
          max={100000000}
          errors={errors.values.contract}
          resetError={errors.reset}
        />
      </div>
      <div className="form__control-group vertical">
        <Checkbox label="Mortgage" name="hasMortgage" />
        <Checkbox label="VAT" name="hasVat" />
      </div>
      <div className="form__button-group">
        <Button className="form__button" text="Confirm" />
      </div>
    </form>
  );
}
