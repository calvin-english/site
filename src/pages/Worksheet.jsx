import React, { useRef, useMemo } from "react";
import { useEffectOnce } from "react-use";
import { useColorMode } from "theme-ui";

import { controls, pageBreak } from "../style/Worksheet.module.css";

import WorksheetControls from "../components/WorksheetControls";
import HydratedWorksheet from "../components/HydratedWorksheet";
import useMultipleWorksheets from "../functions/useMultipleWorksheets";

const { group: groupOld, groupEnd: groupEndOld, log: logOld } = console;

const logStack = [];

const consoleIgnores = [
  "useWorksheetSize",
  "setLayoutState",
  "useEffect-worksheetState",
  "useLayoutEffect",
  "useCallback-rand",
];

const getDoConsoleAction = (group) => {
  return !consoleIgnores.includes(group);
};

console.group = (group) => {
  logStack.push(group);
  if (getDoConsoleAction(group)) {
    groupOld(group);
  }
};

console.groupEnd = () => {
  const group = logStack.pop();
  if (getDoConsoleAction(group)) {
    groupEndOld();
  }
};

console.log = (...args) => {
  if (logStack.length > 0) {
    const group = logStack[logStack.length - 1];
    if (getDoConsoleAction(group)) {
      logOld(...args);
    } else {
      console.debug(...args);
    }
  } else {
    logOld(...args);
  }
};

// const MAX_SHEETS = 1;

const useForceLightMode = () => {
  const [colorMode, setColorMode] = useColorMode();
  const oldColorMode = useRef();

  useEffectOnce(() => {
    oldColorMode.current = colorMode;
    const oldColorModeCurrent = oldColorMode.current;
    setColorMode("light");
    return () => setColorMode(oldColorModeCurrent);
  });
};

const Worksheet = () => {
  useForceLightMode();

  const {
    boundaryRef,
    worksheetRef,
    fontSize,
    worksheetData,
    isAllSheetsDone,
    sheets,
    onSubmit,
    isLoading,
    isError,
    isHydrateSheet,
  } = useMultipleWorksheets();

  const finishedWorksheets = useMemo(() => {
    if (!isAllSheetsDone) {
      return <></>;
    }
    console.group("finishedWorksheets");

    const result = sheets.map((d, index) => {
      const { isError, fontSize, worksheetData } = d;
      const { regenerateId: key } = worksheetData;
      console.log(`key: ${key}`);
      return (
        <>
          <HydratedWorksheet
            key={key}
            index={index + 1}
            isError={isError}
            finalFontSize={fontSize}
            fontSize={fontSize}
            worksheetData={worksheetData}
          />
          <p className={pageBreak} />
        </>
      );
    });
    console.log({ result });
    console.groupEnd();

    return result;
  }, [isAllSheetsDone, sheets]);

  return (
    <>
      <div className={controls}>
        <WorksheetControls onSubmit={onSubmit} />
        {isLoading && <div>Loading...</div>}

        {isError && <div>Too many things not enough space</div>}
      </div>
      {isHydrateSheet && (
        <HydratedWorksheet
          isError={isError}
          boundaryRef={boundaryRef}
          worksheetRef={worksheetRef}
          fontSize={fontSize}
          worksheetData={worksheetData}
        />
      )}
      {isAllSheetsDone && <>{finishedWorksheets}</>}
    </>
  );
};

export default Worksheet;
