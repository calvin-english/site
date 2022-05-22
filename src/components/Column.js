import React from "react";
import PropTypes from "prop-types";

import { item } from "../style/Worksheet.module.css";

const Column = ({ itemContent }) => {
  return <div className={item}>{itemContent}</div>;
};

Column.propTypes = {
  itemContent: PropTypes.any.isRequired,
};

export default Column;
