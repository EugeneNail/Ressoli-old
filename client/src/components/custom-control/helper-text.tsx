type HelperTextProps = {
  errors: string[];
  text: string;
};

export function HelperText({ errors, text }: HelperTextProps) {
  return (
    <>
      {errors.map((error, index) => (
        <p key={index} className="control__helper-text">
          <span className="material-symbols-outlined control__helper-icon">warning</span> {error}
        </p>
      ))}
      {text && errors.length === 0 && (
        <p className="control__helper-text">
          <span className="material-symbols-outlined control__helper-icon">info</span>
          {text}
        </p>
      )}
    </>
  );
}
