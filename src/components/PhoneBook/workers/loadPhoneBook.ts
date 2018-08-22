import { List } from 'immutable';
import { AppThunkAction } from '../../../store';
import { KnownAction, ActionTypes, LoadPhonebookSucceed } from '../actions';
import * as Api from '../apis';
import { PhoneBookState, PhoneBook, IPhoneBook } from '../../../models/phoneBook';

export const loadPhoneBookAction = (): AppThunkAction<KnownAction> => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.LOAD_PHONEBOOK_STARTED });
    const phoneBooks = await Api.loadPhoneBook<IPhoneBook[]>();
    return dispatch({ type: ActionTypes.LOAD_PHONEBOOK_SUCCEED, payload: phoneBooks });
  } catch (e) {
    return dispatch({ type: ActionTypes.LOAD_PHONEBOOK_FAILED });
  }
};

export const loadPhoneBookStarted = (state: PhoneBookState) => state.set('isLoading', true);

export const loadPhoneBookSucceed = (state: PhoneBookState, action: LoadPhonebookSucceed) => state
  .set('isLoading', false)
  .set('phoneBooks', List<PhoneBook>(action.payload.map(val => new PhoneBook(val))));

export const loadPhoneBookFailed = (state: PhoneBookState) => state.set('isLoading', false);
