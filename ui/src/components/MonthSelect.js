import React from 'react';
import moment from 'moment';
import { MonthContext } from './App';

export const parseMonths = (months) => {
  const result = {};
  months.forEach(month => {
    result[month] = moment(month).format('MMMM YYYY');
  });
  return result;
};

export default function MonthSelect({ onChange }) {
  const [months, setMonths] = React.useState({});
  const [value, setValue] = React.useState('');
  const monthCodes = React.useContext(MonthContext);

  React.useEffect(() => {
    const parsedMonths = parseMonths(monthCodes);
    setMonths(parsedMonths);
    setValue(monthCodes[monthCodes.length - 1]);
  }, [monthCodes]);

  const onSelectChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <select name="scope" id="scope-select" onChange={onSelectChange} value={value}>
          {Object.keys(months).map(month => <option value={month} key={month}>{`${months[month]}`}</option>)}
      </select>
    </div>
  );
}
