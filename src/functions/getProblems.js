import getBoundedInputs from "./getBoundedInputs";

const getProblems = ({
  inputCount,
  problemCount,
  minSolution,
  maxSolution,
  rand,
  operation,
}) => {
  const problems = [];
  for (let i = 0; i < problemCount; i += 1) {
    problems.push(
      getBoundedInputs({
        rand,
        minSolution,
        maxSolution,
        inputCount,
        operation,
      })
    );
  }

  return problems;
};

export default getProblems;
