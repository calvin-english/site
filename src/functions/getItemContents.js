import React from "react";

import Problem from "../components/Problem";

const getItemContents = ({ totalItems, problems, operation }) => {
  const itemContents = [];
  const totalProblems = problems.length;
  for (let i = 0; i < totalItems; i += 1) {
    // console.log(`    i: ${i} | isEMpty: ${i >= totalProblems}`);
    if (i >= totalProblems) {
      itemContents.push(<div />);
    } else {
      const boundedInputs = problems[i];
      // console.log("   +++++itemContents push Problem:", { boundedInputs });
      const problemElement = (
        <Problem boundedInputs={boundedInputs} operation={operation} />
      );
      itemContents.push(problemElement);
      // console.log("   itemContents:", itemContents);
    }
  }
  return itemContents;
};

export default getItemContents;
