const form = document.getElementById('question-form');
const questionInput = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const loaderDiv = document.getElementById('loader');
let notificationTimeout = null;
let apiTokenInput = null;

chrome.storage.sync.get(['apiToken'], (result) => {
  if (result.apiToken) {
    apiTokenInput = result.apiToken;
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
  // Store the API token in storage
  chrome.storage.sync.set({ apiToken: apiToken });

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+apiToken
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Question: ${question}\nAnswer:`,
      max_tokens: 1000,
      temperature: 0.7,
      n: 1
    })
  });
  const data = await response.json();
  const answer = data.choices[0].text;
  answerDiv.textContent = answer;
  loaderDiv.style.display = 'none';
  clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    const notification = new Notification('GPT-3 Answer', {
      body: answer
    });
  }, 5000);
});

window.addEventListener('unload', () => {
  if (answerDiv.textContent && document.visibilityState === 'hidden') {
    const notification = new Notification('GPT-3 Answer', {
      body: answerDiv.textContent
    });
  }
});
