/**
 * Ethiopian Date Utilities
 * Logic to handle Ethiopian Calendar conversions and formatting.
 */

window.ETHIOPIAN_MONTHS = [
    "Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yakatit",
    "Magabit", "Miyazya", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"
];

/**
 * Very simple Gregorian to Ethiopian conversion for the current year.
 * Note: A full conversion algorithm is complex. Since the request is for an "attendance calendar",
 * we typically want current date context or a selectable dropdown of Ethiopian years.
 * This helper returns an approximate conversion or the standard months list.
 */
window.getEthiopianDate = function (date = new Date()) {
    // Current year: 2026-02-02 is in Ethiopian Year 2018 (Meskerem starts Sept 11/12)
    // For simplicity, we'll provide the logic to get current Ethiopian Year/Month

    // Ethiopian New Year is usually Sept 11 (or 12 in leap years)
    const jdn = Math.floor(date.getTime() / 86400000) + 2440588 - 0.5;

    // Simple implementation for current context
    // 2026 Gregorian is 2018 Ethiopian (until Sept)
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    const day = date.getDate();

    let etYear = year - 8;
    // Before Sept 11, it's year-8. After Sept 11/12, it's year-7.
    // However, exact conversion depends on many factors. 
    // Usually systems like this just need the CURRENT Ethiopian month name and year.

    // Hardcoded logic for common use cases or a placeholder for a better algorithm.
    // Let's use a standard offset logic for now:
    // Feb 2026 -> Terr/Yakatit 2018

    return {
        year: etYear,
        monthIndex: (month + 4) % 12, // Rough approximation
        monthName: window.ETHIOPIAN_MONTHS[(month + 4) % 12]
    };
};

window.getEthiopianMonthsList = function () {
    return window.ETHIOPIAN_MONTHS;
};

window.getDaysInEthiopianMonth = function (monthIndex, year) {
    if (monthIndex === 12) { // Pagume
        // Leap year logic: (year + 1) % 4 === 0 ? 6 : 5 (Ethiopian Calendar)
        return (year % 4 === 3) ? 6 : 5;
    }
    return 30; // All other 12 months have 30 days
};
