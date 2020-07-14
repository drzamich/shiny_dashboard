/* eslint-disable import/prefer-default-export */
export const numberWithSpaces = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
