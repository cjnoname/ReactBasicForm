import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import PhoneBookTable from '../views/PhoneBookTable';
import { App } from '../../../app';
import { PhoneBookState } from '../../../models/phoneBook';
import { ApplicationState } from '../../../store';

const fakeState = new PhoneBookState({
  isLoading: false,
  phoneBooks: [
    {
      id: '111',
      firstName: 'Foo',
      lastName: 'Bar',
      phoneNumber: '123321'
    },
    {
      id: '123',
      firstName: 'Foo',
      lastName: 'Bar',
      phoneNumber: '123321'
    }
  ]
} as any);

const fakeStore: ApplicationState = {
  phoneBook: fakeState
};

describe('test phonebook table', () => {
  let container: ReactWrapper;

  beforeEach(() => {
    container = mount(
      <App initialState={fakeStore}>
        <PhoneBookTable />
      </App>
    );
  });

  afterEach(() => {
    container.unmount();
  });


  it('should have a table element', () => {
    expect(container.find('table').length).toEqual(1);
  });

  it('should render 4 trs', () => {
    expect(container.find('tr').length).toEqual(4);
  });
});
