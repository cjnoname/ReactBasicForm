// import server from '../../utils/server';
import * as server from '../../utils/localServer';
import { IPhoneBook } from '../../models/phoneBook';

// export const loadPhoneBook = <T>() => server.post<T>('');
export const loadPhoneBook = <T>() => server.default.getPhoneBooks();
export const savePhoneBook = <T>(phoneBook: IPhoneBook) => server.default.savePhoneBook(phoneBook);
export const deletePhoneBook = <T>(id: string) => server.default.deletePhoneBook(id);
