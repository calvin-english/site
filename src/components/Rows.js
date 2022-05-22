import React, { useMemo } from "react";
import PropTypes from "prop-types";

import getItemContents from "../functions/getItemContents";
import getRowElements from "../functions/getRowElements";

const Rows = ({ problems, columnCount, operation }) => {
  // console.log("Rows", { problems, columnCount, operation });
  const rowCount = Math.ceil(problems.length / columnCount);
  const totalItems = columnCount * rowCount;
  const itemContents = useMemo(
    () => getItemContents({ totalItems, problems, operation }),
    [operation, problems, totalItems]
  );
  // const itemContents = getItemContents({ totalItems, problems, operation });
  const rowElements = useMemo(
    () => getRowElements({ rowCount, itemContents }),
    [rowCount, itemContents]
  );
  // const rowElements = getRowElements({ rowCount, itemContents });

  console.log("Rows", {
    itemContents,
    rowElements,
    rowCount,
    problems,
    columnCount,
    operation,
  });
  return <>{rowElements}</>;
};

Rows.propTypes = {
  problems: PropTypes.array.isRequired,
  columnCount: PropTypes.number.isRequired,
  operation: PropTypes.string.isRequired,
};

export default Rows;
