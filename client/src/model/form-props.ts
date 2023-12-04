import { FormEvent } from "react";
import { Errors } from "../service/use-errors";

export type FormProps<T> = {
  submit: (event: FormEvent) => void;
  errors: Errors<T>;
};
