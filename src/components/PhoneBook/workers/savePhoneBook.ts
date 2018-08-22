import { List } from 'immutable';
import { AppThunkAction } from '../../../store';
import { KnownAction, ActionTypes, SavePhonebookSucceed } from '../actions';
import * as Api from '../apis';
import { PhoneBookState, PhoneBook, IPhoneBook } from '../../../models/phoneBook';
import { reset } from 'redux-form';

export const savePhoneBook = (phoneBook: IPhoneBook): AppThunkAction<KnownAction> => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.SAVE_PHONEBOOK_STARTED });
    let phoneBooks;
    if (phoneBook.id) {
      phoneBooks = await Api.savePhoneBook<IPhoneBook[]>(phoneBook) as PhoneBook[];
    } else {
      phoneBooks = await Api.savePhoneBook<IPhoneBook[]>(phoneBook) as PhoneBook[];
    }
    dispatch(reset('phoneBook'));
    return dispatch({ type: ActionTypes.SAVE_PHONEBOOK_SUCCEED, payload: phoneBooks });
  } catch (e) {
    dispatch({ type: ActionTypes.SAVE_PHONEBOOK_FAILED });
  }
};

export const savePhoneBookStarted = (state: PhoneBookState) => state.set('isLoading', true);

export const savePhoneBookSucceed = (state: PhoneBookState, action: SavePhonebookSucceed) => state
  .set('isLoading', false)
  .set('phoneBooks', List<PhoneBook>(action.payload.map(val => new PhoneBook(val))))
  .set('editItem', undefined);

export const savePhoneBookFailed = (state: PhoneBookState) => state.set('isLoading', false);
