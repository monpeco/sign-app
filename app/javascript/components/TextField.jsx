import React from 'react'
import TextField from '@material-ui/core/TextField';

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => {
    return(
        <TextField
          label={label}
          {...input}
          {...custom}
          error={touched && error}
          helperText={touched && ((error && <span>{error}</span>))}
        />
  )}

  export default renderTextField