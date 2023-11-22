import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type FormState<D, E> = {
  fields: D;
  errors: E;
  setField: (event: ChangeEvent<HTMLInputElement>) => void;
  setErrors: (newErrors: E) => void;
  clearFieldErrors: (name: string) => void;
  setData: Dispatch<SetStateAction<D>>;
};
