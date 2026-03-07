const switchTab = (tab) => {
    // manageSpinner(true); 
    currentActiveTab = tab; 

    const tabs = ['all', 'open', 'closed'];
    
    // Define state classes for easier maintenance
    const activeClasses = ['bg-blue-600', 'text-white', 'border-transparent', 'btn-primary'];
    const inactiveClasses = ['bg-white', 'text-gray-700', 'border', 'border-gray-300'];

    tabs.forEach(t => {
        const btn = document.getElementById(`${t}-tab`);
        if (!btn) return; // Safety check

        if (t === tab) {
            btn.classList.add(...activeClasses);
            btn.classList.remove(...inactiveClasses);
        } else {
            btn.classList.add(...inactiveClasses);
            btn.classList.remove(...activeClasses);
        }
    });
    
    // Optional: Call your display function here to filter the list
    // filterAndRenderIssues(tab); 
}


// // Create card HTML
// const createIssueCardHtml = (issue, index) => {
//   const priority = issue.priority || "HIGH";
//   const issueTitle = issue.title || "Fix navigation menu on mobile devices";
//   const issueBody =
//     issue.body ||
//     "The navigation menu doesn't collapse properly on mobile devices...";
//   const createdAt =
//     issue.createdAt ||
//     new Date(Date.now() - index * 86400000).toLocaleDateString("en-US");
//   const author = issue.author || "john_doe";

//   return `
//     <div class="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">

//       <div class="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-emerald-400"></div>

//       <div class="flex items-center justify-between">
//         <span class="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-600">
//           <img src="./assets/circle.png" alt="circle" class="h-5 w-5">
//         </span>

//         <span class="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
//           ${priority}
//         </span>
//       </div>

//       <h3 class="mt-4 text-base font-semibold text-gray-900">
//         ${issueTitle}
//       </h3>

//       <p class="mt-2 text-sm text-gray-500">
//         ${issueBody}
//       </p>

//       <div class="badge badge-outline bg-red-100 border-red-500 border py-3 mt-3 font-medium text-[#EF4444]">
//         <img src="./assets/bug.png"> BUG
//       </div>

//       <div class="badge badge-outline bg-yellow-100 border-amber-500 border py-3 mt-3 font-medium text-[#D97706]">
//         <img src="./assets/help-wanted.png"> HELP WANTED
//       </div>

//       <div class="mt-4 flex items-center justify-between text-xs text-gray-500">
//         <span>#${index + 1} by ${author}</span>
//         <span>${createdAt}</span>
//       </div>

//     </div>
//   `;
// };



// // Render issues
// const displayIssues = (issues = []) => {
//   const container = document.getElementById("issues-container");
//   if (!container) return;

//   container.innerHTML = "";

//   const cardsToRender = 20;
//   const issuesToRender = issues.length
//     ? issues.slice(0, cardsToRender)
//     : Array.from({ length: cardsToRender }, () => ({}));

//   issuesToRender.forEach((issue, index) => {
//     container.insertAdjacentHTML("beforeend", createIssueCardHtml(issue, index));
//   });
// };



// Load when page opens
document.addEventListener("DOMContentLoaded", () => {
  displayIssues();
});

const filterAndDisplay = () => {
    let filteredData = allIssues;
    if (currentActiveTab !== 'all') {
        filteredData = allIssues.filter(issue => issue.status.toLowerCase() === currentActiveTab);
    }

    document.getElementById('issue-count-text').innerText = `${filteredData.length} Issues`;
    displayIssues(filteredData);
};


