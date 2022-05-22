import React from "react";
import _ from "lodash";

import Row from "../components/Row";

const getRowElements = ({ rowCount, itemContents, columnCount }) => {
  const rowElements = [];
  let itemIndex = 0;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const rowElement = (
      <Row
        key={`row${rowIndex}`}
        itemContents={itemContents}
        itemIndex={itemIndex}
        columnCount={columnCount}
      />
    );
    rowElements.push(rowElement);
    itemIndex += columnCount;
  }
  const lastRowItemContents = _.fill(Array(columnCount), <div />);
  const lastRowElement = (
    <Row
      key={`lastRowrow`}
      itemContents={lastRowItemContents}
      itemIndex={0}
      columnCount={columnCount}
    />
  );
  rowElements.push(lastRowElement);
  return rowElements;
};

export default getRowElements;
