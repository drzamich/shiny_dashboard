import React from 'react';
import moment from 'moment';
import Dropdown from './Dropdown';
import { MonthContext } from '../App';

export default function MonthSelect({ onChange }) {
  const [currentMonth, setCurrentMonth] = React.useState('');
  const monthCodes = React.useContext(MonthContext);
  const displayFormat = 'MMMM YYYY';

  React.useEffect(() => {
    setCurrentMonth(monthCodes[monthCodes.length - 1]);
  }, [monthCodes]);

  const keyValues = React.useMemo(
    () =>
      monthCodes.reduce((result, monthCode) => {
        result[monthCode] = moment(monthCode).format(displayFormat);
        return result;
      }, {}),
    [monthCodes]
  );

  const onSelectChange = (month) => {
    setCurrentMonth(month);
    onChange(month);
  };

  return (
    <Dropdown
      keyValues={keyValues}
      currentKey={currentMonth}
      onChange={onSelectChange}
      transparent
    />
  );
}
