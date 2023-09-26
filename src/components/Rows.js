import React, { useMemo } from "react";
import PropTypes from "prop-types";

import getItemContents from "../functions/getItemContents";
import getRowElements from "../functions/getRowElements";

const Rows = ({ problems, columnCount }) => {
  const rowCount = Math.ceil(problems.length / columnCount);
  const totalItems = columnCount * rowCount;
  const itemContents = useMemo(
    () => getItemContents({ totalItems, problems }),
    [problems, totalItems]
  );
  const rowElements = useMemo(
    () => getRowElements({ rowCount, itemContents, columnCount }),
    [rowCount, itemContents, columnCount]
  );

  return <>{rowElements}</>;
};

Rows.propTypes = {
  problems: PropTypes.array.isRequired,
  columnCount: PropTypes.number.isRequired,
};

export default Rows;
