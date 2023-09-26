import { useCallback, useState, useEffect, useMemo } from "react";
import useWorksheet from "./useWorksheet";

const useMultipleWorksheets = () => {
  const [sheets, setSheets] = useState([]);
  const [data, setData] = useState();
  const { pages } = data ?? { pages: 5 };

  const sheetsLength = sheets.length;
  const isAllSheetsDone = sheetsLength >= pages;

  const {
    resetAll,
    generateAll,
    worksheetData,
    worksheetRef,
    boundaryRef,
    fontSize,
    isCalculated,
    isError,
  } = useWorksheet();

  const onSubmit = useCallback(
    (dataIn) => {
      setSheets([]);
      resetAll();
      setData(dataIn);
      generateAll(dataIn);
    },
    [resetAll, generateAll]
  );

  const regenerate = useCallback(() => {
    console.group("regenerate");
    setSheets((p) => {
      console.group("setSheets");
      const result = [
        ...p,
        {
          isError,
          fontSize,
          worksheetData,
        },
      ];

      console.log({ p, result });
      console.groupEnd();
      return result;
    });
    resetAll();
    generateAll(data);
    console.groupEnd();
  }, [data, fontSize, generateAll, isError, resetAll, worksheetData]);

  useEffect(() => {
    if (worksheetData && isCalculated) {
      console.group("useEffect-generateNewWorksheet");
      console.log({ worksheetData, isCalculated, isAllSheetsDone });
      if (!isAllSheetsDone) {
        regenerate();
      }
      console.groupEnd("useEffect-generateNewWorksheet");
    }
  }, [isAllSheetsDone, isCalculated, regenerate, worksheetData]);

  const isLoading = useMemo(
    () => worksheetData && !isCalculated && !isAllSheetsDone,
    [isAllSheetsDone, isCalculated, worksheetData]
  );

  const isHydrateSheet = useMemo(
    () => !isAllSheetsDone && worksheetData,
    [isAllSheetsDone, worksheetData]
  );
  return {
    boundaryRef,
    worksheetRef,
    fontSize,
    worksheetData,
    onSubmit,
    regenerate,
    isAllSheetsDone,
    sheets,
    isLoading,
    isError,
    isHydrateSheet,
  };
};

export default useMultipleWorksheets;
