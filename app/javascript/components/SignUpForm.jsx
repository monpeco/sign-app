import React from "react";
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { Field, reduxForm } from 'redux-form'
import TextField from './TextField'
import Spinner from './Spinner'

const validate = values => {
    const errors = {}
    const requiredFields = [
      'email',
      'password',
      'confirm_password'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = true
      }
    })
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    return errors
}

let SignUpForm = props => {
  const { handleSubmit, pristine, reset, submitting, user } = props

  return (
    <form noValidate onSubmit={handleSubmit}>
        <p className="h5 text-center mb-4">Registrate</p>
        <div className="grey-text">
            <Field 
                required
                component={TextField}
                type="email"
                name="email"
                label="Correo Electrónico"
                icon="envelope"
                group
            />
            
            <Field
                required
                component={TextField}
                name="password"
                label="Contraseña"
                icon="lock"
                group
                type="password"
            />
            <Field
                required
                component={TextField}
                name="confirm_password"
                label="Confirmar Contraseña"
                icon="exclamation-triangle"
                group
                type="password"
            />
        </div>
        <div className="text-center">
            { user.fetching ? <Spinner /> : <MDBBtn size="sm" color="unique" type="sybmit">Registrar</MDBBtn>}
        </div>
    </form>
  );
};

SignUpForm = reduxForm({
    form: 'register',
    })(SignUpForm);
    
export default connect( state => ({
    validate,
}))(SignUpForm)
