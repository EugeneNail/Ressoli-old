import { ChangeEvent, useState } from "react";
import { FormState } from "../model/form-state";

const useFormState = <D, E>(initialData: D, initialErrors: E): FormState<D, E> => {
  const [data, setData] = useState(initialData);
  let [errors, _setErrors] = useState(initialErrors);

  const setField = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    setData({ ...data, [input.name]: input.type == "checkbox" ? input.checked : input.value });
  };

  const setErrors = (newErrors: E) => {
    _setErrors({ ...newErrors });
  };

  const clearFieldErrors = (name: string) => {
    _setErrors({ ...errors, [name]: [] });
  };

  const formState: FormState<D, E> = {
    fields: data,
    errors,
    setField,
    setErrors,
    clearFieldErrors,
  };

  return formState;
};

export default useFormState;
