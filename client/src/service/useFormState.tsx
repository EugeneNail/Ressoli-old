import { ChangeEvent, useState } from "react";

const useFormState = <D, E>(
  initialData: D,
  initialErrors: any
): [
  D,
  any,
  {
    setField: (event: ChangeEvent<HTMLInputElement>) => void;
    setErrors: (newErrors: E) => void;
    clearFieldErrors: (name: string) => void;
  }
] => {
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

  return [data, errors, { setField, setErrors, clearFieldErrors }];
};

export default useFormState;
