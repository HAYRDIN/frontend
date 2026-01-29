// Imports removed. Using globals.

const app = document.getElementById('app');

function render() {
    app.innerHTML = '';

    if (window.appState.view === 'LOGIN') {
        app.innerHTML = window.getLoginHTML();
        window.bindLoginEvents(window.appState, render);
    } else if (window.appState.view === 'DASHBOARD') {
        app.innerHTML = window.getDashboardHTML(window.appState);
        window.bindDashboardEvents(window.appState, render);
    } else if (window.appState.view === 'FORM') {
        app.innerHTML = window.getFormHTML(window.appState);
        window.bindFormEvents(window.appState, render);
    }
}


// Initial Render
render();
