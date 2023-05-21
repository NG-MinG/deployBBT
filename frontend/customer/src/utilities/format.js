export const toPriceFormat = (number, slash = '.') => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, slash);
};

export const toDateFormat = (date, slash = '-', dayFm = 'numeric', monthFm = 'numeric', yearFm = 'numeric') => {
  return new Date(date).toLocaleString('en-US', { month: monthFm, year: yearFm, day: dayFm }).replaceAll('/', slash);
};