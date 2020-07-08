import { parseMonths } from '../components/MonthSelect';

describe('parseMonths()', () => {
  const inputOutputData = [
    [['2018-01'], { '2018-01': 'January 2018' }],
    [['2019-02', '2019-03'], { '2019-02': 'February 2019', '2019-03': 'March 2019' }]
  ];

  it.each(inputOutputData)('For input: %a produces output: %o', (input, expectedOutput) => {
    // given
    // when
    const output = parseMonths(input);
    // then
    expect(output).toEqual(expectedOutput);
  });
});
