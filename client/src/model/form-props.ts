import { FormEvent } from "react";
import { Errors } from "../service/use-errors";

export type FormProps<T, S> = {
  initialState?: S;
  submit: (event: FormEvent) => void;
  errors: Errors<T>;
};
