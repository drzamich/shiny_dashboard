import React from 'react';
import MonthSelect from '../controls/MonthSelect';
import { MonthContext } from '../components/App';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);


describe('MonthSelect', () => {
  const inputOutputData = [
    [['2018-01'], 1, 'January 2018'],
    [['2019-02', '2019-03'], 2, 'March 2019'],
  ];

  it.each(inputOutputData)('With %j in the context, renders <select> tag with %i option and %s set as default option', (input, noOptions, defaultOption) => {
    // given
    const mockedOnChange = jest.fn();
    const mockedComponent = (
      <MonthContext.Provider value={input}>
        <MonthSelect onChange={mockedOnChange} />
      </MonthContext.Provider>
    );
    // when
    const { getByTestId, getAllByTestId } = render(mockedComponent);
    const select = getByTestId('month-select');
    const options = getAllByTestId('month-select-option');
    // then
    expect(select.value).toEqual(input[input.length - 1]);
    expect(options).toHaveLength(noOptions);
    expect(options[options.length -1].textContent).toEqual(defaultOption);
  });
});
