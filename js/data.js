// --- DATA & CONFIGURATION ---

// Remove imports, assume window.getHourlyRateByIndex is available
// import { getHourlyRateByIndex } from './utils.js';

window.USER_DB = {
    presenter1: {
        name: 'Presenter One',
        role: 'PRESENTER',
        password: 'presenter123'
    },
    presenter2: {
        name: 'Presenter Two',
        role: 'PRESENTER',
        password: 'presenter123'
    },
    reviewer: {
        name: 'Senior Reviewer',
        role: 'REVIEWER',
        password: 'reviewer123'
    },
    viewer: {
        name: 'Observer',
        role: 'VIEWER',
        password: 'viewer123'
    },
    storeman: {
        name: 'Store Keeper',
        role: 'STORE_MAN',
        password: 'store123'
    },
    finance: {
        name: 'Finance Officer',
        role: 'FINANCE',
        password: 'finance123'
    },
    hr: {
        name: 'Human Resources',
        role: 'HR',
        password: 'hr123'
    }
};

window.OVERTIME_EMPLOYEES = [
    "ABEBE KEBED", "SIRAJ HELILL", "ESMAIL KASEM", "SEWENET AYALEW", "TESKARE LIKESA",
    "BEKALU HAILU", "KEFELEGN BEKELE", "ENIDEG LIYEW", "URGECHA ZEMBABA", "DEMIS ALEMU", // 78.13 (0-9)
    "YONAS ABEBAW", "HAYRDIN JEMAL", "MENTESENOT FELEKE", "SHEGAW MULUYE", "FANUAL GIZAW",
    "TOKUMA EDECHA", "ALEMU GAREMU", "HABTAMU HAYMANOT", "HABTAMU ENDASHAW", // 62.5 (10-18)
    "BEREKET CHALE", "GADISA TEFERA", // 140.63 (19-20)
    "ABRAHAM AMARE", // 114.58 (21)
    "GOYTOM G/MEDHIN", // 93.78 (22)
    "WEYNESHET LIGABA", "FASIKA KINFE" // 46.88 (23-24)
];

window.EMPLOYEE_IDS = [
    "024", "016", "014", "015", "017", "028", "012", "025", "030", "018", // 10 IDs
    "044", "039", "021", "032", "027", "020", "046", "026", "019", // 9 IDs
    "006", "023", // 2 IDs (Bereket, Gadisa)
    "011", // 1 ID (Abraham)
    "022", // 1 ID (Goytom)
    "045", "044" // 2 IDs (Weyneshet, Fasika)
];

