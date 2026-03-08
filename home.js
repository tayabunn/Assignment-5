const updateTabUI = (activeTab) => {
    const tabs = ['all', 'open', 'closed'];
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
window.updateTabUI = updateTabUI;