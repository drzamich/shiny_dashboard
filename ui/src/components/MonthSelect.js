import React from 'react';
import moment from 'moment';
import { MonthContext } from './App';

export default function MonthSelect({ onChange }) {
  const [value, setValue] = React.useState('');
  const monthCodes = React.useContext(MonthContext);

  React.useEffect(() => {
    setValue(monthCodes[monthCodes.length - 1]);
  }, [monthCodes]);

  const onSelectChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const displayFormat = 'MMMM YYYY';

  return (
    <div>
      <select name="scope" id="scope-select" onChange={onSelectChange} value={value} data-testid="month-select">
          {monthCodes.map(month => <option value={month} key={month} data-testid="month-select-option">{`${moment(month).format(displayFormat)}`}</option>)}
      </select>
    </div>
  );
}
