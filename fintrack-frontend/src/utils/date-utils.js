export const calculateDaysBetween = (startDate, endDate, includeEndDay = true) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = Math.abs(end - start);
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    if (includeEndDay)
        daysDifference += 1;
    return daysDifference;
};

export const isDateInRange = (date, fromDate, toDate) => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    return new Date(fromDate) <= targetDate && targetDate <= new Date(toDate);
};

export const formatDateToISO = (date) => {
    const localDate = formatDateToLocale(date);
    const [day, month, year] = localDate.split('.');
    return `${year}-${month}-${day}`;
};

export const formatDateToLocale = (date) => {
    const targetDate = new Date(date);
    return targetDate.toLocaleDateString().slice(0, 10);
};

export const  subtractMonthsFromDate = (date, months) => {
    date.setMonth(date.getMonth() - months);
    return date;
}

export const addMonthsToDate = (date, months) => {
    return subtractMonthsFromDate(date, -months);
}