import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Box, Grid, Button } from "theme-ui";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

import {
  CALVIN_PRESET,
  WENDY_PRESET,
  ALICE_PRESET,
  ADDITION_OPERATION,
  SUBTRACTION_OPERATION,
  MULTIPLICATION_OPERATION,
  DIVISION_OPERATION,
} from "../functions/constants";

const schema = yup
  .object({
    problemCount: yup.number().integer().min(1).required().label("Problems"),
    columnCount: yup.number().integer().min(1).required().label("Columns"),
    inputCount: yup.number().integer().min(2).required().label("Lines"),
    operation: yup.string().required().label("Operation"),
    minRand: yup.number().integer().required().label("Minimum Random"),
    maxRand: yup.number().integer().required().label("Maximum Random"),
    minSolution: yup
      .number()
      .integer()
      .transform((value) => (isNaN(value) ? undefined : value))
      .label("Minimum Solution")
      .nullable()
      .optional(),
    maxSolution: yup
      .number()
      .integer()
      .transform((value) => (isNaN(value) ? undefined : value))
      .label("Maximum Solution")
      .nullable()
      .optional(),
  })
  .required();

const WorksheetControls = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
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

  const watchPresets = watch("presets");

  useEffect(() => {
    if (watchPresets === CALVIN_PRESET) {
      setValue("problemCount", 9);
      setValue("maxRand", 9);
    }
    if (watchPresets === WENDY_PRESET) {
      setValue("problemCount", 3);
      setValue("maxRand", 9);
      setValue("minRand", 0);
      setValue("maxSolution", 10);
      setValue("columnCount", 1);
    }
  }, [watchPresets, setValue]);

  return (
    <Box
      as="form"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        setData(JSON.stringify(data));
      })}
    >
      <Grid gap={2} columns={[1, 2, 4]}>
        <Box>
          <FormSelect errors={errors} label="Presets" {...register("presets")}>
            <option value=""></option>
            <option value={CALVIN_PRESET}>Calvin</option>
            <option value={WENDY_PRESET}>Wendy</option>
            <option value={ALICE_PRESET}>Alice</option>
          </FormSelect>
        </Box>
        <Box>
          <FormInput
            errors={errors}
            type="number"
            label="Problems"
            {...register("problemCount")}
          />
        </Box>
        <Box>
          <FormInput
            errors={errors}
            type="number"
            label="Columns"
            {...register("columnCount")}
          />
        </Box>
      </Grid>
      <Grid gap={2} columns={[1, 2, 4]}>
        <Box>
          <FormInput
            errors={errors}
            type="number"
            label="Lines"
            // {...register("inputCount", {
            //   valueAsNumber: true,
            //   required: true,
            //   min: 2,
            // })}
            {...register("inputCount")}
          />
        </Box>
        <Box>
          <FormSelect
            errors={errors}
            label="Operation"
            {...register("operation")}
          >
            <option value={ADDITION_OPERATION}>+</option>
            <option value={SUBTRACTION_OPERATION}>-</option>
            <option value={MULTIPLICATION_OPERATION}>*</option>
            <option value={DIVISION_OPERATION}>/</option>
          </FormSelect>
        </Box>
        <Box>
          <FormInput
            errors={errors}
            label="Minimum Random"
            type="number"
            // {...register("minRand", { valueAsNumber: true, required: true })}
            {...register("minRand")}
          />
        </Box>
        <Box>
          <FormInput
            errors={errors}
            label="Maximum Random"
            type="number"
            // {...register("maxRand", { valueAsNumber: true, required: true })}
            {...register("maxRand")}
          />
        </Box>
        <Box>
          <FormInput
            errors={errors}
            label="Minimum Solution"
            type="number"
            // {...register("minSolution", { valueAsNumber: true })}
            {...register("minSolution")}
          />
        </Box>
        <Box>
          <FormInput
            errors={errors}
            label="Maximum Solution"
            type="number"
            // {...register("maxSolution", { valueAsNumber: true })}
            {...register("maxSolution")}
          />
        </Box>
      </Grid>

      <p>{data}</p>
      <Button>Submit</Button>
    </Box>
  );
};

WorksheetControls.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default WorksheetControls;
