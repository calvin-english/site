import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { useMeasure, useEffectOnce } from "react-use";
import { useColorMode } from "theme-ui";

import {
  container,
  controls,
  printPreview,
  pageBreak,
} from "../style/Worksheet.module.css";

import getProblems from "../functions/getProblems";
import getRandom from "../functions/getRandom";
import Rows from "../components/Rows";
import WorksheetControls from "../components/WorksheetControls";
import getSolution from "../functions/getSolution";

const TIMEOUT_MS = 50;
const MAX_ITERATIONS = 1000;

const defaultState = {
  fontSize: 1,
  isCalculated: false,
  isError: false,
  thresholdCount: 0,
  count: 0,
};
const Worksheet = () => {
  const [state, setState] = useState(defaultState);
  const [colorMode, setColorMode] = useColorMode();
  const oldColorMode = useRef();

  useEffectOnce(() => {
    oldColorMode.current = colorMode;
    const oldColorModeCurrent = oldColorMode.current;
    setColorMode("light");
    return () => setColorMode(oldColorModeCurrent);
  });

  const [data, setData] = useState();
  const [problems, setProblems] = useState([]);
  const [isSolutions, setIsSolutions] = useState(false);

  const onSubmit = useCallback((dataIn) => {
    setState(defaultState);
    setData(dataIn);
  }, []);

  const timeoutId = useRef(undefined);
  const { fontSize, isCalculated, isError, count } = state;

  const [boundaryRef, { width: boundaryWidth, height: boundaryHeight }] =
    useMeasure();
  const [worksheetRef, { width: worksheetWidth, height: worksheetHeight }] =
    useMeasure();

  useEffect(() => {
    const internalTimeoutId = timeoutId.current;
    console.log(
      `worksheetHeight: ${worksheetHeight} | boundaryHeight: ${boundaryHeight} | fontSize: ${fontSize} | isCalculated: ${isCalculated}`
    );
    const isValidMeasurement = data !== undefined && boundaryHeight !== 0;
    if (!isCalculated && isValidMeasurement) {
      if (internalTimeoutId !== undefined) {
        clearTimeout(internalTimeoutId);
      }
      if (worksheetHeight > boundaryHeight) {
        timeoutId.current = setTimeout(
          () =>
            setState((prev) => ({
              ...prev,
              isCalculated: true,
              thresholdCount: prev.thresholdCount + 1,
              fontSize: prev.fontSize - 1,
              isError: fontSize === 1,
            })),
          TIMEOUT_MS
        );
      } else {
        timeoutId.current = setTimeout(
          () =>
            setState((prev) => ({
              ...prev,
              fontSize: prev.fontSize + 1,
              count: prev.count + 1,
            })),
          TIMEOUT_MS
        );
        if (count > MAX_ITERATIONS) {
          setState((prev) => ({
            ...prev,
            isError: true,
            isCalculated: true,
          }));
        }
      }
    }
    return () => {
      if (internalTimeoutId !== undefined) {
        clearTimeout(internalTimeoutId);
      }
    };
  }, [
    boundaryHeight,
    boundaryWidth,
    count,
    data,
    fontSize,
    isCalculated,
    worksheetHeight,
    worksheetWidth,
  ]);

  const {
    maxRand,
    minRand,
    minSolution,
    maxSolution,
    problemCount,
    columnCount,
    operation,
    inputCount,
  } = data || {};

  const rand = useCallback(() => {
    return getRandom(minRand, maxRand);
  }, [maxRand, minRand]);

  useEffect(() => {
    setProblems(
      getProblems({
        inputCount,
        problemCount,
        minSolution,
        maxSolution,
        rand,
        operation,
      })
    );
  }, [inputCount, maxSolution, minSolution, operation, problemCount, rand]);

  const solutions = useMemo(
    () =>
      problems.map((inputs) => {
        return [getSolution({ inputs, operation })];
      }),
    [operation, problems]
  );

  console.log({ solutions });

  // console.log({ problems });
  return (
    <>
      <div className={controls}>
        <WorksheetControls onSubmit={onSubmit} />
      </div>
      <div className={controls}>
        {data && !isCalculated ? <div>Loading...</div> : <div />}
        <div>
          <button onClick={() => setIsSolutions((prev) => !prev)}>
            Toggle solutions
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              setState((prev) => ({
                ...prev,
                fontSize: prev.fontSize + 1,
              }))
            }
          >
            {" "}
            +{" "}
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              setState((prev) => ({
                ...prev,
                fontSize: prev.fontSize - 1,
              }))
            }
          >
            {" "}
            -{" "}
          </button>
        </div>
        <div>Print Preview:</div>
        {isError && <div>Too many things not enough space</div>}
      </div>
      {data && (
        <div
          ref={boundaryRef}
          className={printPreview}
          style={{ fontSize: `${fontSize}px` }}
        >
          <div ref={worksheetRef} className={container}>
            <Rows
              problems={problems}
              columnCount={columnCount}
              operation={operation}
            />
          </div>
        </div>
      )}
      {isSolutions && data && (
        <>
          <p className={pageBreak} />
          <div
            ref={boundaryRef}
            className={printPreview}
            style={{ fontSize: `${fontSize}px` }}
          >
            <div ref={worksheetRef} className={container}>
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

export default Worksheet;
