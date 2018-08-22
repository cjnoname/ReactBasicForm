import { Action, Reducer } from 'redux';
import { KnownAction, ActionTypes } from './actions';
import { savePhoneBookFailed, savePhoneBookStarted, savePhoneBookSucceed } from './workers/savePhoneBook';
import { loadPhoneBookFailed, loadPhoneBookStarted, loadPhoneBookSucceed } from './workers/loadPhoneBook';
import { PhoneBookState } from '../../models/phoneBook';
import { editPhoneBookStarted, editPhoneBookSucceed, editPhoneBookFailed } from './workers/editPhoneBook';
import { deletePhoneBookStarted, deletePhoneBookSucceed, deletePhoneBookFailed } from './workers/deletePhoneBook';

export const phoneBookReducer: Reducer<PhoneBookState> = (state: PhoneBookState | undefined, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ActionTypes.LOAD_PHONEBOOK_STARTED: { return loadPhoneBookStarted(state!); }
    case ActionTypes.LOAD_PHONEBOOK_SUCCEED: { return loadPhoneBookSucceed(state!, action); }
    case ActionTypes.LOAD_PHONEBOOK_FAILED: { return loadPhoneBookFailed(state!); }
    case ActionTypes.SAVE_PHONEBOOK_STARTED: { return savePhoneBookStarted(state!); }
    case ActionTypes.SAVE_PHONEBOOK_SUCCEED: { return savePhoneBookSucceed(state!, action); }
    case ActionTypes.SAVE_PHONEBOOK_FAILED: { return savePhoneBookFailed(state!); }
    case ActionTypes.EDIT_PHONEBOOK_STARTED: { return editPhoneBookStarted(state!); }
    case ActionTypes.EDIT_PHONEBOOK_SUCCEED: { return editPhoneBookSucceed(state!, action); }
    case ActionTypes.EDIT_PHONEBOOK_FAILED: { return editPhoneBookFailed(state!); }
    case ActionTypes.DELETE_PHONEBOOK_STARTED: { return deletePhoneBookStarted(state!); }
    case ActionTypes.DELETE_PHONEBOOK_SUCCEED: { return deletePhoneBookSucceed(state!, action); }
    case ActionTypes.DELETE_PHONEBOOK_FAILED: { return deletePhoneBookFailed(state!); }
  }
  return state || new PhoneBookState();
};
