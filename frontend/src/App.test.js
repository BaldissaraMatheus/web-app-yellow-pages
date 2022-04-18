import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import nock from 'nock';
import { API_URL } from './utils/constants';

nock.disableNetConnect();

test('When user types 125, it must show the "no results" message', async () => {
  const { getByTestId } = render(<App />);
  const input = getByTestId('search-input');
  fireEvent.change(input, { target: { value: '125' } });
  const mockRequest = nock(API_URL)
    .get('/users',)
    .query({ age: '125' })
    .reply(200, [], {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    });

  await waitFor(() => expect(mockRequest.isDone()).toBe(true))
  // Debounce is causing some weird delays, this timeout fix it
  await new Promise((resolve) => setTimeout(() => resolve(true), 500));
  expect(getByTestId('no-results')).toBeInTheDocument()
});

const mockUser = {
  "_id": "5dd6a1bf0ac2e7accd2d6ed4",
  "picture": "image10.png",
  "birthday": "2009-07-19T12:00:45 -03:00",
  "name": "Figueroa Cochran",
  "address": "606 Driggs Avenue, Villarreal, American Samoa, 123",
  "phone_number": "(053) 9255732"
}

test('When user types 12, it must render a user item', async () => {
  const { getByTestId } = render(<App />);
  const input = getByTestId('search-input');
  fireEvent.change(input, { target: { value: '12' } });
  const mockRequest = nock(API_URL)
    .get('/users',)
    .query({ age: '12' })
    .reply(206, [mockUser], {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json'
    });
  await waitFor(() => expect(mockRequest.isDone()).toBe(true));
  await new Promise((resolve) => setTimeout(() => resolve(true), 500));
  expect(getByTestId('user-item')).toBeInTheDocument()
});

describe.only('Searching for phone number', () => {
  const expectedQuery = `{"phone":"(052) 1264178"}`;

  test('When the user searches for (052) 1264178,'
    + 'then the an HTTP call must be sent with phone number equal to (052) 1264178', async () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('search-input');
      if (!nock.isActive()) nock.activate()
      const inputPhone = '(052) 1264178';
      fireEvent.change(input, { target: { value: inputPhone } });
      let currentQuery;
      const mockRequest = nock(API_URL)
        .get('/users',)
        .query((query => { currentQuery = query; return query; }))
        .reply(206, [mockUser], {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        })
      await waitFor(() => expect(mockRequest.isDone()).toBe(true));
      expect(JSON.stringify(currentQuery)).toBe(expectedQuery)
    });

  test('When the user searches for (052) 126-4178,'
    + 'then the an HTTP call must be sent with phone number equal to (052) 1264178', async () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('search-input');
      if (!nock.isActive()) nock.activate()
      const inputPhone = '(052) 126-4178';
      fireEvent.change(input, { target: { value: inputPhone } });
      let currentQuery;
      const mockRequest = nock(API_URL)
        .get('/users',)
        .query((query => { currentQuery = query; return query; }))
        .reply(206, [mockUser], {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        })
      await waitFor(() => expect(mockRequest.isDone()).toBe(true));
      expect(JSON.stringify(currentQuery)).toBe(expectedQuery);
    });

  test('When the user searches for 052 1264178,'
    + 'then the an HTTP call must be sent with phone number equal to (052) 1264178', async () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('search-input');
      const inputPhone = '052 1264178';
      fireEvent.change(input, { target: { value: inputPhone } });
      let currentQuery;
      const mockRequest = nock(API_URL)
        .get('/users',)
        .query((query => { currentQuery = query; return query; }))
        .reply(206, [mockUser], {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        })
      await waitFor(() => expect(mockRequest.isDone()).toBe(true));
      expect(JSON.stringify(currentQuery)).toBe(expectedQuery)
      await waitFor(() => expect(mockRequest.isDone()).toBe(true));
      expect(JSON.stringify(currentQuery)).toBe(expectedQuery)
    });

  test('When the user searches for 052 126-4178,'
    + 'then the an HTTP call must be sent with phone number equal to (052) 1264178', async () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('search-input');
      const inputPhone = '052 126-4178';
      fireEvent.change(input, { target: { value: inputPhone } });
      let currentQuery;
      const mockRequest = nock(API_URL)
        .get('/users',)
        .query((query => { currentQuery = query; return query; }))
        .reply(206, [mockUser], {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        })
      await waitFor(() => expect(mockRequest.isDone()).toBe(true));
      expect(JSON.stringify(currentQuery)).toBe(expectedQuery)
    });

  test('When the user searches for 0521264178,'
    + 'then the an HTTP call must be sent with phone number equal to (052) 1264178', async () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('search-input');
      const inputPhone = '0521264178';
      fireEvent.change(input, { target: { value: inputPhone } });
      let currentQuery;
      const mockRequest = nock(API_URL)
        .get('/users',)
        .query((query => { currentQuery = query; return query; }))
        .reply(206, [mockUser], {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        })
      await waitFor(() => expect(mockRequest.isDone()).toBe(true));
      expect(JSON.stringify(currentQuery)).toBe(expectedQuery)
    });

  test('When the user searches for 052126-4178,'
    + 'then the an HTTP call must be sent with phone number equal to (052) 1264178', async () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('search-input');
      const inputPhone = '052126-4178';
      fireEvent.change(input, { target: { value: inputPhone } });
      let currentQuery;
      const mockRequest = nock(API_URL)
        .get('/users',)
        .query((query => { currentQuery = query; return query; }))
        .reply(206, [mockUser], {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        })
      await waitFor(() => expect(mockRequest.isDone()).toBe(true));
      expect(JSON.stringify(currentQuery)).toBe(expectedQuery)
    });

  test('When the user searches for (052)1264178,'
    + 'then the an HTTP call must be sent with phone number equal to (052) 1264178', async () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('search-input');
      const inputPhone = '(052)1264178';
      fireEvent.change(input, { target: { value: inputPhone } });
      let currentQuery;
      const mockRequest = nock(API_URL)
        .get('/users',)
        .query((query => { currentQuery = query; return query; }))
        .reply(206, [mockUser], {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        })
      await waitFor(() => expect(mockRequest.isDone()).toBe(true));
      expect(JSON.stringify(currentQuery)).toBe(expectedQuery)
    });

  test('When the user searches for (052)126-4178,'
    + 'then the an HTTP call must be sent with phone number equal to (052) 1264178', async () => {
      const { getByTestId } = render(<App />);
      const input = getByTestId('search-input');
      const inputPhone = '(052)126-4178';
      fireEvent.change(input, { target: { value: inputPhone } });
      let currentQuery;
      const mockRequest = nock(API_URL)
        .get('/users',)
        .query((query => { currentQuery = query; return query; }))
        .reply(206, [mockUser], {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        })
      await waitFor(() => expect(mockRequest.isDone()).toBe(true));
      expect(JSON.stringify(currentQuery)).toBe(expectedQuery)
    });
});