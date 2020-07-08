import React from 'react';
import MonthSelect from './MonthSelect';

export default function Bars() {
  const onMonthChange = (newMonth) => {};

  return (
    <section className="bars">
      Bars
      <MonthSelect onChange={onMonthChange} />
    </section>
  );
}
