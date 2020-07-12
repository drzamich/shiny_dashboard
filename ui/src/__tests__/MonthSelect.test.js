import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import MonthSelect from '../components/controls/MonthSelect';
import { MonthContext } from '../components/App';

afterEach(cleanup);

const inputOutputData = [
  [['2018-01'], 'January 2018'],
  [['2019-02', '2019-03'], 'March 2019'],
];

describe.each(inputOutputData)('WIth %j in the context', (monthCodes, defaultOption) => {
  it('Renders dropdown with proper default option', () => {
    // given
    const mockedComponent = (
      <MonthContext.Provider value={monthCodes}>
        <MonthSelect />
      </MonthContext.Provider>
    );
    // when
    const { getByText } = render(mockedComponent);
    const button = getByText(defaultOption);
    // then
    expect(button).toBeDefined();
  });

  it('After clicking on the button, renders list of proper length', async () => {
    // given
    const mockedComponent = (
      <MonthContext.Provider value={monthCodes}>
        <MonthSelect />
      </MonthContext.Provider>
    );
    // when
    const { container } = render(mockedComponent);
    const button = container.querySelector('#dropdown');
    fireEvent.click(button);
    const options = container.querySelectorAll('a[role="button"]');
    // then
    await waitFor(() => expect(options).toHaveLength(monthCodes.length));
  });

  it('Properly calls the onChange callback', async () => {
    // given
    const mockedOnChange = jest.fn();
    const mockedComponent = (
      <MonthContext.Provider value={monthCodes}>
        <MonthSelect onChange={mockedOnChange} />
      </MonthContext.Provider>
    );
    // when
    const { container } = render(mockedComponent);
    const button = container.querySelector('#dropdown');
    fireEvent.click(button);
    const options = container.querySelectorAll('a[role="button"]');
    fireEvent.click(options[0]);
    // then
    await waitFor(() => {
      expect(mockedOnChange).toHaveBeenCalledTimes(1);
      expect(mockedOnChange).toHaveBeenCalledWith(monthCodes[0]);
    });
  });
});
