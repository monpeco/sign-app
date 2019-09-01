import { makeTypes, asyncMac, createReducer, reduceReducers } from 'ducks-maker'
import { createFetch, resetFetch } from './hors.js'
import { crear, leer, borrar } from '../services/api'

const t = makeTypes('user')
const FETCH = t('fetch').async()
const RESETFETCH = t('reset').async()
 
const fetchActions = asyncMac(FETCH)
const resetFetchActions = asyncMac(RESETFETCH)

const initialState = {
    data: [],
    fetched: false,
    fetching: false,
}

const fetchReducer = createReducer(initialState, createFetch( FETCH ))
const resetFetchReducer = createReducer(initialState, resetFetch( RESETFETCH ))

export default reduceReducers(fetchReducer, resetFetchReducer)

export const login = values => async (dispatch, getState) => {
    dispatch(fetchActions.start())
    try {
        //const data = await crear('/registrations', values)
        //dispatch(fetchActions.success(data))        
    } catch (error) {
        console.log(error)
        dispatch(fetchActions.error(error))        
    }
}

export const register =  values => async (dispatch, getState) => {
    if(values.password === values.confirm_password){
        dispatch(fetchActions.start())
        try {
            const data = await crear('/registrations', values)
            dispatch(fetchActions.success(data))
        } catch (error) {
            console.log(error)
            dispatch(fetchActions.error(error))
        }
    }else{
        console.log("no coinciden!!")
    }
}

export const LogInUser =  values => async (dispatch, getState) => {
    dispatch(fetchActions.start())
    try {
        const data = await crear('/sessions', values)
        dispatch(fetchActions.success(data))
    } catch (error) {
        console.log(error)
        dispatch(fetchActions.error(error))
    }
}

export const checkUser =  () => async (dispatch, getState) => {
    dispatch(fetchActions.start())
    try {
        const data = await leer('/logged_in')
        dispatch(fetchActions.success(data))
    } catch (error) {
        console.log(error)
        dispatch(fetchActions.error(error))
    }
}

export const signOut =  () => async (dispatch, getState) => {
    dispatch(resetFetchActions.start())
    try {
        const data = await borrar('/log_out')
        console.log(data)
        dispatch(resetFetchActions.success(data))
    } catch (error) {
        console.log(error)
        dispatch(resetFetchActions.error(error))
    }
}