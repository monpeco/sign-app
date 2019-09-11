import { makeTypes, mac, asyncMac, createReducer, reduceReducers } from 'ducks-maker'
import { createFetch, editFetch, selectHOR } from './hors.js'
import { leer, modificar } from '../services/api'

const t = makeTypes('categories')
const FETCH = t('fetch').async()
const EDIT = t('edit').async()
const SELECT = t('select').single()
 
const fetchActions = asyncMac(FETCH)
const editActions = asyncMac(EDIT)
export const selectCategory = mac(SELECT)

const initialState = {
    data: [],
    fetched: false,
    fetching: false,
}

const fetchReducer = createReducer(initialState, createFetch( FETCH ))
const editReducer = createReducer(initialState, editFetch( EDIT ))
const selectReducer = createReducer(initialState, selectHOR( {SELECT} ))

export default reduceReducers(fetchReducer, editReducer, selectReducer)

export const fetchCategories = () => async (dispatch, getState) => {
    dispatch(fetchActions.start())
    try {
        const data = await leer('/categories')
        dispatch(fetchActions.success(data))
    } catch (error) {
        dispatch(fetchActions.error(error))
    }
}

export const editCategories = (id, values) => async (dispatch, getState) => {
    dispatch(editActions.start())
    try {
        const data = await modificar('/categories',id, values)
        dispatch(editActions.success(data))
    } catch (error) {
        dispatch(editActions.error(error))
    }
}