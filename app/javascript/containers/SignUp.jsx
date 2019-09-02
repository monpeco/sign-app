import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import SignUpForm from '../components/SignUpForm'
import Box from '../components/Box'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import * as userDuck from '../ducks/User'

class SignUp extends React.Component{

    handleRegister = async values => {
        const { register } = this.props
        console.log(this.props)
        await register(values)
    }

    render(){
        const { user } = this.props
        return(
            <MDBContainer>
                <MDBRow>
                    <Box>
                        <SignUpForm user={user} onSubmit={this.handleRegister}/>
                    </Box>
                </MDBRow>
            </MDBContainer>
        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.User
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...userDuck,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)