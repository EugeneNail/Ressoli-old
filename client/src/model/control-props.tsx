export type ControlProps = {
  label: string;
  name: string;
  value?: string;
  icon: string;
  helperText?: string;
  resetError?: (name: string) => void;
  errors: string[];
};
