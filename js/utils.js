window.calculateOvertime = function (row, role, rowIndex = 0) {
    const rates = {
        R: 1.5,
        H: 2.5,
        N: 1.75,
        W: 2
    };

    let base = {
        regularHours: 0,
        holidayHours: 0,
        nightHours: 0,
        weekendHours: 0
    };

    Object.keys(row).forEach(key => {
        if (!key.startsWith('d')) return;

        const value = (row[key] || '').toUpperCase();

        value.split('+').forEach(part => {
            const match = part.match(/([RHNW])(\d+(\.\d+)?)/);
            if (!match) return;

            const type = match[1];
            const hours = parseFloat(match[2]);

            if (type === 'R') base.regularHours += hours;
            if (type === 'H') base.holidayHours += hours;
            if (type === 'N') base.nightHours += hours;
            if (type === 'W') base.weekendHours += hours;
        });
    });

    // Weighted sum of OT hours based on rates
    const grandOtHours =
        (base.regularHours * rates.R) +
        (base.holidayHours * rates.H) +
        (base.nightHours * rates.N) +
        (base.weekendHours * rates.W);

    // Use the row index to determine hourly rate
    const hourlyRate = window.getHourlyRateByIndex(rowIndex);
    const totalEtb = grandOtHours * hourlyRate;

    // Return object with raw hours for individual columns and calculated totals
    return {
        ...base,
        grandOtHours: grandOtHours.toFixed(2),
        totalEtb: totalEtb.toFixed(2)
    };
}

window.getHourlyRateByIndex = function (index) {
    if (index >= 0 && index <= 9) return 78.13;    // Group 1
    if (index >= 10 && index <= 18) return 62.5;   // Group 2
    if (index >= 19 && index <= 20) return 140.63; // Group 3 (Bereket, Gadisa)
    if (index === 21) return 114.58;               // Group 4 (Abraham)
    if (index === 22) return 93.78;                // Group 5 (Goytom)
    if (index >= 23 && index <= 24) return 46.88;  // Group 6 (Weyneshet, Fasika)
    return 0;
}

window.calculateAttendance = function (row) {
    let tpd = 0; // Total Present Days
    let tad = 0; // Total Absent Days
    let thl = 0; // Total Holiday/Leave

    Object.keys(row).forEach(key => {
        if (!key.startsWith('d')) return;

        const val = (row[key] || '').toUpperCase();
        if (val === 'P') tpd++;
        else if (val === 'A') tad++;
        else if (val === 'H' || val === 'L') thl++;
    });

    return { tpd, tad, thl };
}
