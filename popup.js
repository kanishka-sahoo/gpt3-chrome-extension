const form = document.getElementById('question-form');
const questionInput = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const loaderDiv = document.getElementById('loader');
let notificationTimeout = null;
let apiTokenInput = null;
let temperature = null;
let maxTokens = null;

chrome.storage.sync.get(['apiToken'], (result) => {
  if (result.apiToken) {
    apiTokenInput = result.apiToken;
  }
  else {
    chrome.runtime.openOptionsPage();
  }
});

chrome.storage.sync.get(['maxTokens'], (result) => {
  if (result.maxTokens) {
    maxTokens = result.maxTokens;
  }
  else {
    chrome.runtime.openOptionsPage();
  }
});

chrome.storage.sync.get(['temperature'], (result) => {
  if (result.temperature) {
    temperature = result.temperature;
  }
  else {
    chrome.runtime.openOptionsPage();
  }
});


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const question = questionInput.value;
  answerDiv.textContent = '';
  loaderDiv.style.display = 'block';
  const apiToken = apiTokenInput;
  alert(maxTokens);
  // Store the API token in storage
  chrome.storage.sync.set({ apiToken: apiToken });
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+apiToken
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Question: ${question}\nAnswer:`,
        max_tokens: Number(maxTokens),
        temperature: Number(temperature),
        n: 1
      })
    });
    const data = await response.json();
    const answer = data.choices[0].text;
    answerDiv.textContent = answer;
    loaderDiv.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
});
