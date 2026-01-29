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

    // FINANCE STRUCTURE
    if (role === 'FINANCE') {
        const grandOtHours =
            (base.regularHours * rates.R) +
            (base.holidayHours * rates.H) +
            (base.nightHours * rates.N) +
            (base.weekendHours * rates.W);

        // Use the row index to determine hourly rate
        const hourlyRate = window.getHourlyRateByIndex(rowIndex);
        const totalEtb = grandOtHours * hourlyRate;

        return {
            ...base,
            grandOtHours: grandOtHours.toFixed(2),
            totalEtb: totalEtb.toFixed(2)
        };
    }

    // DEFAULT (OTHER ROLES)
    return {
        regularHours: base.regularHours * rates.R,
        holidayHours: base.holidayHours * rates.H,
        nightHours: base.nightHours * rates.N,
        weekendHours: base.weekendHours * rates.W
    };
}

window.getHourlyRateByIndex = function (index) {
    if (index >= 0 && index <= 9) return 78.5;   // No 1–10
    if (index >= 10 && index <= 18) return 62.5; // No 11–19
    return 0;
}
