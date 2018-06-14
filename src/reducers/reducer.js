import { GET_USER_TYPES, SELECT_USER_TYPE, GET_FORM_INPUTS, GET_ADVANTAGES_LIST, STORE_USER } from '../actions'

export default function (state = [], action) {
  switch (action.type) {
    case GET_USER_TYPES:
      return { ...state, userTypes: action.payload }
    case SELECT_USER_TYPE:
      return { ...state, selectedUserType: action.payload }
    case GET_FORM_INPUTS:
      return { ...state, formInputs: action.payload }
    case GET_ADVANTAGES_LIST:
      return { ...state, advantagesList: action.payload }
    case STORE_USER:
      return { ...state, storeUser: action.payload }
  }
  return state
}

export function getUserTypes (state) {
  return state.appReducer.userTypes
}

export function getSelectedUserType (state) {
  return state.appReducer.selectedUserType
}

export function getFormInputs (state) {
  return state.appReducer.formInputs
}

export function getAdvantagesList (state) {
  return state.appReducer.advantagesList
}

export function getUser (state) {
  return state.appReducer.storeUser
}
