import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import { Grid, Button } from "theme-ui";
import {
  container,
  controls,
  printPreview,
  pageBreak,
} from "../style/Worksheet.module.css";

import Rows from "../components/Rows";
import getSolution from "../functions/getSolution";

import _ from "lodash";

const PageNum = ({ index }) => {
  if (_.isNil(index)) {
    return <></>;
  }
  return (
    <div
      style={{
        position: "relative",
        height: "0px",
        width: "0px",
        boarder: "1px solid green",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0px",
          boarder: "1px solid purple",
          fontSize: "12px",
        }}
      >
        ({index})
      </div>
    </div>
  );
};

PageNum.defaultProps = {
  index: undefined,
};
PageNum.propTypes = {
  index: PropTypes.number,
};

const HydratedWorksheet = ({
  worksheetData,
  isError,
  boundaryRef,
  worksheetRef,
  fontSize,
  index,
  finalFontSize: finalFontSizeInitial,
}) => {
  const { operation, columnCount, problems } = worksheetData;
  const [finalFontSize, setFinalFontSize] = useState(finalFontSizeInitial);
  const increaseFont = useCallback(() => {
    setFinalFontSize((f) => f + 1);
  }, []);
  const decreaseFont = useCallback(() => {
    setFinalFontSize((f) => f - 1);
  }, []);

  let solutions = [];
  if (!_.isNil(finalFontSize)) {
    solutions = problems.map((inputs) => {
      return [getSolution({ inputs, operation })];
    });
  }

  const doShowProblems = !isError;
  const doShowSolutions = doShowProblems && solutions && solutions.length > 0;
  return (
    <>
      <div className={controls}>
        {finalFontSize && (
          <>
            <Grid mt={2} gap={2} columns={[1, 2, 2]}>
              <Button onClick={increaseFont}>( + ) Increase Font</Button>
              <Button onClick={decreaseFont}>( - ) Decrease Font</Button>
            </Grid>

            <div>Print Preview:</div>
          </>
        )}

        {isError && <div>Too many things not enough space</div>}
      </div>
      {doShowProblems && (
        <>
          <div
            ref={boundaryRef}
            className={printPreview}
            style={{ fontSize: `${finalFontSize ?? fontSize}px` }}
          >
            {" "}
            <PageNum index={index} />
            <div ref={worksheetRef} className={container}>
              <Rows
                problems={problems}
                columnCount={columnCount}
                operation={operation}
              />
            </div>
          </div>
        </>
      )}
      {doShowSolutions && (
        <>
          <p className={pageBreak} />
          <div className={printPreview} style={{ fontSize: `${fontSize}px` }}>
            <PageNum index={index} />
            <div className={container}>
              <Rows
                problems={solutions}
                columnCount={columnCount}
                operation=""
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

HydratedWorksheet.defaultProps = {
  boundaryRef: undefined,
  worksheetRef: undefined,
  finalFontSize: undefined,
  index: undefined,
};
HydratedWorksheet.propTypes = {
  worksheetData: PropTypes.object.isRequired,
  isError: PropTypes.bool.isRequired,
  boundaryRef: PropTypes.any,
  worksheetRef: PropTypes.any,
  fontSize: PropTypes.number.isRequired,
  finalFontSize: PropTypes.number,
  index: PropTypes.number,
};
export default HydratedWorksheet;
