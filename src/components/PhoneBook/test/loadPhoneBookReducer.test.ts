import { phoneBookReducer } from '../reducers';
import { ActionTypes } from '../actions';
import { PhoneBookState, IPhoneBook } from '../../../models/phoneBook';

describe('test load phonebook reducer', () => {
  const defaultState = new PhoneBookState();
  const stateAfterStarted = defaultState.set('isLoading', true);
  it('test LOAD_PHONEBOOK_STARTED reducer', () => {
    expect(phoneBookReducer(defaultState, { type: ActionTypes.LOAD_PHONEBOOK_STARTED }))
      .toEqual(stateAfterStarted);
  });

  it('test LOAD_PHONEBOOK_SUCCEED reducer', () => {
    const mockupData: IPhoneBook[] = [
      {
        id: '123',
        firstName: 'cheng',
        lastName: 'jia',
        phoneNumber: '12345678'
      },
      {
        id: '234',
        firstName: 'kevin',
        lastName: 'aaa',
        phoneNumber: '45678'
      }
    ];
    const fakeAction = {
      type: ActionTypes.LOAD_PHONEBOOK_SUCCEED,
      payload: mockupData
    };
    expect(phoneBookReducer(stateAfterStarted, fakeAction).phoneBooks.count()).toEqual(2);
  });

  it('test SAVE_PHONEBOOK_FAILED reducer', () => {
    const fakeAction = {
      type: ActionTypes.SAVE_PHONEBOOK_FAILED,
      error: { message: 'something went wrong' }
    };
    expect(phoneBookReducer(stateAfterStarted, fakeAction).isLoading).toEqual(false);
  });
});
