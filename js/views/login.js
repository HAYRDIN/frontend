window.getLoginHTML = function () {
    return `
    <div class="min-h-screen flex items-center justify-center p-4 bg-slate-900 font-sans">
        <div class="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div class="bg-white p-8 text-center">
                <img src="css/logo.jpg" alt="ECWC Rising Hongfa Logo" class="w-full max-w-sm mx-auto mb-4">
                <p class="text-slate-600 text-sm opacity-80 uppercase tracking-widest font-bold">Portal Access</p>
            </div>
            <div class="p-8 space-y-5">
                <form id="login-form">
                    <div class="space-y-1">
                        <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Account username</label>
                        <div class="relative">
                            <div class="absolute left-4 top-4 text-slate-400">${window.getIcon('Mail', 18)}</div>
                            <input id="login-username"
                                type="text"
                                placeholder="username"
                                class="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-xl">
                        </div>
                    </div>
                    <div class="space-y-1">
                        <label class="text-[10px] font-black text-slate-400 uppercase ml-1">Password</label>
                        <input id="login-password" type="password" placeholder="••••••••"
                            class="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                    </div>
                    <div id="login-error" class="hidden text-red-500 text-xs font-bold text-center"></div>
                    <button id="login-btn" type="submit" class="w-full bg-blue-600 text-white py-4 rounded-xl mt-4 hover:bg-blue-700 transition-colors">
                        Sign In
                    </button>
                </form>
            </div>

            <div class="p-8 pt-0 border-t border-slate-100 mt-0">
                <p class="text-[10px] font-black text-slate-300 uppercase mb-4 tracking-tighter">Authorized Profiles</p>
                <div class="grid grid-cols-1 gap-2">
                    <!-- We can create users via API, listing them here statically might be misleading if they don't exist in DB yet, but we seeded them. -->
                     <div class="user-card flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 cursor-pointer transition-colors" data-username="presenter1">
                        <div><div class="text-[11px] font-black text-slate-700">Presenter One</div><div class="text-[9px] text-slate-400 font-medium">presenter1</div></div><span class="text-[8px] font-black bg-white px-2 py-1 rounded border border-slate-200 uppercase">PRESENTER</span>
                    </div>
                    <div class="user-card flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 cursor-pointer transition-colors" data-username="reviewer">
                        <div><div class="text-[11px] font-black text-slate-700">Senior Reviewer</div><div class="text-[9px] text-slate-400 font-medium">reviewer</div></div><span class="text-[8px] font-black bg-white px-2 py-1 rounded border border-slate-200 uppercase">REVIEWER</span>
                    </div>
                    <div class="user-card flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-blue-200 cursor-pointer transition-colors" data-username="finance">
                        <div><div class="text-[11px] font-black text-slate-700">Finance Officer</div><div class="text-[9px] text-slate-400 font-medium">finance</div></div><span class="text-[8px] font-black bg-white px-2 py-1 rounded border border-slate-200 uppercase">FINANCE</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

window.bindLoginEvents = function (appState, render) {
    // Quick fill helper
    document.querySelectorAll('.user-card').forEach(el => {
        el.addEventListener('click', () => {
            document.getElementById('login-username').value = el.dataset.username;
            document.getElementById('login-password').value = 'presenter123'; // Default password for ease
            if (el.dataset.username === 'reviewer') document.getElementById('login-password').value = 'reviewer123';
            if (el.dataset.username === 'finance') document.getElementById('login-password').value = 'finance123';
            document.getElementById('login-password').focus();
        });
    });

    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById('login-username');
            const passwordInput = document.getElementById('login-password');
            const errorDiv = document.getElementById('login-error');
            const loginBtn = document.getElementById('login-btn');

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !password) {
                errorDiv.textContent = 'Please enter both username and password';
                errorDiv.classList.remove('hidden');
                return;
            }

            try {
                const originalText = loginBtn.textContent;
                loginBtn.textContent = 'Logging in...';
                loginBtn.disabled = true;
                errorDiv.classList.add('hidden');

                const response = await window.api.login(username, password);

                if (response.success) {
                    // Update App State
                    window.appState.user = response.user;
                    window.appState.view = 'DASHBOARD';
                    if (render) render();
                } else {
                    errorDiv.textContent = response.message || 'Invalid credentials';
                    errorDiv.classList.remove('hidden');
                    loginBtn.textContent = originalText;
                    loginBtn.disabled = false;
                }
            } catch (err) {
                console.error(err);
                errorDiv.textContent = 'Login failed. Please try again.';
                errorDiv.classList.remove('hidden');
                loginBtn.disabled = false;
                loginBtn.textContent = 'Sign In';
            }
        });
    }
}
