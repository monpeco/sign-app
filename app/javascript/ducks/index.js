import User from './User'
import Users from './Users'
import Categories from './Categories'
import Products from './Products'
import Messages from './Messages'
import ModoEdicion from './ModoEdicion'
import { reducer as formReducer } from 'redux-form'

export default {
    User,
    Users,
    Categories,
    Products,
    Messages,
    ModoEdicion,
    form: formReducer
}