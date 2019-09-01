import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import LoginForm from '../components/LoginForm'
import Box from '../components/Box'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import * as userDuck from '../ducks/User'

class Login extends React.Component{

    handleLogin = async values => {
        const { LogInUser } = this.props
        await LogInUser(values)
    }

    render(){
        const { user } = this.props
        return(
            <MDBContainer>
                <MDBRow>
                    <Box>
                        <LoginForm user={user} onSubmit={this.handleLogin}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)