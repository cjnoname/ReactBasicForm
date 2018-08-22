import { List } from 'immutable';
import * as Api from '../apis';
import { AppThunkAction } from '../../../store';
import { KnownAction, ActionTypes, DeletePhonebookSucceed } from '../actions';
import { PhoneBookState, PhoneBook, IPhoneBook } from '../../../models/phoneBook';

export const deletePhoneBook = (id: string): AppThunkAction<KnownAction> => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DELETE_PHONEBOOK_STARTED });
    const phoneBooks = await Api.deletePhoneBook(id) as IPhoneBook[];
    return dispatch({ type: ActionTypes.DELETE_PHONEBOOK_SUCCEED, payload: phoneBooks });
  } catch (e) {
    dispatch({ type: ActionTypes.DELETE_PHONEBOOK_FAILED });
  }
};

export const deletePhoneBookStarted = (state: PhoneBookState) => state.set('isLoading', true);

export const deletePhoneBookSucceed = (state: PhoneBookState, action: DeletePhonebookSucceed) => state
  .set('isLoading', false)
  .set('phoneBooks', List<PhoneBook>(action.payload.map(val => new PhoneBook(val))));

export const deletePhoneBookFailed = (state: PhoneBookState) => state.set('isLoading', false);
