import { ChangeEvent } from "react";

export type FormStateActions<E> = {
  setField: (event: ChangeEvent<HTMLInputElement>) => void;
  setErrors: (newErrors: E) => void;
  clearFieldErrors: (name: string) => void;
};
