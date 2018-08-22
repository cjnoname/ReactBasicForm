import { AppThunkAction } from '../../../store';
import { KnownAction, ActionTypes, EditPhonebookSucceed } from '../actions';
import { PhoneBookState, PhoneBook } from '../../../models/phoneBook';

export const editPhoneBook = (phoneBook?: PhoneBook): AppThunkAction<KnownAction> => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.EDIT_PHONEBOOK_STARTED });
    return dispatch({ type: ActionTypes.EDIT_PHONEBOOK_SUCCEED, payload: phoneBook });
  } catch (e) {
    dispatch({ type: ActionTypes.EDIT_PHONEBOOK_FAILED });
  }
};

export const editPhoneBookStarted = (state: PhoneBookState) => state.set('isLoading', true);

export const editPhoneBookSucceed = (state: PhoneBookState, action: EditPhonebookSucceed) => state
  .set('isLoading', false)
  .set('editItem', action.payload ? action.payload.toObject() : undefined);

export const editPhoneBookFailed = (state: PhoneBookState) => state.set('isLoading', false);
