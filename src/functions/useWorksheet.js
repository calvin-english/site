import { useCallback } from "react";
import useWorksheetData from "./useWorksheetData";
import useWorksheetSize from "./useWorksheetSize";

const useWorksheet = () => {
  const { resetWorksheetData, worksheetData, generateWorksheetData } =
    useWorksheetData();

  const {
    resetWorksheetSize,
    worksheetRef,
    boundaryRef,
    fontSize,
    isCalculated,
    isError,
    generateWorksheetSize,
  } = useWorksheetSize();

  const resetAll = useCallback(() => {
    resetWorksheetSize();
    resetWorksheetData();
  }, [resetWorksheetSize, resetWorksheetData]);

  const generateAll = useCallback(
    (dataIn) => {
      generateWorksheetSize(dataIn);
      generateWorksheetData(dataIn);
    },
    [generateWorksheetData, generateWorksheetSize]
  );

  return {
    resetAll,
    generateAll,
    worksheetData,
    worksheetRef,
    boundaryRef,
    fontSize,
    isCalculated,
    isError,
  };
};

export default useWorksheet;
