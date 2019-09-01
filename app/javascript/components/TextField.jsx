import React from "react";
import { MDBInput } from "mdbreact";

const InputPage = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <MDBInput 
        {...input}
        {...custom}
        label={label}
        validate
        error="wrong"
        success="right"

    />
  );
}

export default InputPage;