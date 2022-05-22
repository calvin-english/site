import React from "react";
import PropTypes from "prop-types";
import { problem, input } from "../style/Worksheet.module.css";

const Problem = ({ boundedInputs, operation }) => {
  // console.log("asfjasdkfjadskfjh;dskjf;sak");
  const lines = [];
  const totalBoundedInputs = boundedInputs.length;
  // console.log(`-----Problem: ${totalBoundedInputs}`);
  for (let i = 0; i < totalBoundedInputs; i += 1) {
    const operationString = i == totalBoundedInputs - 1 ? `${operation} ` : "";
    lines.push(
      <div
        className={input}
        key={`line-${i}`}
      >{`${operationString}${boundedInputs[i]}`}</div>
    );
  }

  // console.log("-------------------Problem", { lines });
  return <div className={problem}>{lines}</div>;
};

Problem.propTypes = {
  boundedInputs: PropTypes.array.isRequired,
  operation: PropTypes.string.isRequired,
};

export default Problem;
