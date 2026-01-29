// Automatically use the correct API URL based on environment
// In production (Render), use the same domain. In development, use localhost:3000
const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : `${window.location.origin}/api`;

window.api = {
    async login(username, password) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            return await response.json();
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, message: "Network Error" };
        }
    },

    async fetchForms(type, role, username) {
        try {
            // Build query params
            const params = new URLSearchParams();
            if (type) params.append('type', type);
            if (role) params.append('role', role);
            if (username) params.append('username', username);

            const response = await fetch(`${API_URL}/forms?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch forms');
            return await response.json();
        } catch (error) {
            console.error("Fetch Forms Error:", error);
            return [];
        }
    },

    async saveForm(formData) {
        try {
            const response = await fetch(`${API_URL}/forms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            return await response.json();
        } catch (error) {
            console.error("Save Form Error:", error);
            return { success: false, error: error.message };
        }
    }
};
