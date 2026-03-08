/**
 * script.js - Labels Integrated
 */

let allIssues = []; 

const getPriorityStyles = (priority) => {
    const p = (priority || 'low').toLowerCase();
    if (p === 'high') return 'bg-red-500';
    if (p === 'medium') return 'bg-amber-500';
    return 'bg-slate-500'; 
};

// 1. Fetch Data
const loadInitialData = () => {
    const container = document.getElementById('issues-container');
    container.innerHTML = `<div class="col-span-full flex justify-center py-20"><span class="loading loading-spinner loading-lg text-primary"></span></div>`;
    
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(response => response.json())
        .then(json => {
            const rawData = json.data || json; 
            if (Array.isArray(rawData)) {
                allIssues = rawData;
                displayIssues(allIssues);
            }
        })
        .catch(err => {
            console.error("Fetch failed:", err);
            container.innerHTML = `<p class="col-span-full text-center text-red-500 font-bold">Network Error.</p>`;
        });
};

// 2. Display with Labels
const displayIssues = (issues) => {
    const container = document.getElementById('issues-container');
    const countEl = document.getElementById('totalCount');
    if (countEl) countEl.innerText = `${issues.length} Issues`;
    
    if (container) {
        container.innerHTML = issues.length === 0 
            ? `<div class="col-span-full text-center py-10 text-gray-400">No results found.</div>`
            : issues.map(issue => createIssueCardHtml(issue)).join('');
    }
};

// 3. Card Generator (Added Labels)
const createIssueCardHtml = (issue) => {
    const status = (issue.status || 'open').toLowerCase();
    const priority = (issue.priority || 'low').toLowerCase();
    const id = issue._id || issue.id || '0000';
    
    // Labels Logic: Map through labels and create small badges
    const labelsHtml = (issue.labels || [])
        .map(label => `<span class="badge badge-outline text-[9px] font-bold opacity-60">${label}</span>`)
        .join('');

    return `
    <div onclick="openIssueModal('${id}')" class="group relative cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
        <div class="absolute inset-x-0 top-0 h-1 rounded-t-2xl ${status === 'open' ? 'bg-emerald-400' : 'bg-violet-400'}"></div>
        <div class="flex items-center justify-between">
          <span class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
            <img src="./assets/circle.png" class="h-4 w-4" onerror="this.src='https://cdn-icons-png.flaticon.com/512/5720/5720434.png'">
          </span>
          <span class="rounded-full px-3 py-1 text-[10px] font-black text-white ${getPriorityStyles(priority)}">
            ${priority.toUpperCase()}
          </span>
        </div>
        <h3 class="mt-4 text-base font-bold text-gray-900 line-clamp-1">${issue.title || 'Untitled'}</h3>
        
        <div class="flex flex-wrap gap-1 mt-2 mb-2">
            ${labelsHtml}
        </div>

        <p class="text-xs text-gray-500 line-clamp-2">${issue.description || 'No description'}</p>
        <div class="mt-6 flex items-center justify-between text-[10px] font-bold text-gray-400 border-t pt-4 border-gray-50">
          <span>#${id.toString().slice(-4)} by ${issue.author || 'User'}</span>
          <span>${issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : ''}</span>
        </div>
    </div>`;
};

// 4. Modal (Added Labels)
const openIssueModal = (id) => {
    const modal = document.getElementById('issue_details_modal');
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(result => {
            const issue = result.data || result;
            const status = (issue.status || 'open').toLowerCase();

            document.getElementById('modalHeaderStrip').className = `h-2 w-full ${status === 'open' ? 'bg-emerald-400' : 'bg-violet-400'}`;
            document.getElementById('modalStatus').innerText = status;
            document.getElementById('modalStatus').className = `text-white text-[10px] font-black px-3 py-1 rounded-full uppercase ${status === 'open' ? 'bg-emerald-500' : 'bg-violet-500'}`;
            document.getElementById('modalTitle').innerText = issue.title || '';
            document.getElementById('modalDescription').innerText = issue.description || '';
            document.getElementById('modalAuthor').innerText = issue.author || '';
            document.getElementById('modalAssignee').innerText = issue.assignee || 'Unassigned';
            
            // Render Labels in Modal
            const modalLabelsContainer = document.getElementById('modalLabels');
            if(modalLabelsContainer) {
                modalLabelsContainer.innerHTML = (issue.labels || [])
                    .map(l => `<span class="badge badge-primary badge-outline font-bold">${l}</span>`)
                    .join('');
            }

            const prioBadge = document.getElementById('modalPriority');
            prioBadge.innerText = (issue.priority || 'low').toUpperCase();
            prioBadge.className = `text-white text-[10px] px-3 py-1 rounded font-black ${getPriorityStyles(issue.priority)}`;

            modal.showModal();
        });
};

const switchTab = (tab) => {
    if (window.updateTabUI) window.updateTabUI(tab);
    const filtered = (tab === 'all') ? allIssues : allIssues.filter(i => (i.status || 'open').toLowerCase() === tab.toLowerCase());
    displayIssues(filtered);
};

document.addEventListener('DOMContentLoaded', () => {
    loadInitialData();
});

window.switchTab = switchTab;
window.openIssueModal = openIssueModal;