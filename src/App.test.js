import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

test('Expects add contact button to be in App component', () => {
  const { queryByTestId } = render(<App />);
  const addContactButton = queryByTestId('add-contact-button');
  expect(addContactButton).toBeInTheDocument();
});

test('Expects drawer component no to be in App component on render', () => {
  const { queryByTestId } = render(<App />);
  const addContactDrawer = queryByTestId('add-contact-drawer');
  expect(addContactDrawer).not.toBeInTheDocument();
});
