import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm, useFieldArray } from "react-hook-form";
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
    pages: yup.number().integer().min(1).required().label("Pages"),

    columnMeta: yup.array(
      yup.object({
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
    ),
  })
  .required();

const defaultColumnMeta = {
  operation: ADDITION_OPERATION,
  inputCount: 2,
  maxRand: 999,
  minRand: 1,
  minSolution: 0,
};

const defaultValues = {
  problemCount: 3,
  columnCount: 1,
  pages: 5,
  columnMeta: [defaultColumnMeta],
};
const WorksheetControls = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "columnMeta", // unique name for your Field Array
  });
  const [data, setData] = useState("");

  const watchPresets = watch("presets");

  useEffect(() => {
    if (watchPresets === CALVIN_PRESET) {
      setValue("columnMeta", [
        {
          operation: ADDITION_OPERATION,
          inputCount: 2,
          maxRand: 9,
          minRand: 1,
          minSolution: 0,
        },
      ]);
      setValue("problemCount", 9);
      setValue("columnCount", 3);
      // setValue("columnMeta.0.maxRand", 9);
      // setValue("columnMeta.0.minRand", 1);
      // setValue("columnMeta.0.maxSolution", undefined);
    }
    if (watchPresets === WENDY_PRESET) {
      setValue("columnMeta", [
        {
          operation: ADDITION_OPERATION,
          inputCount: 2,
          maxRand: 9,
          minRand: 0,
          minSolution: 1,
          maxSolution: 10,
        },
      ]);
      setValue("problemCount", 3);
      setValue("columnCount", 1);
      // setValue("columnMeta.0.maxRand", 9);
      // setValue("columnMeta.0.minRand", 0);
      // setValue("columnMeta.0.maxSolution", 10);
    }
    if (watchPresets === ALICE_PRESET) {
      setValue("columnMeta", [
        {
          operation: ADDITION_OPERATION,
          inputCount: 2,
          maxRand: 999,
          minRand: 10,
          minSolution: 0,
        },
        {
          operation: SUBTRACTION_OPERATION,
          inputCount: 2,
          maxRand: 999,
          minRand: 10,
          minSolution: 0,
        },
        {
          operation: MULTIPLICATION_OPERATION,
          inputCount: 2,
          maxRand: 99,
          minRand: 2,
          minSolution: 0,
        },
      ]);
      setValue("problemCount", 21);
      setValue("columnCount", 3);
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
            label="Pages"
            {...register("pages")}
          />
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
        <Box>
          <Button onClick={() => append(defaultColumnMeta)}>Add</Button>
        </Box>
      </Grid>
      {fields.map((field, index) => (
        <Grid gap={2} columns={[1, 2, 4]} key={field.id}>
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
              {...register(`columnMeta.${index}.inputCount`)}
            />
          </Box>
          <Box>
            <FormSelect
              errors={errors}
              label="Operation"
              {...register(`columnMeta.${index}.operation`)}
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
              {...register(`columnMeta.${index}.minRand`)}
            />
          </Box>
          <Box>
            <FormInput
              errors={errors}
              label="Maximum Random"
              type="number"
              // {...register("maxRand", { valueAsNumber: true, required: true })}
              {...register(`columnMeta.${index}.maxRand`)}
            />
          </Box>
          <Box>
            <FormInput
              errors={errors}
              label="Minimum Solution"
              type="number"
              // {...register("minSolution", { valueAsNumber: true })}
              {...register(`columnMeta.${index}.minSolution`)}
            />
          </Box>
          <Box>
            <FormInput
              errors={errors}
              label="Maximum Solution"
              type="number"
              // {...register("maxSolution", { valueAsNumber: true })}
              {...register(`columnMeta.${index}.maxSolution`)}
            />
          </Box>
          {index !== 0 && (
            <Box>
              <Button onClick={() => remove(index)}>Remove</Button>
            </Box>
          )}
        </Grid>
      ))}
      <p>{data}</p>
      <Button>Submit</Button>
    </Box>
  );
};

WorksheetControls.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default WorksheetControls;
