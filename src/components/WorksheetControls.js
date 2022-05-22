import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const WorksheetControls = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      <div>
        <label>
          Problems:
          <input
            type="number"
            {...register("problemCount", {
              valueAsNumber: true,
              required: true,
              min: 1,
            })}
          />
          {errors?.problemCount && errors.problemCount.message}
        </label>
      </div>
      <div>
        <label>
          Columns:
          <input
            type="number"
            {...register("columnCount", {
              valueAsNumber: true,
              required: true,
              min: 1,
            })}
          />
          {errors?.columnCount && errors.columnCount.message}
        </label>
      </div>

      <div>
        <label>
          Operation:
          <select {...register("operation")}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Lines:{" "}
          <input
            type="number"
            {...register("inputCount", {
              valueAsNumber: true,
              required: true,
              min: 2,
            })}
          />
          {errors?.inputCount && errors.inputCount.message}
        </label>
      </div>
      <div>
        <label>
          Min Rand:{" "}
          <input
            type="number"
            {...register("minRand", { valueAsNumber: true, required: true })}
          />
        </label>
        {errors?.minRand && errors.minRand.message}
      </div>
      <div>
        <label>
          Max Rand:{" "}
          <input
            type="number"
            {...register("maxRand", { valueAsNumber: true, required: true })}
          />
        </label>
        {errors?.maxRand && errors.maxRand.message}
      </div>
      <div>
        <label>
          Min Solution:{" "}
          <input
            type="number"
            {...register("minSolution", { valueAsNumber: true })}
          />
        </label>
        {errors?.minSolution && errors.minSolution.message}
      </div>
      <div>
        <label>
          Max Solution:{" "}
          <input
            type="number"
            {...register("maxSolution", { valueAsNumber: true })}
          />
        </label>
        {errors?.maxSolution && errors.maxSolution.message}
      </div>

      <p>{data}</p>
      <input type="submit" />
    </form>
  );
};

WorksheetControls.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default WorksheetControls;
