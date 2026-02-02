window.getDashboardHTML = function (appState) {
    const user = appState.user;
    // Filter forms based on user role
    const availableForms = Object.values(window.FORMS).filter(form => {
        // FINANCE & HR can ONLY see Monthly Attendance & Overtime
        if (user.role === 'FINANCE' || user.role === 'HR') {
            return ['monthly_attendance', 'overtime_control'].includes(form.id);
        }

        // Other roles
        if (!form.allowedRoles) return true;
        return form.allowedRoles.includes(user.role);
    });

    return `
    <div class="min-h-screen bg-slate-50 p-4 md:p-8">
        <div class="max-w-4xl mx-auto">
            <div class="flex justify-between items-center mb-12">
                <div>
                    <h1 class="text-3xl font-black text-slate-900">Welcome, ${user.name}</h1>
                    <p class="text-slate-500 font-medium">Select a module to continue</p>
                </div>
                <button id="logout-btn" class="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                    ${window.getIcon('LogOut', 16)} Sign Out
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                ${availableForms.map(form => `
                    <button class="form-select-btn group text-left bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-blue-500 transition-all w-full" data-id="${form.id}">
                        <div class="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            ${window.getIcon('Box', 24)}
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 mb-1">${form.title}</h3>
                        <p class="text-xs text-slate-400 font-medium uppercase tracking-wider mb-4">Code: ${form.id.toUpperCase()}</p>
                        <div class="flex items-center text-blue-600 text-sm font-bold">
                            Open Module <span class="ml-1">${window.getIcon('ChevronRight', 16)}</span>
                        </div>
                    </button>
                `).join('')}
            </div>
            
            <div class="mb-8">
                <h2 class="text-xl font-black text-slate-900 mb-4">Recent Submissions</h2>
                <div id="dashboard-submissions" class="space-y-4">
                    <div class="text-center py-8 text-slate-400">Loading submissions...</div>
                </div>
            </div>

            ${user.role === 'STORE_MAN' ? `
                <div class="mt-8 bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-4">
                    <div class="bg-orange-100 p-2 rounded-lg text-orange-600">
                        ${window.getIcon('HardHat', 20)}
                    </div>
                    <div>
                        <h4 class="font-bold text-orange-900 text-sm">Store Man Dashboard</h4>
                        <p class="text-orange-700/70 text-xs">You have permission to validate presenter submissions.</p>
                    </div>
                </div>
            ` : ''}
        </div>
    </div>`;
}

window.bindDashboardEvents = function (appState, render) {
    document.getElementById('logout-btn').addEventListener('click', () => {
        appState.user = null;
        appState.view = 'LOGIN';
        render();
    });

    document.querySelectorAll('.form-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id.toUpperCase();
            appState.activeFormType = id;
            appState.view = 'FORM';

            // New Form Initialization
            const config = window.FORMS[id];
            const ethDate = window.getEthiopianDate ? window.getEthiopianDate() : { monthName: '', year: '' };

            appState.formData = {
                id: Date.now().toString(), // Helper ID for now
                header: {
                    month: (id === 'MONTHLY_ATTENDANCE' || id === 'OVERTIME_CONTROL') ? ethDate.monthName : '',
                    year: (id === 'MONTHLY_ATTENDANCE' || id === 'OVERTIME_CONTROL') ? ethDate.year : ''
                },
                rows: Array(config.defaultRows).fill(null).map((_, i) => ({
                    eId: (id === 'MONTHLY_ATTENDANCE' || id === 'WEEKLY_ATTENDANCE' || id === 'OVERTIME_CONTROL')
                        ? (window.EMPLOYEE_IDS[i] || '')
                        : '',

                    empName: (id === 'MONTHLY_ATTENDANCE' || id === 'WEEKLY_ATTENDANCE')
                        ? (window.OVERTIME_EMPLOYEES[i] || '')
                        : '',

                    employeeName: id === 'OVERTIME_CONTROL'
                        ? (window.OVERTIME_EMPLOYEES[i] || '')
                        : ''
                })),
                comments: '',
                approvalStatus: 'PENDING',
                approvedBy: null,
                approvedAt: null
            };

            render();
        });
    });

    // Load Submissions
    loadSubmissions(appState, render);
}

async function loadSubmissions(appState, render) {
    const container = document.getElementById('dashboard-submissions');
    if (!container) return;

    try {
        const forms = await window.api.fetchForms(null, appState.user.role, appState.user.username);

        if (forms.length === 0) {
            container.innerHTML = `<div class="text-center py-8 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">No submissions found.</div>`;
            return;
        }

        container.innerHTML = forms.map(form => {
            const config = window.FORMS[form.type] || { title: form.type };
            const statusColor = form.status === 'APPROVED' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
                (form.status === 'REJECTED' ? 'text-rose-600 bg-rose-50 border-rose-200' : 'text-amber-600 bg-amber-50 border-amber-200');

            return `
            <div class="submission-card bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer flex justify-between items-center shadow-sm" data-id="${form.id}">
                <div>
                    <h4 class="font-bold text-slate-800">${config.title}</h4>
                    <p class="text-xs text-slate-400">ID: ${form.id} • ${new Date(form.created_at).toLocaleDateString()} • By ${form.created_by}</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="px-3 py-1 rounded text-[10px] font-black uppercase border ${statusColor}">${form.status}</span>
                    <span class="text-slate-300">${window.getIcon('ChevronRight', 16)}</span>
                </div>
            </div>
            `;
        }).join('');

        // Bind click events
        container.querySelectorAll('.submission-card').forEach(card => {
            card.addEventListener('click', () => {
                const formId = card.dataset.id;
                const form = forms.find(f => f.id === formId);
                if (form) {
                    appState.activeFormType = form.type;
                    appState.view = 'FORM';
                    appState.formData = {
                        id: form.id, // Ensure ID is passed
                        createdBy: form.created_by, // Store original creator
                        ...form.data,
                        approvalStatus: form.status,
                        approvedBy: form.approved_by,
                        approvedAt: form.approved_at
                    };
                    render();
                }
            });
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = `<div class="text-center py-8 text-rose-500">Failed to load submissions</div>`;
    }
}
