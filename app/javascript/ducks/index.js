import User from './User'
import Users from './Users'
import Categories from './Categories'
import Messages from './Messages'
import ModoEdicion from './ModoEdicion'
import { reducer as formReducer } from 'redux-form'

export default {
    User,
    Users,
    Categories,
    Messages,
    ModoEdicion,
    form: formReducer
}