const getStatusStyles = (status) => {
    if (status === 'APPROVED' || status === 'VALIDATED') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'REJECTED') return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
};

window.getFormHTML = function (appState) {
    const config = window.FORMS[appState.activeFormType];
    const data = appState.formData;
    const user = appState.user;
    const isFinance = user.role === 'FINANCE';
    const isHR = user.role === 'HR';
    const isReviewer = user.role === 'REVIEWER';
    const isStoreMan = user.role === 'STORE_MAN';
    const isViewer = user.role === 'VIEWER';
    const canEditComments = isReviewer && data.approvalStatus === 'PENDING';

    const isDataLocked = isViewer || isStoreMan || data.approvalStatus === 'APPROVED' || data.approvalStatus === 'VALIDATED';
    const canApprove = (isReviewer || isStoreMan) && data.approvalStatus !== 'APPROVED';
    const canSave = !isDataLocked && !isReviewer && !isViewer && !isStoreMan; // Only creator (Presenter) can save edits if not approved

    return `
    <div class="min-h-screen flex flex-col bg-white font-sans text-slate-900">
        <div class="bg-slate-900 text-white p-4 flex flex-col md:flex-row justify-between items-center print:hidden sticky top-0 z-50 shadow-lg gap-4">
            <button id="back-btn" class="flex items-center gap-2 font-bold hover:text-blue-400 transition-colors group">
                ${window.getIcon('ArrowLeft', 18)} <span>Exit to Dashboard</span>
            </button>
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg border font-black text-[10px] uppercase tracking-wider ${getStatusStyles(data.approvalStatus)}">
                    Status: ${data.approvalStatus}
                </div>
                <span class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded text-white ${isStoreMan ? 'bg-orange-600' : 'bg-blue-600'}">${user.role} VIEW</span>
                ${canSave ? `
                    <button id="save-btn" class="bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-blue-500/20 shadow-lg">
                        ${window.getIcon('Save', 16)} SAVE CHANGES
                    </button>
                ` : ''}
                <button onclick="window.print()" class="bg-white text-slate-900 px-5 py-2 rounded-lg text-xs font-black flex items-center gap-2 hover:bg-slate-100 transition-all">
                    ${window.getIcon('Printer', 16)} PRINT
                </button>
            </div>
        </div>

        <div class="flex-1 p-4 md:p-12 print:p-0 overflow-auto">
            <div class="min-w-[1000px] max-w-full mx-auto border-2 border-slate-100 p-8 md:p-16 print:border-none print:p-0 relative shadow-2xl rounded-3xl print:shadow-none bg-white">
                
                ${(data.approvalStatus === 'APPROVED' || data.approvalStatus === 'VALIDATED') ? `
                    <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden">
                        <h1 class="text-[150px] font-black uppercase rotate-[-35deg] tracking-tighter">${data.approvalStatus}</h1>
                    </div>
                ` : ''}

                <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-4 border-slate-900 pb-8 gap-6">
                        <div class="flex items-center gap-4">
                            ${(appState.activeFormType === 'MONTHLY_ATTENDANCE' || appState.activeFormType === 'OVERTIME_CONTROL') ? `
                                <img src="css/logo.jpg" alt="Logo" class="h-16 w-auto object-contain">
                            ` : `
                                <div class="bg-slate-900 p-2 rounded-lg text-white">${window.getIcon('HardHat', 24)}</div>
                            `}
                            <div class="space-y-1">
                                <span class="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Construction Management</span>
                                <h1 class="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none">${config.title}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-blue-600 pl-4 md:pl-0 md:pr-4 py-1">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Master Document Record</p>
                        <p class="font-mono text-2xl font-bold text-slate-800">REF-${appState.activeFormType.slice(0, 3)}-${data.id ? data.id.slice(-4) : 'NEW'}</p>
                    </div>
                </div>

                <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    ${config.headerFields.map(f => `
                        <div class="flex flex-col group">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1.5 flex items-center gap-1.5">
                                <span class="text-blue-500">${window.getIcon('Calendar', 12)}</span>${f.label}
                            </label>
                            ${f.type === 'select' ? `
                                <select 
                                    data-action="header-input"
                                    data-key="${f.key}"
                                    ${isDataLocked ? 'disabled' : ''}
                                    class="w-full bg-transparent outline-none font-bold text-slate-800 border-b-2 border-slate-200 focus:border-blue-600 transition-colors py-1 ${isDataLocked ? 'cursor-default' : 'cursor-pointer'}"
                                >
                                    <option value="">Select ${f.label}...</option>
                                    ${f.options.map(opt => `<option value="${opt}" ${data.header[f.key] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                                </select>
                            ` : `
                                <input 
                                    type="${f.type || "text"}" 
                                    data-action="header-input"
                                    data-key="${f.key}"
                                    ${isDataLocked ? 'readonly' : ''}
                                    placeholder="..."
                                    class="w-full bg-transparent outline-none font-bold text-slate-800 border-b-2 border-slate-200 focus:border-blue-600 transition-colors py-1 ${isDataLocked ? 'cursor-default' : 'cursor-text'}" 
                                    value="${data.header[f.key] || ''}"
                                />
                            `}
                        </div>
                    `).join('')}
                </div>

                ${(appState.activeFormType === 'MONTHLY_ATTENDANCE') ? `
                    <div class="mb-6 p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-200 flex items-start gap-3">
                        <div class="bg-blue-200 p-1.5 rounded text-blue-700">${window.getIcon('Info', 16)}</div>
                        <div class="text-xs font-bold leading-relaxed">
                            <span class="uppercase tracking-widest text-blue-500 mb-1 block">Filing Rules</span>
                            If any employee was <span class="text-rose-600 bg-rose-100 px-1 rounded">ABSENT</span>, please mark them <strong>'A'</strong>.<br>
                            If any employee was <span class="text-emerald-600 bg-emerald-100 px-1 rounded">PRESENT</span>, please mark <strong>'P'</strong>.
                        </div>
                    </div>
                ` : ''}

                <div class="relative z-10 overflow-x-auto mb-8 rounded-xl border border-slate-300 shadow-sm">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="bg-slate-900 text-white">
                                <th class="p-3 w-10 text-[10px] font-black border-r border-slate-700">#</th>
                                ${config.columns.map(c => c.subColumns ? `
                                    <th class="p-0 border-r border-slate-700" colspan="${c.subColumns.length}">
                                        <div class="border-b border-slate-700 p-2 text-[10px] font-black uppercase tracking-widest">${c.label}</div>
                                        <div class="flex">
                                            ${c.subColumns.map((sub, sIdx) => `
                                                <div class="flex-1 p-2 text-[9px] font-bold uppercase text-center ${sIdx < c.subColumns.length - 1 ? 'border-r border-slate-700' : ''}">
                                                    ${sub.label}
                                                </div>
                                            `).join('')}
                                        </div>
                                    </th>
                                ` : `
                                    <th class="p-3 text-left text-[10px] font-black uppercase tracking-widest whitespace-nowrap border-r border-slate-700 ${c.width || ''}">
                                        ${c.label}
                                    </th>
                                `).join('')}
                                ${!isDataLocked ? '<th class="p-3 w-10 print:hidden"></th>' : ''}
                            </tr>
                        </thead>
                        <tbody class="text-slate-700">
                            ${data.rows.map((r, idx) => `
                                <tr class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                                    <td class="p-2 text-center text-[10px] font-bold bg-slate-100 border-r border-slate-200">${idx + 1}</td>
                                    ${config.columns.map(c => {
        if (c.subColumns) {
            return c.subColumns.map(sub => {
                if (sub.type === 'attendance') {
                    return `
                        <td class="p-0 border-r border-slate-200">
                             <input
                                type="text"
                                data-action="row-input"
                                data-type="attendance"
                                data-index="${idx}"
                                data-key="${sub.key}"
                                ${isDataLocked ? 'readonly' : ''}
                                value="${r[sub.key] || ''}"
                                class="w-full h-full p-2 outline-none text-xs min-h-[40px] text-center font-bold uppercase transition-colors
                                    ${(r[sub.key] || '').toUpperCase() === 'A' ? 'text-rose-600 bg-rose-50' : ((r[sub.key] || '').toUpperCase() === 'P' ? 'text-emerald-600 bg-emerald-50' : 'bg-transparent text-slate-700')}
                                "
                            />
                        </td>
                    `;
                }
                return `
                                                <td class="p-0 border-r border-slate-200">
                                                    <textarea
                                                        rows="1"
                                                        data-action="row-input"
                                                        data-index="${idx}"
                                                        data-key="${sub.key}"
                                                        ${(isDataLocked || ((isFinance || isHR || isReviewer) && ['grandOtHours', 'totalEtb'].includes(sub.key))) ? 'readonly' : ''}
                                                        class="w-full h-full p-2 bg-transparent outline-none text-xs resize-none min-h-[40px]"
                                                    >${r[sub.key] || ''}</textarea>
                                                </td>
                                            `;
            }).join('');
        }

        if (
            ((c.key === 'employeeName' || c.key === 'eId') && appState.activeFormType === 'OVERTIME_CONTROL') ||
            (c.key === 'empName' && (appState.activeFormType === 'MONTHLY_ATTENDANCE')) ||
            (c.key === 'eId' && (appState.activeFormType === 'MONTHLY_ATTENDANCE'))
        ) {
            return `
                                                <td class="p-0 border-r border-slate-200">
                                                    <textarea
                                                        rows="1"
                                                        readonly
                                                        class="w-full h-full p-2 bg-slate-100 outline-none text-xs font-bold resize-none min-h-[40px]"
                                                    >${c.key === 'eId' ? r.eId : c.key === 'empName' ? r.empName : r.employeeName || ''}</textarea>
                                                </td>
                                            `;
        }

        return `
                                            <td class="p-0 border-r border-slate-200">
                                                <textarea
                                                    rows="1"
                                                    data-action="row-input"
                                                    data-index="${idx}"
                                                    data-key="${c.key}"
                                                    ${(isDataLocked || ((isFinance || isHR || isReviewer) && ['grandOtHours', 'totalEtb'].includes(c.key))) ? 'readonly' : ''}
                                                    class="w-full h-full p-2 bg-transparent outline-none text-xs resize-none min-h-[40px]"
                                                >${r[c.key] || ''}</textarea>
                                            </td>`;
    }).join('')}
                                    
                                    ${!isDataLocked ? `
                                        <td class="p-1 print:hidden">
                                            <button class="text-slate-300 hover:text-red-500 transition-colors p-1" data-action="delete-row" data-index="${idx}">
                                                ${window.getIcon('X', 14)}
                                            </button>
                                        </td>
                                    ` : ''}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                ${!isDataLocked ? `
                    <button id="add-row-btn" class="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-xs font-bold transition-colors print:hidden">
                        <div class="bg-blue-100 p-1 rounded-full">${window.getIcon('Plus', 14)}</div>
                        <span>Add New Row</span>
                    </button>
                ` : '<div class="mb-8"></div>'}

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Remarks / Notes</h3>
                        <textarea 
                            id="comments-input"
                            ${canEditComments ? '' : 'readonly'}
                            class="w-full border-2 border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:border-blue-500 transition-all min-h-[120px] bg-slate-50"
                            placeholder="${canEditComments ? 'Reviewer remarks only...' : 'Read-only (Reviewer only)'}"
                        >${data.comments || ''}</textarea>
                    </div>
                    <div class="space-y-4">
                        <h3 class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Approvals</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            ${config.footerSignatures.map(role => `
                                <div class="border-t-2 border-slate-300 pt-2">
                                    <div class="h-8"></div>
                                    <p class="text-[9px] font-black uppercase text-slate-400">${role}</p>
                                </div>
                            `).join('')}
                        </div>
                        
                        ${canApprove ? `
                            <div class="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 print:hidden">
                                <h4 class="font-bold text-blue-900 text-sm mb-2">Validation Required</h4>
                                <div class="flex gap-3">
                                    <button id="approve-btn" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-bold shadow-md transition-all">
                                        Approve / Validate
                                    </button>
                                    <button id="reject-btn" class="flex-1 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 py-2 rounded-lg text-xs font-bold transition-all">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

window.bindFormEvents = function (appState, render) {
    const data = appState.formData;
    const user = appState.user;
    const isStoreMan = user.role === 'STORE_MAN';
    const isReviewer = user.role === 'REVIEWER';
    const isViewer = user.role === 'VIEWER';
    const canEditComments = isReviewer && data.approvalStatus === 'PENDING';
    const isDataLocked = isViewer || isStoreMan || data.approvalStatus === 'APPROVED' || data.approvalStatus === 'VALIDATED';
    const canApprove = (isReviewer || isStoreMan) && data.approvalStatus !== 'APPROVED';
    const canSave = !isDataLocked && !isReviewer && !isViewer && !isStoreMan;

    document.getElementById('back-btn').addEventListener('click', () => {
        appState.view = 'DASHBOARD';
        render();
    });

    if (canSave) {
        document.getElementById('save-btn').addEventListener('click', async () => {
            const btn = document.getElementById('save-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = `${window.getIcon('Loader', 16, 'animate-spin')} SAVING...`;
            btn.disabled = true;

            const payload = {
                id: appState.formData.id,
                type: appState.activeFormType,
                data: appState.formData, // We store the whole formData as 'data' JSON blob
                status: appState.formData.approvalStatus,
                created_by: user.username,
                approved_by: appState.formData.approvedBy,
                approved_at: appState.formData.approvedAt
            };

            const result = await window.api.saveForm(payload);

            if (result.success) {
                btn.innerHTML = `${window.getIcon('Check', 16)} SAVED`;
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 2000);
            } else {
                btn.innerHTML = 'ERROR';
                alert('Failed to save: ' + result.error);
                btn.disabled = false;
            }
        });
    }

    if (!isDataLocked) {
        // Inputs
        document.querySelectorAll('input[data-action="header-input"]').forEach(inp => {
            inp.addEventListener('input', (e) => {
                appState.formData.header[e.target.dataset.key] = e.target.value;
            });
        });

        document.querySelectorAll('textarea[data-action="row-input"], select[data-action="row-input"], input[data-action="row-input"]').forEach(inp => {
            inp.addEventListener('input', (e) => {
                const idx = parseInt(e.target.dataset.index);
                const key = e.target.dataset.key;
                let val = e.target.value;

                // Auto-uppercase for attendance
                if (e.target.dataset.type === 'attendance') {
                    val = val.toUpperCase();
                    e.target.value = val;

                    // Update classes
                    e.target.className = e.target.className.replace(/text-rose-600 bg-rose-50|text-emerald-600 bg-emerald-50|bg-transparent text-slate-700/g, '');
                    if (val === 'A') {
                        e.target.classList.add('text-rose-600', 'bg-rose-50');
                    } else if (val === 'P') {
                        e.target.classList.add('text-emerald-600', 'bg-emerald-50');
                    } else {
                        e.target.classList.add('bg-transparent', 'text-slate-700');
                    }
                }

                appState.formData.rows[idx][key] = val;

                if (appState.activeFormType === 'OVERTIME_CONTROL') {
                    const totals = window.calculateOvertime(appState.formData.rows[idx], appState.user.role, idx);
                    Object.assign(appState.formData.rows[idx], totals);

                    document.querySelectorAll(
                        `textarea[data-index="${idx}"][data-key="grandOtHours"],
                        textarea[data-index="${idx}"][data-key="totalEtb"]`
                    ).forEach(t => t.value = appState.formData.rows[idx][t.dataset.key]);
                }

                if (appState.activeFormType === 'MONTHLY_ATTENDANCE') {
                    const totals = window.calculateAttendance(appState.formData.rows[idx]);
                    Object.assign(appState.formData.rows[idx], totals);

                    document.querySelectorAll(
                        `textarea[data-index="${idx}"][data-key="tpd"],
                        textarea[data-index="${idx}"][data-key="tad"],
                        textarea[data-index="${idx}"][data-key="thl"]`
                    ).forEach(t => t.value = appState.formData.rows[idx][t.dataset.key]);
                }
            });
        });

        if (canEditComments) {
            document.getElementById('comments-input').addEventListener('input', (e) => {
                appState.formData.comments = e.target.value;
            });
        }

        document.getElementById('add-row-btn').addEventListener('click', () => {
            if (
                appState.activeFormType === 'OVERTIME_CONTROL' ||
                appState.activeFormType === 'MONTHLY_ATTENDANCE'
            ) return;

            appState.formData.rows.push({});
            render();
        });

        document.querySelectorAll('button[data-action="delete-row"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index);
                appState.formData.rows.splice(idx, 1);
                render();
            });
        });
    }

    if (canApprove) {
        document.getElementById('approve-btn').addEventListener('click', async () => {
            if (!confirm('Are you sure you want to approve this form?')) return;

            appState.formData.approvalStatus = isStoreMan ? 'VALIDATED' : 'APPROVED';
            appState.formData.approvedBy = user.name;
            appState.formData.approvedAt = new Date().toISOString();

            // Save immediately on approval
            const payload = {
                id: appState.formData.id,
                type: appState.activeFormType,
                data: appState.formData,
                status: appState.formData.approvalStatus,
                created_by: user.username, // Should be original creator, but we might lose it if we don't store it in appState.formData.created_by. 
                // Wait, appState.formData is just the JSON blob. 
                // The `forms` table has `created_by`. 
                // If I am REVIEWER, `created_by` in payload will set the column. 
                // I should probably fetch the original `created_by` or ensure it's in `appState.formData`.
                // In `loadSubmissions`, I merged `form.data` into `appState.formData`. 
                // But `form.data` (the JSON) might not have `created_by`. 
                // Use `appState.formData.created_by` if I added it there?
                // The `created_by` column is separate.
                // When "Presenter" saves, they are `user.username`.
                // When "Reviewer" saves (approves), they are NOT `created_by`.
                // I should pass the original creator.
                // Let's ensure `loadSubmissions` puts `created_by` into `appState.formData` or `appState`.
                // Modifying `dashboard.js` to include `created_by` in `formData` or keep it separate?
                // I will add `created_by` to `formData` in `dashboard.js` when loading. -> Done in dashboard lines 150-ish? 
                // Wait, in my dashboard rewrite I did: `appState.formData = { id: form.id, ...form.data, ... }`.
                // If `form.data` didn't have `created_by`, it's lost.
                // But `form` object from API has `created_by`.
                // I should add it.
                // In `dashboard.js` line 147: `appState.formData = { ..., createdBy: form.created_by }`
                // And here: `created_by: appState.formData.createdBy || user.username`
                created_by: appState.formData.createdBy || user.username,
                approved_by: appState.formData.approvedBy,
                approved_at: appState.formData.approvedAt
            };

            await window.api.saveForm(payload);
            render();
        });

        document.getElementById('reject-btn').addEventListener('click', async () => {
            if (!confirm('Reject this form?')) return;

            appState.formData.approvalStatus = 'REJECTED';
            // Save on reject
            const payload = {
                id: appState.formData.id,
                type: appState.activeFormType,
                data: appState.formData,
                status: appState.formData.approvalStatus,
                created_by: appState.formData.createdBy || user.username,
                approved_by: null,
                approved_at: null
            };
            await window.api.saveForm(payload);

            render();
        });
    }
}
