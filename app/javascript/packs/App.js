import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom'
import Home from '../containers/Home'
import Navbar from '../components/Navbar'
import Login from '../containers/Login'
import SignUp from '../containers/SignUp'
import Users from '../containers/Users'
import Products from '../containers/Products'
import Categories from '../containers/Categories'
import Modal from '../components/Modal'
import * as userDuck from '../ducks/User'
import * as messagesDuck from '../ducks/Messages'

class App extends React.Component{
    
    state={
        open: false,
        action: false,
        confirmation: false,
    }

    componentDidMount(){
        const { checkUser } = this.props
        checkUser()
    }

    handleClose = e => {
        this.setState({ ...this.state, open: false })
    } 

    handleSignOutModal = e => {
        const { assignMessage } = this.props
        assignMessage("¿Estás seguro que deseas cerrar sesión?")
        this.setState({ ...this.state, open: true, confirmation: true, action: this.handleSignOut })
    }

    handleSignOut = async e => {
        const { signOut, assignMessage } = this.props
        await signOut()
        assignMessage("Chuuuuuta te fuiste :(, te esperamos pronto!")
        this.setState({ ...this.state, open: true, confirmation: false, action: this.handleSignOut })
    }

    render(){
        const { user, message, history } = this.props
        console.log(message)
        return(
            <div>
                <Route path="/" render={() => <Navbar user={user} handleSignOutModal={this.handleSignOutModal} />} />
                <Route exact={true} path="/" component={Home} />
                <Route exact={true} path="/login" render={() => <Login history={history} />} />
                <Route exact={true} path="/signup" component={SignUp} />
                <Route exact={true} path="/configuration/users" component={Users} />
                <Route exact={true} path="/configuration/categories" component={Categories} />
                <Route exact={true} path="/configuration/productos" component={Products} />
                
                <Modal
                    open={this.state.open}
                    handleClose={this.handleClose}
                    action={this.state.action}
                    loading={user.fetching}
                    confirmation={this.state.confirmation}
                >
                    {message.data}
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.User,
        message: state.Messages,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...userDuck,
    ...messagesDuck,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)