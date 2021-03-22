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


test('check app data search store', () => {
  AppDataStore.setSearch("person");
  expect(AppDataStore.searchedStr).toBe("person");
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
});

test('Nationality state selection', () => {
  AppDataStore.clearNationalities();
  AppDataStore.toggleNationality("CA");
  AppDataStore.toggleNationality("US");
  AppDataStore.toggleNationality("FR");
  expect(AppDataStore.nationality.length).toBe(3);
  expect(AppDataStore.nationality.includes("CA")).toBe(true);
  expect(AppDataStore.nationality.includes("US")).toBe(true);
  expect(AppDataStore.nationality.includes("FR")).toBe(true);
});

test('Nationality state unselection', () => {
  AppDataStore.clearNationalities();
  AppDataStore.toggleNationality("CA");
  AppDataStore.toggleNationality("US");
  AppDataStore.toggleNationality("FR");

  AppDataStore.toggleNationality("US");
  AppDataStore.toggleNationality("FR");
  expect(AppDataStore.nationality.length).toBe(1);
});

test('Settings page selection', () => {
  AppDataStore.clearNationalities();
  const { container } = render(<BrowserRouter><SettingsPage count={50} /></BrowserRouter>);
  AppDataStore.toggleNationality("TR");
  AppDataStore.toggleNationality("NZ");
  AppDataStore.toggleNationality("NL");
  expect(container.getElementsByClassName("selectedNat").length).toBe(3);
});