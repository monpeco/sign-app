import { makeTypes, mac, createReducer, reduceReducers } from 'ducks-maker'
import { assignHOR } from './hors.js'

const t = makeTypes('messages')
const ASSIGN = t('assign').single()
 
export const assignMessage = mac(ASSIGN, 'payload')

const initialState = {
    data: "",
}

const assignReducer = createReducer(initialState, assignHOR({ ASSIGN }))

export default reduceReducers(assignReducer)

