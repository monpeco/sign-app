import { makeTypes, mac, createReducer, reduceReducers } from 'ducks-maker'
import { assignHOR } from './hors.js'

const t = makeTypes('modoEdicion')
const ASSIGN = t('assign').single()
 
export const assignModoEdicion = mac(ASSIGN, 'payload')

const initialState = {
    data: false,
}

const assignReducer = createReducer(initialState, assignHOR({ ASSIGN }))

export default reduceReducers(assignReducer)

