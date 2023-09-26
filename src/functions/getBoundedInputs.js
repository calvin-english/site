import _ from "lodash";
import getSolution from "./getSolution";
import { ADDITION_OPERATION } from "./constants";
const getBoundedInputs = (args) => {
  const {
    rand,
    minSolution = 0,
    maxSolution,
    inputCount,
    operation,
    minRand,
    maxRand,
  } = args;
  const rands = [];
  for (let i = 0; i < inputCount; i += 1) {
    const randNum = rand(minRand, maxRand);
    if (_.isNaN(randNum)) {
      console.log({ randNum, minRand, maxRand });

      console.log("##############");
    }
    rands.push(randNum);
  }
  if (operation !== ADDITION_OPERATION) {
    rands.sort().reverse();
  }

  const solution = getSolution({ operation, inputs: rands });

  if (solution < minSolution || (maxSolution && solution > maxSolution)) {
    return getBoundedInputs(args);
  }

  return { rands, solution, operation };
};

export default getBoundedInputs;
