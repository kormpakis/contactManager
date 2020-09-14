import {ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT} from "./actionTypes";

export const addContact = contact => {
  return (dispatch) => {
    dispatch ({
      type: ADD_CONTACT,
      payload: contact
    })
  }
}

export const deleteContact = key => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: key
    })
  }
}

export const editContact = contact => {
  return (dispatch) => {
    dispatch({
      type: EDIT_CONTACT,
      payload: contact
    })
  }
}