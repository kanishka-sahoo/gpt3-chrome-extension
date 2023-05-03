// Get the API token input element
const apiTokenInput = document.getElementById('api-token');

// Load the API token from storage, if it exists
chrome.storage.sync.get(['apiToken'], (result) => {
  if (result.apiToken) {
    apiTokenInput.value = result.apiToken;
  }
});

// Handle form submission
document.getElementById('api-token-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const apiToken = apiTokenInput.value;

  // Store the API token in storage
  chrome.storage.sync.set({ apiToken: apiToken });

  // Close the options page
  window.close();
});
