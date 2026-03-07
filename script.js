let allIssues = [];
let currentActiveTab = 'all';

const loadIssues = () => {
    manageSpinner(true);

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then((json) => {
        allIssues = json.data || [];
        displayIssues(allIssues);
        manageSpinner(false);
    })
    .catch((err) => {
        console.error('Failed to load issues:', err);
        displayIssues(allIssues);
        manageSpinner(false);
    });
}

const loadIssueDetail = (id) => {
  manageSpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then(res => res.json())
    .then((details) => {
      displayIssueDetails(details.data);
      manageSpinner(false);
    })
    .catch((err) => {
      console.error('Failed to load issue detail:', err);
      manageSpinner(false);
    });
};

const loadInitialData = () => {
    manageSpinner(true);
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then((json) => {
            allIssues = json.data;
            filterAndDisplay();   
            manageSpinner(false);  
        })
        .catch(err => {
            console.error("Fetch Error:", err);
            manageSpinner(false);
        });
};


document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchText = e.target.value;
    if (searchText.length > 0) {
        manageSpinner(true);
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`) 
            .then(res => res.json())
            .then(json => {
                allIssues = json.data || [];
                filterAndDisplay();
                manageSpinner(false);
            });
    } else {
        loadInitialData(); 
    }
});



