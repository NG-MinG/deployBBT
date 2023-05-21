export const toPriceFormat = (number, slash = '.') => { 
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, slash); 
};

export const toDateFormat = (date, slash = '-', dayFm = '2-digit', monthFm = '2-digit', yearFm = 'numeric') => {
    return new Date(date).toLocaleString('en-GB', { month: monthFm, year: yearFm, day: dayFm }).replaceAll('/', slash);
};