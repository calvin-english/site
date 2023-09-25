import { useCallback, useState, useEffect, useLayoutEffect } from "react";
import { useMeasure } from "react-use";

const MAX_ITERATIONS = 1000;
const defaultWorksheetState = {
  fontSize: 1,
  isCalculated: false,
  isError: false,
  thresholdCount: 0,
  count: 0,
  isTooBig: false,
};

const defaultLayoutState = {
  isTooBig: false,
  isTooSmall: true,
  layoutStateCount: 0,
};

const decreaseSetState = (prev) => {
  const fontSize = prev.fontSize - 1;
  return {
    ...prev,
    isTooBig: true,
    thresholdCount: prev.thresholdCount + 1,
    fontSize: fontSize,
    isError: fontSize <= 1,
  };
};

const increaseSetState = (prev) => {
  const { isTooBig } = prev;
  if (isTooBig) {
    return {
      ...prev,
      isCalculated: true,
    };
  }
  return {
    ...prev,
    fontSize: prev.fontSize + 1,
    count: prev.count + 1,
  };
};

const useWorksheetSize = () => {
  console.group("useWorksheetSize");
  const [data, setData] = useState();
  const [layoutState, setLayoutState] = useState(defaultLayoutState);

  const [worksheetState, setWorksheetState] = useState(defaultWorksheetState);

  const { layoutStateCount, isTooBig, isTooSmall } = layoutState;
  console.log({ layoutStateCount, isTooBig, isTooSmall });

  const resetWorksheetSize = useCallback(() => {
    setWorksheetState(defaultWorksheetState);
    setLayoutState(defaultLayoutState);
    setData(undefined);
  }, []);

  const generateWorksheetSize = useCallback(
    (dataIn) => setData({ ...dataIn }),
    []
  );

  const { fontSize, isCalculated, isError } = worksheetState;

  const [boundaryRef, { width: boundaryWidth, height: boundaryHeight }] =
    useMeasure();
  const [worksheetRef, { width: worksheetWidth, height: worksheetHeight }] =
    useMeasure();

  useLayoutEffect(() => {
    console.group("useLayoutEffect");
    const isValidMeasurement = data !== undefined && boundaryHeight !== 0;

    const isTooBig =
      worksheetHeight > boundaryHeight || worksheetWidth > boundaryWidth;
    const isTooSmall =
      worksheetHeight <= boundaryHeight && worksheetWidth <= boundaryWidth;

    console.log({ isTooBig, isTooSmall });
    console.log({ worksheetHeight, boundaryHeight });
    console.log({ worksheetWidth, boundaryWidth });
    if (!isCalculated && isValidMeasurement) {
      console.log("  setLayoutState");
      setLayoutState((prev) => {
        const layoutStateCount = prev.layoutStateCount + 1;
        console.group("setLayoutState");
        console.log(`layoutStateCount: ${layoutStateCount}`);
        console.groupEnd("setLayoutState");
        return {
          ...prev,
          layoutStateCount,
          isTooBig,
          isTooSmall,
        };
      });
    }
    console.groupEnd("useLayoutEffect");
  }, [
    boundaryHeight,
    boundaryWidth,
    data,
    isCalculated,
    worksheetHeight,
    worksheetWidth,
  ]);

  useEffect(() => {
    console.group("useEffect-worksheetState");
    if (isTooBig) {
      console.log("  too big");
      setWorksheetState(decreaseSetState);
    } else {
      console.log("  too small");
      setWorksheetState(increaseSetState);
      console.log(`layoutStateCount: ${layoutStateCount}`);
      if (layoutStateCount > MAX_ITERATIONS) {
        console.log("--- max iterations");

        setWorksheetState((prev) => ({
          ...prev,
          isError: true,
          isCalculated: true,
        }));
      }
    }
    console.groupEnd("useEffect-worksheetState");
  }, [isTooBig, layoutStateCount]);

  console.groupEnd("useWorksheetSize");
  return {
    resetWorksheetSize,
    worksheetRef,
    boundaryRef,
    fontSize,
    isCalculated,
    isError,
    generateWorksheetSize,
  };
};

export default useWorksheetSize;
