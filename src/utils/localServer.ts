import * as uuid from 'uuid/v1';
import { IPhoneBook } from '../models/phoneBook';

const getPhoneBooks = (): IPhoneBook[] => {
  const phoneBooks = localStorage.getItem('phoneBooks');
  if (phoneBooks) {
    return JSON.parse(phoneBooks);
  } else {
    doSave([]);
    return [] as IPhoneBook[];
  }
};

const deletePhoneBook = (id: string) => new Promise((resolve, reject) => {
  try {
    const phoneBooks = getPhoneBooks();
    const found = phoneBooks.filter((phoneBook) => phoneBook.id === id);
    if (found && found.length > 0) {
      const index = phoneBooks.indexOf(found[0]);
      phoneBooks.splice(index, 1);
    }
    doSave(phoneBooks);
    resolve(phoneBooks);
  } catch {
    reject({ error: 'Unable to delete phonebook item' });
  }
});

const savePhoneBook = (phoneBookItem: IPhoneBook) => phoneBookItem.id ?
  editPhoneBook(phoneBookItem) :
  addPhoneBook(phoneBookItem);

const addPhoneBook = (phoneBookItem: IPhoneBook) => new Promise((resolve, reject) => {
  try {
    const phoneBooks = getPhoneBooks();
    phoneBookItem.id = uuid();
    phoneBooks.push(phoneBookItem);
    doSave(phoneBooks);
    resolve(phoneBooks);
  } catch {
    reject({ error: 'Unable to add phonebook item' });
  }
});

const editPhoneBook = (phoneBookItem: IPhoneBook) => new Promise((resolve, reject) => {
  try {
    const phoneBooks = getPhoneBooks();
    const found = phoneBooks.filter((phoneBook) => phoneBook.id === phoneBookItem.id);
    if (found && found.length > 0) {
      const index = phoneBooks.indexOf(found[0]);
      phoneBooks[index] = phoneBookItem;
    } else {
      phoneBooks.push(phoneBookItem);
    }
    doSave(phoneBooks);
    resolve(phoneBooks);
  } catch {
    reject({ error: 'Unable to edit phonebook item' });
  }
});

const doSave = (phoneBooks: IPhoneBook[]) => localStorage.setItem('phoneBooks', JSON.stringify(phoneBooks));

export default { getPhoneBooks, deletePhoneBook, savePhoneBook };
