import React from "react";
import PropTypes from "prop-types";

import { row } from "../style/Worksheet.module.css";
import getColumnElements from "../functions/getColumnElements";

const Row = ({ itemContents, itemIndex, columnCount }) => {
  return (
    <div className={row}>
      {getColumnElements({ itemContents, itemIndex, columnCount })}
    </div>
  );
};

Row.propTypes = {
  itemContents: PropTypes.array.isRequired,
  itemIndex: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
};

export default Row;
