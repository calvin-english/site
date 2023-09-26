import {
  ADDITION_OPERATION,
  SUBTRACTION_OPERATION,
  MULTIPLICATION_OPERATION,
  DIVISION_OPERATION,
} from "./constants";
const operationFunctions = {
  [ADDITION_OPERATION]: (a, b) => a + b,
  [SUBTRACTION_OPERATION]: (a, b) => a - b,
  [MULTIPLICATION_OPERATION]: (a, b) => a * b,
  [DIVISION_OPERATION]: (a, b) => a / b,
};

const getSolution = ({ operation, inputs }) => {
  const operationFunc = operationFunctions[operation];
  const solution = inputs.slice(1).reduce((acc, num) => {
    return operationFunc(acc, num);
  }, inputs[0]);

  return solution;
};

export default getSolution;
