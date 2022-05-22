import React, { forwardRef } from "react";
import PropTypes from "prop-types";

import { Label, Input, Text } from "theme-ui";

const FormInput = (props) => {
  const { name, errors, label, fwdRef, ...otherProps } = props;
  const hasError = errors && errors[name];
  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input id={name} name={name} ref={fwdRef} {...otherProps} />
      {hasError && <Text variant="error">{errors[name].message}</Text>}
    </>
  );
};

FormInput.propTypes = {
  name: PropTypes.any.isRequired,
  errors: PropTypes.object,
  label: PropTypes.any,
  fwdRef: PropTypes.any,
};

FormInput.defaultProps = {
  errors: undefined,
  label: undefined,
  fwdRef: undefined,
};

const RefFormInput = forwardRef((props, ref) => (
  <FormInput fwdRef={ref} {...props} />
));
RefFormInput.displayName = "RefFormInput";

export default RefFormInput;
