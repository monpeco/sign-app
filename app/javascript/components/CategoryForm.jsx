import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import TextField from './TextField';
import Spinner from './Spinner';

const validate = (values = {}) => {
  const errors = {}
  const requiredFields = [
    'name',
    'active',
    'comment',
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
    errors.email = 'Email es requerido'
  }
  return errors
}


let CategoryForm = props => {
    const { handleSubmit, categories, handleOnChangeFileComprobante, fileName, formRecibir } = props
      return(
            <MDBContainer>
                {categories.fetching ? <Spinner /> : 
                <form noValidate onSubmit={handleSubmit} >
                    <MDBRow>
                        <MDBCol>
                            <Field
                                required
                                type="text"
                                name="name"
                                label="Nombre de Categoria"
                                component={TextField}
                            />
                        </MDBCol>
                        <MDBCol>
                            <Field
                                required
                                type='text'
                                label="Comentario"
                                name="comment"
                                component={TextField}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol>
                            <MDBBtn size="sm" color="unique" type= "submit">Enviar</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </form>
                }
            </MDBContainer>
        )
    }


CategoryForm = reduxForm({
  form: 'category',
})(CategoryForm);

export default connect( (state,props) => {
    console.log(state)
    return{
        initialValues: {
            name: state.ModoEdicion.data ? (state.Categories.data.filter(x => x.selected)[0] ? state.Categories.data.filter(x => x.selected)[0].name : "") : "",
            comment: state.ModoEdicion.data ? (state.Categories.data.filter(x => x.selected)[0] ? state.Categories.data.filter(x => x.selected)[0].comment : "") : "",
            active: true,
        },
        enableReinitialize : true,
        validate,
    }
})(CategoryForm)
