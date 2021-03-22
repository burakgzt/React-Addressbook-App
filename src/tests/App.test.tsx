import React from 'react';
import { render, screen } from '@testing-library/react';
import AppDataStore from "../data/AppData"
import ContactList from '../components/contact-list/ContactList';

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};


test('App data search storing performed query', () => {
  AppDataStore.setSearch("person");
  expect(AppDataStore.searchedStr).toBe("person");
});

test('App data search storing typed text', () => {
  AppDataStore.setSearchInput("john doe");
  expect(AppDataStore.searchInputStr).toBe("john doe");
});

test('Search state rendered', () => {
  AppDataStore.setSearch("searchtest");
  const { container } = render(<ContactList count={50} maxPage={3} />)

  const searchStatusElement = screen.getByText(/searchtest/i);
  expect(searchStatusElement).toBeInTheDocument();
});