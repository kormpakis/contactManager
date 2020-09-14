import {ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT} from "./actionTypes";

const initialState = {
  allContacts: []
}

const contactReducer = (state=initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        allContacts: [...state.allContacts, action.payload]
      }
    case DELETE_CONTACT:
      return {
        ...state,
        allContacts: state.allContacts.filter(contact => contact.key !== action.payload)
      }
    case EDIT_CONTACT:
      return {
        ...state,
        allContacts: [...state.allContacts.filter(contact => contact.key !== action?.payload?.key), action.payload]
      }
    default:
      return state;
  }
}

export default contactReducer;