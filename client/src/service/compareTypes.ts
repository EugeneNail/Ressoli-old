export function compareTypes(leftOperand: any, rightOperand: any): boolean {
  return (
    Object.keys(leftOperand).length === Object.keys(rightOperand).length &&
    Object.keys(leftOperand).every((key) => Object.keys(rightOperand).includes(key))
  );
}
