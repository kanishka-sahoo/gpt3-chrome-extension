// Get the API token input element
const apiTokenInput = document.getElementById('api-token');
const maxTokensInput = document.getElementById('maxTokensInput');
const temperatureInput = document.getElementById('temperatureInput');

// Load the API token from storage, if it exists
chrome.storage.sync.get(['apiToken'], (result) => {
  if (result.apiToken) {
    apiTokenInput.value = result.apiToken;
  }
});
chrome.storage.sync.get(['maxTokens'], (result) => {
  if (result.apiToken) {
    maxTokensInput.value = result.maxTokens;
  }
});
chrome.storage.sync.get(['temperature'], (result) => {
  if (result.apiToken) {
    temperatureInput.value = result.temperature;
  }
});


// Handle form submission
document.getElementById('api-token-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const apiToken = apiTokenInput.value;
  const maxTokens = maxTokensInput.value;
  const temperature = temperatureInput.value;
  // Store the API token in storage
  chrome.storage.sync.set({ apiToken: apiToken });
  chrome.storage.sync.set({ maxTokens: maxTokens });
  chrome.storage.sync.set({ temperature: temperature });
  alert(maxTokens);
  alert(temperature);
  // Close the options page
  window.close();
});
