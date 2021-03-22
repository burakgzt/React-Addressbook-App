import React from 'react';
import ContactListData from "../data/ContactListData"
import { ListItem } from '../interfaces/ContactListInterface';

test('check nationality reload', () => {
  // put dump variable first
  ContactListData.page = 3;
  ContactListData.lastNationality = "test";

  // check if reloading resets those
  ContactListData.reloadNationality("TR");
  expect(ContactListData.lastNationality).toBe("TR");
  expect(ContactListData.page).toBe(1);
});

test('check result updates', () => {
  ContactListData.initPage("");
  const newItems = [...new Array(3)].map(() => ({
    loading: true, name: { first: "John", last: "Doe", title: "" }, picture: {}, location: { street: {} }, login: {},
  } as ListItem));
  ContactListData.updateResults(newItems);

  expect(ContactListData.data.length).toBe(3);
  expect(ContactListData.temporaryList.length).toBe(3);
  expect(ContactListData.data[0].name.first).toBe("John");
  expect(ContactListData.data[0].name.last).toBe("Doe");
  expect(ContactListData.loading).toBe(false);
});