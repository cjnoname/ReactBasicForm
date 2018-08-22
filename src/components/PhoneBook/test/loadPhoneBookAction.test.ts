import { loadPhoneBookAction } from '../workers/loadPhoneBook';
import * as MockServer from '../../../utils/localServer';
import { ActionTypes } from '../actions';

jest.mock('../../../utils/localServer', () => {
  return {
    default: {
      getPhoneBooks: jest.fn(() => {
        return [{
          id: '1',
          firstName: 'Cheng',
          lastName: 'Jia',
          phoneNumber: '1234567'
        }];
      })
    }
  };
});

const dispatch = (response: any) => {
  return response;
};

describe('test loadPhoneBookAction', () => {
  it('loadPhoneBookAction should return a list of phonebook', async () => {
    const getPhoneBooksAction = await (loadPhoneBookAction() as any)(dispatch);
    console.log(getPhoneBooksAction.resolves);
    expect(MockServer.default.getPhoneBooks).toHaveBeenCalledTimes(1);

    expect(getPhoneBooksAction.type).toEqual(ActionTypes.LOAD_PHONEBOOK_SUCCEED);
    expect(getPhoneBooksAction.payload).toEqual([{
      id: '1',
      firstName: 'Cheng',
      lastName: 'Jia',
      phoneNumber: '1234567'
    }]);
  });
});
