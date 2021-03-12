import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import AppDataStore from "./data/AppData"
import ContactList from './components/ContactList';

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};

test('check app data nationality store', () => {
  AppDataStore.setNationality("tr");
  expect(AppDataStore.nationality).toBe("tr");
});

test('check app data search store', () => {
  AppDataStore.setSearch("person");
  expect(AppDataStore.searchStr).toBe("person");
});

test('check search state', () => {
  AppDataStore.setSearch("searchtest");
  const { container } = render(<ContactList count={50} />)

  const searchStatusElement = screen.getByText(/searchtest/i);
  expect(searchStatusElement).toBeInTheDocument();
});

test('check settings page nationality render', () => {
  const { container } = render(<BrowserRouter><SettingsPage count={50} /></BrowserRouter>)
  expect(container.getElementsByClassName("nationalityItem").length).toBe(17);
})