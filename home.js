/**
 * home.js 
 * Responsibility: UI State & Button Styling
 */

const updateTabUI = (activeTab) => {
    const tabs = ['all', 'open', 'closed'];
    
    // DaisyUI classes for Active vs Inactive buttons
    const activeClasses = ["btn-primary", "text-white"];
    const inactiveClasses = ["btn-outline", "bg-white", "text-gray-700"];

    tabs.forEach(t => {
        const btn = document.getElementById(`${t}-tab`);
        if (!btn) return;
        
        if (t === activeTab) {
            btn.classList.add(...activeClasses);
            btn.classList.remove(...inactiveClasses);
        } else {
            btn.classList.remove(...activeClasses);
            btn.classList.add(...inactiveClasses);
        }
    });
};

// Export to window so script.js can call it
window.updateTabUI = updateTabUI;