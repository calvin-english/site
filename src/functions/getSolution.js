const operationFunctions = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const getSolution = ({ operation, inputs }) => {
  const operationFunc = operationFunctions[operation];
  const solution = inputs.slice(1).reduce((acc, num) => {
    return operationFunc(acc, num);
  }, inputs[0]);

  return solution;
};

export default getSolution;
