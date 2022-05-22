import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const WorksheetControls = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      problemCount: 21,
      columnCount: 3,
      operation: "+",
      inputCount: 2,
      maxRand: 999,
      minRand: 1,
      minSolution: 0,
    },
  });
  const [data, setData] = useState("");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        setData(JSON.stringify(data));
      })}
    >
      <label>
        Problems:
        <input {...register("problemCount")} type="number" />
      </label>
      <label>
        Columns:
        <input {...register("columnCount")} type="number" />
      </label>
      <label>
        Operation:
        <select {...register("operation")}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
      </label>
      <label>
        Lines: <input {...register("inputCount")} type="number" />
      </label>
      <label>
        Min Rand: <input {...register("minRand")} type="number" />
      </label>
      <label>
        Max Rand: <input {...register("maxRand")} type="number" />
      </label>
      <label>
        Min Solution: <input {...register("minSolution")} type="number" />
      </label>
      <label>
        Max Solution: <input {...register("maxSolution")} type="number" />
      </label>

      <p>{data}</p>
      <input type="submit" />
    </form>
  );
};

WorksheetControls.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default WorksheetControls;
