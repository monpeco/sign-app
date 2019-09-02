import { makeTypes, asyncMac, createReducer, reduceReducers } from 'ducks-maker'
import { createFetch } from './hors.js'
import { leer } from '../services/api'

const t = makeTypes('users')
const FETCH = t('fetch').async()
 
const fetchActions = asyncMac(FETCH)

const initialState = {
    data: [],
    fetched: false,
    fetching: false,
}

const fetchReducer = createReducer(initialState, createFetch( FETCH ))

export default reduceReducers(fetchReducer)

export const fetchUsers = () => async (dispatch, getState) => {
    dispatch(fetchActions.start())
    try {
        const data = await leer('/users')
        dispatch(fetchActions.success(data))
    } catch (error) {
        dispatch(fetchActions.error(error))
    }
}
