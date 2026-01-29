window.appState = {
    user: null, // { name, role, email }
    view: 'LOGIN', // 'LOGIN', 'DASHBOARD', 'FORM'
    activeFormType: null,
    loginLoading: false,
    // Data for the active form
    formData: {
        header: {},
        rows: [],
        comments: '',
        approvalStatus: 'PENDING',
        approvedBy: null,
        approvedAt: null
    }
};
