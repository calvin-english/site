import getBoundedInputs from "./getBoundedInputs";

const getProblems = ({ problemCount, rand, columnCount, columnMeta }) => {
  console.log({ columnMeta, columnCount });

  const problems = [];
  for (let i = 0; i < problemCount; i += 1) {
    const meta = columnMeta ?? [];
    const metaLength = meta.length;
    const metaIndex = i % metaLength;
    const {
      inputCount,
      minSolution,
      maxSolution,
      operation,
      minRand,
      maxRand,
    } = meta[metaIndex];

    problems.push(
      getBoundedInputs({
        rand,
        minSolution,
        maxSolution,
        inputCount,
        operation,
        minRand,
        maxRand,
      })
    );
  }

  return problems;
};

export default getProblems;
