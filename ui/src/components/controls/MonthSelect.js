import React from 'react';
import moment from 'moment';
import Dropdown from 'components/controls/Dropdown';
import { MonthContext } from 'components/App';

export default function MonthSelect({ onChange }) {
  const [currentMonth, setCurrentMonth] = React.useState('');
  const monthCodes = React.useContext(MonthContext);
  const displayFormat = 'MMMM YYYY';

  React.useEffect(() => {
    setCurrentMonth(monthCodes[monthCodes.length - 1]);
  }, [monthCodes]);

  const keyValues = React.useMemo(
    () => monthCodes.reduce((result, monthCode) => {
      // eslint-disable-next-line no-param-reassign
      result[monthCode] = moment(monthCode).format(displayFormat);
      return result;
    }, {}),
    [monthCodes],
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
