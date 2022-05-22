import React from "react";

import { item, row } from "../style/Worksheet.module.css";

const getRowElements = ({ rowCount, itemContents }) => {
  const rowElements = [];
  let itemIndex = 0;
  console.log("getRowElements", { rowCount, itemContents });
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    const rowElement = (
      <div key={`row${rowIndex}`} className={row}>
        <div className={item}>{itemContents[itemIndex]}</div>
        <div className={item}>{itemContents[itemIndex + 1]}</div>
        <div className={item}>{itemContents[itemIndex + 2]}</div>
        <div className={item}>
          <div />
        </div>
      </div>
    );
    console.log("getRowElements: ", {
      rowElement,
      itemContents: itemContents[itemIndex],
    });
    rowElements.push(rowElement);
    itemIndex += 3;
  }
  const lastRowElement = (
    <div key={`lastRowrow`} className={row}>
      <div className={item}>
        <div />
      </div>
      <div className={item}>
        <div />
      </div>
      <div className={item}>
        <div />
      </div>
      <div className={item}>
        <div />
      </div>
    </div>
  );
  rowElements.push(lastRowElement);
  return rowElements;
};

export default getRowElements;
