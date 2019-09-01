import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom'
import Home from '../containers/Home'
import Navbar from '../components/Navbar'
import Login from '../containers/Login'
import SignUp from '../containers/SignUp'
import * as userDuck from '../ducks/User'

class App extends React.Component{
    
    componentDidMount(){
        const { checkUser } = this.props
        checkUser()
    }

    handleSignOut = e => {
        const { signOut } = this.props
        signOut()
    }

    render(){
        const { user } = this.props
        console.log(user)
        return(
            <div>
                <Route path="/" render={() => <Navbar user={user} handleSignOut={this.handleSignOut} />} />
                <Route exact={true} path="/" component={Home} />
                <Route exact={true} path="/login" component={Login} />
                <Route exact={true} path="/signup" component={SignUp} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.User
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...userDuck,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)