import { Record } from 'immutable';

export interface IPhoneBook {
  id: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
}

const initialValue = Record<IPhoneBook>({
  id: '',
  firstName: '',
  lastName: '',
  phoneNumber: ''
});

export class PhoneBook extends initialValue { }