window.FORMS = {
    DAILY_PR: {
        id: 'daily_pr',
        title: 'Daily Production Plan - Tire Recycling Plant',
        headerFields: [
            { label: 'Production Center', key: 'productionCenter' },
            { label: 'Activity Day', key: 'activityDay', type: 'date' },
            { label: 'Activity Output', key: 'activityOutput' }
        ],
        columns: [
            { key: 'activity', label: 'Activity', width: 'min-w-[120px]' },
            { key: 'shiftTime', label: 'Shift/Time Interval', width: 'w-32' },
            { key: 'hourlyGoal', label: 'Hourly Goal', width: 'w-24' },
            { key: 'unit', label: 'Unit', width: 'w-20' },
            { key: 'inputMaterial', label: 'Input Material Description', width: 'min-w-[100px]' },
            { key: 'productionPlanQty', label: 'Production Plan Qty', width: 'w-28' },
            { key: 'materialUnit', label: 'Material Measuring Unit', width: 'w-24' },
            { key: 'actual', label: 'Actual', width: 'w-24' },
            { key: 'teamMembers', label: 'Team Members', width: 'min-w-[150px]' },
            { key: 'equipmentStatus', label: 'Equipment Checks/Status', width: 'w-28' },
            { key: 'issues', label: 'Issues', width: 'w-24' },
            { key: 'notes', label: 'Notes', width: 'min-w-[150px]' }
        ],
        defaultRows: 20,
        footerSignatures: ['Prepared by', 'Checked by', 'Approved by (PM)', 'Approved by (QC)']
    },
    WEEKLY_PLAN: {
        id: 'weekly_plan',
        title: 'Weekly Plan',
        headerFields: [
            { label: 'Production Center', key: 'productionCenter' },
            { label: 'Activity Week', key: 'activityWeek' },
            { label: 'Date of Issue', key: 'dateOfIssue', type: 'date' }
        ],
        columns: [
            { key: 'activity', label: 'ACTIVITY', width: 'min-w-[200px]' },
            { key: 'target', label: 'TARGET', width: 'w-20' },
            { key: 'qty', label: 'QTY', width: 'w-16' },
            { key: 'responsible', label: 'RESPONSIBLE PERSON', width: 'min-w-[150px]' },
        ],
        defaultRows: 5,
        footerSignatures: ['Prepared by', 'Checked by', 'Weekly Review']
    },
    WEEKLY_REPORT: {
        id: 'weekly_report',
        title: 'Weekly Report',
        headerFields: [
            { label: 'Production Center', key: 'productionCenter' },
            { label: 'Report Period', key: 'reportPeriod' },
            { label: 'Achieved Goal', key: 'achievedGoal' },
            { label: 'Date of Planning', key: 'datePlanning', type: 'date' }
        ],
        columns: [
            { key: 'no', label: 'No', width: 'w-12' },
            { key: 'activity', label: 'Activity', width: 'min-w-[200px]' },
            {
                label: 'Plan',
                subColumns: [
                    { key: 'planQty', label: 'Qty' },
                    { key: 'planPerc', label: '%' }
                ]
            },
            {
                label: 'Achieved',
                subColumns: [
                    { key: 'achievedQty', label: 'Qty' },
                    { key: 'achievedPerc', label: '%' }
                ]
            },
            { key: 'discrepancy', label: 'Discrepancy', width: 'w-24' },
            { key: 'justification', label: '-/+ Justification', width: 'min-w-[150px]' },
            { key: 'downtime', label: 'Downtime', width: 'w-24' },
            { key: 'qualityIssues', label: 'Quality Issues', width: 'min-w-[150px]' },
            { key: 'safety', label: 'Safety Incidents', width: 'min-w-[150px]' },
        ],
        defaultRows: 5,
        footerSignatures: ['Prepared by', 'Checked by', 'Approved by', 'Approved by']
    },
    MONTHLY_PLAN: {
        id: 'monthly_plan',
        title: 'Monthly Plan',
        headerFields: [
            { label: 'Production Center', key: 'productionCenter' },
            { label: 'Duration From', key: 'durationFrom', type: 'date' },
            { label: 'Duration To', key: 'durationTo', type: 'date' },
            { label: 'Activity Output', key: 'activityOutput' },
            { label: 'Date of Planning', key: 'datePlanning', type: 'date' }
        ],
        columns: [
            { key: 'no', label: 'NO', width: 'w-12' },
            { key: 'activity', label: 'ACTIVITY', width: 'min-w-[200px]' },
            { key: 'target', label: 'TARGET', width: 'w-20' },
            { key: 'unit', label: 'UNIT', width: 'w-16' },
            { key: 'qty', label: 'QTY', width: 'w-16' },
            {
                label: 'TIME TABLE',
                subColumns: [
                    { key: 'w1', label: 'Week 1' },
                    { key: 'w2', label: 'Week 2' },
                    { key: 'w3', label: 'Week 3' },
                    { key: 'w4', label: 'Week 4' },
                ]
            },
            { key: 'responsible', label: 'RESPONSIBLE PERSON', width: 'min-w-[150px]' },
            { key: 'resource', label: 'RESOURCE NEEDED', width: 'min-w-[150px]' },
            { key: 'budget', label: 'BUDGET', width: 'w-24' },
        ],
        defaultRows: 5,
        footerSignatures: ['Prepared by', 'Checked by']
    },
    MONTHLY_REPORT: {
        id: 'monthly_report',
        title: 'Monthly Report',
        headerFields: [
            { label: 'Production Center', key: 'productionCenter' },
            { label: 'Report Month', key: 'reportMonth' },
            { label: 'Activity Result', key: 'activityResult' },
            { label: 'Date of Report', key: 'dateReport', type: 'date' }
        ],
        columns: [
            { key: 'planLine', label: 'PLAN LINE', width: 'w-24' },
            { key: 'plannedActivity', label: 'PLANNED ACTIVITY', width: 'min-w-[200px]' },
            {
                label: 'PLAN',
                subColumns: [
                    { key: 'planNo', label: 'NO' },
                    { key: 'planPerc', label: '%' }
                ]
            },
            {
                label: 'ACTUAL',
                subColumns: [
                    { key: 'actNo', label: 'NO' },
                    { key: 'actPerc', label: '%' }
                ]
            },
            { key: 'variance', label: 'VARIANCE', width: 'w-24' },
            { key: 'rootCause', label: 'ROOT CAUSE', width: 'min-w-[150px]' },
            { key: 'action', label: 'CORRECTIVE ACTION', width: 'min-w-[150px]' },
            { key: 'responsible', label: 'RESPONSIBLE PERSON', width: 'min-w-[150px]' },
        ],
        defaultRows: 5,
        footerSignatures: ['Prepared by', 'Checked by', 'Approved by', 'Approved by']
    },


    MONTHLY_ATTENDANCE: {
        id: 'monthly_attendance',
        title: 'Monthly Employee Attendance Tracker',
        allowedRoles: ['REVIEWER', 'STORE_MAN', 'VIEWER', 'FINANCE', 'HR', 'PRESENTER'], // Visible to Reviewers and Presenters
        headerFields: [
            { label: 'Month', key: 'month', type: 'select', options: window.ETHIOPIAN_MONTHS },
            { label: 'Year', key: 'year', type: 'number' },
            { label: 'Department', key: 'department' }
        ],
        columns: [
            { key: 'eId', label: 'E. ID', width: 'w-16' },
            { key: 'empName', label: 'Employee Name', width: 'min-w-[150px]' },
            { key: 'designation', label: 'Designation', width: 'min-w-[120px]' },
            { key: 'tpd', label: 'TPD', width: 'w-12' }, // Total Present Days
            { key: 'tad', label: 'TAD', width: 'w-12' }, // Total Absent Days
            { key: 'thl', label: 'THL', width: 'w-12' }, // Total Holiday/Leave
            {
                label: 'DAYS 01-15',
                subColumns: [
                    { key: 'd01', label: '01', type: 'attendance' }, { key: 'd02', label: '02', type: 'attendance' }, { key: 'd03', label: '03', type: 'attendance' }, { key: 'd04', label: '04', type: 'attendance' }, { key: 'd05', label: '05', type: 'attendance' },
                    { key: 'd06', label: '06', type: 'attendance' }, { key: 'd07', label: '07', type: 'attendance' }, { key: 'd08', label: '08', type: 'attendance' }, { key: 'd09', label: '09', type: 'attendance' }, { key: 'd10', label: '10', type: 'attendance' },
                    { key: 'd11', label: '11', type: 'attendance' }, { key: 'd12', label: '12', type: 'attendance' }, { key: 'd13', label: '13', type: 'attendance' }, { key: 'd14', label: '14', type: 'attendance' }, { key: 'd15', label: '15', type: 'attendance' }
                ]
            },
            {
                label: 'DAYS 16-31',
                subColumns: [
                    { key: 'd16', label: '16', type: 'attendance' }, { key: 'd17', label: '17', type: 'attendance' }, { key: 'd18', label: '18', type: 'attendance' }, { key: 'd19', label: '19', type: 'attendance' }, { key: 'd20', label: '20', type: 'attendance' },
                    { key: 'd21', label: '21', type: 'attendance' }, { key: 'd22', label: '22', type: 'attendance' }, { key: 'd23', label: '23', type: 'attendance' }, { key: 'd24', label: '24', type: 'attendance' }, { key: 'd25', label: '25', type: 'attendance' },
                    { key: 'd26', label: '26', type: 'attendance' }, { key: 'd27', label: '27', type: 'attendance' }, { key: 'd28', label: '28', type: 'attendance' }, { key: 'd29', label: '29', type: 'attendance' }, { key: 'd30', label: '30', type: 'attendance' }, { key: 'd31', label: '31', type: 'attendance' }
                ]
            }
        ],
        defaultRows: OVERTIME_EMPLOYEES.length,
        footerSignatures: ['Prepared by', 'Checked by', 'HR Approved']
    },
    OVERTIME_CONTROL: {
        id: 'overtime_control',
        title: 'Over Time Control Sheet',
        allowedRoles: ['STORE_MAN', 'PRESENTER', 'REVIEWER', 'FINANCE', 'HR'],
        headerFields: [
            { label: 'Company Name', key: 'companyName' },
            { label: 'Project', key: 'project' },
            { label: 'Month', key: 'month', type: 'select', options: window.ETHIOPIAN_MONTHS },
            { label: 'Year', key: 'year', type: 'number' }
        ],
        columns: [
            { key: 'eId', label: 'Emp ID', width: 'w-20' },
            { key: 'no', label: 'No', width: 'w-12' },
            { key: 'employeeName', label: 'Employee Name', width: 'min-w-[180px]' },
            { key: 'grandOtHours', label: 'Grand OT Hrs', width: 'w-24' },
            { key: 'totalEtb', label: 'Total OT (ETB)', width: 'w-28' },
            {
                label: 'Daily OT Hours',
                subColumns: [
                    { key: 'd1', label: '1' }, { key: 'd2', label: '2' },
                    { key: 'd3', label: '3' }, { key: 'd4', label: '4' },
                    { key: 'd5', label: '5' }, { key: 'd6', label: '6' },
                    { key: 'd7', label: '7' }, { key: 'd8', label: '8' },
                    { key: 'd9', label: '9' }, { key: 'd10', label: '10' },
                    { key: 'd11', label: '11' }, { key: 'd12', label: '12' },
                    { key: 'd13', label: '13' }, { key: 'd14', label: '14' },
                    { key: 'd15', label: '15' }, { key: 'd16', label: '16' },
                    { key: 'd17', label: '17' }, { key: 'd18', label: '18' },
                    { key: 'd19', label: '19' }, { key: 'd20', label: '20' },
                    { key: 'd21', label: '21' }, { key: 'd22', label: '22' },
                    { key: 'd23', label: '23' }, { key: 'd24', label: '24' },
                    { key: 'd25', label: '25' }, { key: 'd26', label: '26' },
                    { key: 'd27', label: '27' }, { key: 'd28', label: '28' },
                    { key: 'd29', label: '29' }, { key: 'd30', label: '30' },
                    { key: 'd31', label: '31' }
                ]
            },
            { key: 'regularHours', label: 'Regular', width: 'w-20' },
            { key: 'holidayHours', label: 'Holiday', width: 'w-20' },
            { key: 'nightHours', label: 'Night', width: 'w-20' },
            { key: 'weekendHours', label: 'Weekend', width: 'w-24' },
            { key: 'signature', label: 'Signature', width: 'min-w-[120px]' }
        ],
        defaultRows: OVERTIME_EMPLOYEES.length,
        footerSignatures: ['Prepared By', 'Approved By', 'Authorized By']
    }
}
