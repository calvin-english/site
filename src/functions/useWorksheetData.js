import { useCallback, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import _ from "lodash";

import getProblems from "../functions/getProblems";
import getRandom from "../functions/getRandom";

const useWorksheetData = () => {
  const [regenerateId, setRegenerateId] = useState(uuidv4());
  const [data, setData] = useState();
  const [problems, setProblems] = useState([]);

  const rand = useCallback(
    (minRand, maxRand) => {
      // console.group("useCallback-rand");
      // console.log({ regenerateCount });
      // console.groupEnd();
      return getRandom(minRand, maxRand, regenerateId);
    },
    [regenerateId]
  );

  useEffect(() => {
    setProblems(
      getProblems({
        ...data,
        rand,
      })
    );
  }, [rand, data]);

  const generateWorksheetData = useCallback((dataIn) => {
    setData({ ...dataIn });
  }, []);

  const resetWorksheetData = useCallback(() => {
    setData(undefined);
    setProblems([]);
    setRegenerateId(() => {
      console.group("setRegenerateCount");
      const result = uuidv4();
      console.log(`result: ${result}`);
      console.groupEnd();
      return result;
    });
  }, []);

  let worksheetData;
  if (!_.isNil(data) && problems.length > 0) {
    worksheetData = {
      ...data,
      problems,
      regenerateId,
    };
  }

  return { resetWorksheetData, worksheetData, generateWorksheetData };
};

export default useWorksheetData;
