import getSolution from "./getSolution";

const getBoundedInputs = ({
  rand,
  minSolution = 0,
  maxSolution,
  inputCount,
  operation,
}) => {
  const rands = [];
  for (let i = 0; i < inputCount; i += 1) {
    rands.push(rand());
  }

  const solution = getSolution({ operation, inputs: rands });

  if (solution < minSolution) {
    return getBoundedInputs({
      rand,
      minSolution,
      maxSolution,
      inputCount,
      operation,
    });
  }
  if (maxSolution && solution > maxSolution) {
    return getBoundedInputs({
      rand,
      minSolution,
      maxSolution,
      inputCount,
      operation,
    });
  }

  return rands;
};

export default getBoundedInputs;
