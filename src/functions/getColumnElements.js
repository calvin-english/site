import React from "react";

import Column from "../components/Column";

const getColumnElements = ({ itemContents, itemIndex, columnCount }) => {
  const columns = [];
  for (let i = 0; i < columnCount; i += 1) {
    columns.push(
      <Column key={`col-${i}`} itemContent={itemContents[itemIndex + i]} />
    );
  }
  // extra column for spacing
  // TODO itemContent should probably be children
  const extraColumn = <Column key="extra" itemContent={<div />} />;
  columns.push(extraColumn);
  // console.log("getColumnElements", { columnCount, columns, itemIndex });

  return columns;
};

export default getColumnElements;
