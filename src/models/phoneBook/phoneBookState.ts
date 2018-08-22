import { Record, List } from 'immutable';
import { PhoneBook, IPhoneBook } from './phoneBook';
import { toImmutable } from '../../utils/immutable';

export interface Interface {
  isLoading: boolean,
  phoneBooks: List<PhoneBook>,
  editItem?: IPhoneBook
}

const initialValue = Record<Interface>({
  isLoading: false,
  phoneBooks: List<PhoneBook>(),
  editItem: undefined
});

export class PhoneBookState extends initialValue {
  constructor(args: Interface = {} as any) {
    super({
      ...args,
      phoneBooks: args.phoneBooks ? toImmutable(args.phoneBooks, PhoneBook, true) : List<PhoneBook>(),
    });
  }
}
