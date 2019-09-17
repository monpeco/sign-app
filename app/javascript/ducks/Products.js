import { makeTypes, mac, asyncMac, createReducer, reduceReducers } from 'ducks-maker'
import { createFetch, editFetch, selectHOR, addFetch, delFetch } from './hors.js'
import { leer, modificar, crear, borrar } from '../services/api'

const t = makeTypes('products')
const FETCH = t('fetch').async()
const EDIT = t('edit').async()
const ADD = t('add').async()
const DEL = t('del').async()
const SELECT = t('select').single()
 
const fetchActions = asyncMac(FETCH)
const addActions = asyncMac(ADD)
const editActions = asyncMac(EDIT)
const delActions = asyncMac(DEL)
export const selectProduct = mac(SELECT, 'payload')

const initialState = {
    data: [],
    fetched: false,
    fetching: false,
}

const fetchReducer = createReducer(initialState, createFetch( FETCH ))
const addReducer = createReducer(initialState, addFetch( ADD ))
const editReducer = createReducer(initialState, editFetch( EDIT ))
const delReducer = createReducer(initialState, delFetch( DEL ))
const selectReducer = createReducer(initialState, selectHOR({ SELECT }))

export default reduceReducers(fetchReducer, editReducer, selectReducer, addReducer, delReducer)

export const fetchProducts = () => async (dispatch, getState) => {
    dispatch(fetchActions.start())
    try {
        const data = await leer('/products')
        dispatch(fetchActions.success(data))
    } catch (error) {
        dispatch(fetchActions.error(error))
    }
}

export const addProducts = values => async dispatch => {
    dispatch(addActions.start())
    try {
        const data = await crear('/products', values)
        dispatch(addActions.success(data))
    } catch (error) {
        dispatch(addActions.error(error))
    }
}

export const editProducts = (id, values) => async dispatch => {
    dispatch(editActions.start())
    try {
        const data = await modificar('/products',id, values)
        dispatch(editActions.success(data))
    } catch (error) {
        dispatch(editActions.error(error))
    }
}

export const delProducts = id => async dispatch => {
    dispatch(delActions.start())
    try {
        await borrar('/products',id)
        dispatch(delActions.success(id))
    } catch (error) {
        dispatch(delActions.error(error))
    }
}