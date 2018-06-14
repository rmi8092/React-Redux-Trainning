import axios from 'axios'
import { push } from 'react-router-redux'

const API_BASE_URL = `http://localhost:3000`

export const GET_USER_TYPES = 'GET_USER_TYPES'
export const SELECT_USER_TYPE = 'SELECT_USER_TYPE'
export const GET_FORM_INPUTS = 'GET_FORM_INPUTS'
export const STORE_USER = 'STORE_USER'
export const GET_ADVANTAGES_LIST = 'GET_ADVANTAGES_LIST'

export function getUserType () {
  return (dispatch) => {
    const urlSearch = `${API_BASE_URL}/customerTypes`
    axios.get(urlSearch).then((response) => {
      dispatch(_getUserType(response.data))
    })
  }
}

export function selectUserType (userType) {
  return {
    type: SELECT_USER_TYPE,
    payload: userType
  }
}

export function getFormInputs (userType) {
  return (dispatch) => {
    const urlSearch = `${API_BASE_URL}/inputTypeByCustomerType/${userType}`
    axios.get(urlSearch).then((response) => {
      dispatch(_getFormInputs(response.data))
    })
  }
}

export function createUser (userType, userId, ...inputValues) {
  return (dispatch) => {
    let urlSearch = `${API_BASE_URL}/users`
    const param = { ...inputValues[0], userType }
    if (userId) {
      urlSearch = `${urlSearch}/${userId}`
      axios.put(urlSearch, param).then((response) => {
        dispatch(_storeUser(response.data))
        dispatch(push('/welcome'))
      })
    }
    else {
      axios.post(urlSearch, param).then((response) => {
        dispatch(_storeUser(response.data))
        dispatch(push('/welcome'))
      })
    }
  }
}

export function getAdvantagesList (userType) {
  return (dispatch) => {
    const urlSearch = `${API_BASE_URL}/advantagesByCustomerType/${userType}`
    axios.get(urlSearch).then((response) => {
      dispatch(_getAdvantagesList(response.data))
    })
  }
}

function _getUserType (data) {
  return {
    type: GET_USER_TYPES,
    payload: data
  }
}

function _getFormInputs (data) {
  return {
    type: GET_FORM_INPUTS,
    payload: data.inputs
  }
}

function _getAdvantagesList (data) {
  return {
    type: GET_ADVANTAGES_LIST,
    payload: data.advantagesList
  }
}

function _storeUser (data) {
  return {
    type: STORE_USER,
    payload: data
  }
}
