export const getMonthDateRanges = () => {
    const dateRanges = {};
    for (let month = 0; month < 12; month++) {
        const firstDay = new Date(new Date().getFullYear(), month, 2);
        const lastDay = new Date(new Date().getFullYear(), month + 1, 0);

        const firstDayString = firstDay.toISOString().slice(0, 10);
        const lastDayString = lastDay.toISOString().slice(0, 10);

        const monthName = firstDay.toLocaleString('default', { month: 'long' });

        dateRanges[monthName] = {
            firstDay: firstDayString,
            lastDay: lastDayString,
        };
    }
    return dateRanges;
}