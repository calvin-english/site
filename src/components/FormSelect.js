import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { Label, Select, Text } from "theme-ui";

const FormSelect = (props) => {
  const { name, errors, children, label, fwdRef, ...otherProps } = props;
  const hasError = errors && errors[name];
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} id={name} ref={fwdRef} {...otherProps}>
        {children}
      </Select>
      {hasError && <Text variant="error">{errors[name].message}</Text>}
    </>
  );
};

FormSelect.propTypes = {
  name: PropTypes.any.isRequired,
  errors: PropTypes.object,
  label: PropTypes.any,
  fwdRef: PropTypes.any,
  children: PropTypes.any,
};

FormSelect.defaultProps = {
  errors: undefined,
  label: undefined,
  fwdRef: undefined,
  children: [],
};

const RefFormSelect = forwardRef((props, ref) => (
  <FormSelect fwdRef={ref} {...props} />
));
RefFormSelect.displayName = "FormSelect";

export default RefFormSelect;
