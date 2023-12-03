import { useEffect, useRef } from "react";

type CheckboxProps = {
  label: string;
  name: string;
  checked?: boolean;
};

export function Checkbox({ label, name, checked = false }: CheckboxProps) {
  useEffect(() => {}, []);
  const ref = useRef<HTMLInputElement>(document.createElement("input") as HTMLInputElement);

  useEffect(() => {
    ref.current.checked = checked;
  }, []);

  return (
    <label htmlFor={name} className="checkbox">
      <div className="checkbox__square">
        <span className="checkbox__icon material-symbols-outlined">check</span>
      </div>
      <input ref={ref} name={name} id={name} type="checkbox" className="checkbox__input" />
      <p className="checkbox__label">{label}</p>
    </label>
  );
}
