import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import LoginForm from '../components/LoginForm'
import Box from '../components/Box'
import Modal from '../components/Modal'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import * as userDuck from '../ducks/User'
import * as messageDuck from '../ducks/Messages'

class Login extends React.Component{
    
    state={
        open: false,
        action: false,
        confirmation: false,
    }

    handleClose = e => {
        this.setState({ ...this.state, open: false })
    } 

    handleLogin = async values => {
        const { LogInUser, history, assignMessage, user } = this.props
        console.log(user)
        await LogInUser(values)
        console.log(user)
        if (user.error){
            assignMessage("Usuario o contraseña incorrecta!, intente nuevamente")
            this.setState({ ...this.state, open: true, confirmation: false, action: false })
        }else{
            history.push("/")
        }

    }


    render(){
        const { user, message } = this.props
        return(
            <MDBContainer className="my-4">
                <Box>
                    <LoginForm user={user} onSubmit={this.handleLogin}/>
                </Box>
                <Modal
                    open={this.state.open}
                    handleClose={this.handleClose}
                    action={this.state.action}
                    loading={user.fetching}
                    confirmation={this.state.confirmation}
                >
                    {message.data}
                </Modal>
            </MDBContainer>
        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.User,
        message: state.Messages
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...userDuck,
    ...messageDuck,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)