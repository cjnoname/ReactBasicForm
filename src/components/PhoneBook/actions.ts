import { loadPhoneBookAction } from './workers/loadPhoneBook';
import { savePhoneBook } from './workers/savePhoneBook';
import { editPhoneBook } from './workers/editPhoneBook';
import { deletePhoneBook } from './workers/deletePhoneBook';
import { IPhoneBook, PhoneBook } from '../../models/phoneBook';

export enum ActionTypes {
  LOAD_PHONEBOOK_STARTED = 'LOAD_PHONEBOOK_STARTED',
  LOAD_PHONEBOOK_SUCCEED = 'LOAD_PHONEBOOK_SUCCEED',
  LOAD_PHONEBOOK_FAILED = 'LOAD_PHONEBOOK_FAILED',
  SAVE_PHONEBOOK_STARTED = 'SAVE_PHONEBOOK_STARTED',
  SAVE_PHONEBOOK_SUCCEED = 'SAVE_PHONEBOOK_SUCCEED',
  SAVE_PHONEBOOK_FAILED = 'SAVE_PHONEBOOK_FAILED',
  EDIT_PHONEBOOK_STARTED = 'EDIT_PHONEBOOK_STARTED',
  EDIT_PHONEBOOK_SUCCEED = 'EDIT_PHONEBOOK_SUCCEED',
  EDIT_PHONEBOOK_FAILED = 'EDIT_PHONEBOOK_FAILED',
  DELETE_PHONEBOOK_STARTED = 'DELETE_PHONEBOOK_STARTED',
  DELETE_PHONEBOOK_SUCCEED = 'DELETE_PHONEBOOK_SUCCEED',
  DELETE_PHONEBOOK_FAILED = 'DELETE_PHONEBOOK_FAILED'
}

export interface LoadPhonebookStarted {
  type: ActionTypes.LOAD_PHONEBOOK_STARTED
}

export interface LoadPhonebookSucceed {
  type: ActionTypes.LOAD_PHONEBOOK_SUCCEED,
  payload: IPhoneBook[]
}

export interface LoadPhonebookFailed {
  type: ActionTypes.LOAD_PHONEBOOK_FAILED
}

export interface SavePhonebookStarted {
  type: ActionTypes.SAVE_PHONEBOOK_STARTED
}

export interface SavePhonebookSucceed {
  type: ActionTypes.SAVE_PHONEBOOK_SUCCEED,
  payload: IPhoneBook[]
}

export interface SavePhonebookFailed {
  type: ActionTypes.SAVE_PHONEBOOK_FAILED
}

export interface EditPhonebookStarted {
  type: ActionTypes.EDIT_PHONEBOOK_STARTED
}

export interface EditPhonebookSucceed {
  type: ActionTypes.EDIT_PHONEBOOK_SUCCEED,
  payload?: PhoneBook
}

export interface EditPhonebookFailed {
  type: ActionTypes.EDIT_PHONEBOOK_FAILED
}

export interface DeletePhonebookStarted {
  type: ActionTypes.DELETE_PHONEBOOK_STARTED
}

export interface DeletePhonebookSucceed {
  type: ActionTypes.DELETE_PHONEBOOK_SUCCEED,
  payload: IPhoneBook[]
}

export interface DeletePhonebookFailed {
  type: ActionTypes.DELETE_PHONEBOOK_FAILED
}

export type KnownAction =
  LoadPhonebookStarted | LoadPhonebookSucceed | LoadPhonebookFailed |
  SavePhonebookStarted | SavePhonebookSucceed | SavePhonebookFailed |
  EditPhonebookStarted | EditPhonebookSucceed | EditPhonebookFailed |
  DeletePhonebookStarted | DeletePhonebookSucceed | DeletePhonebookFailed
  ;

export const phoneBookActions = {
  loadPhoneBookAction,
  savePhoneBook,
  editPhoneBook,
  deletePhoneBook
};
