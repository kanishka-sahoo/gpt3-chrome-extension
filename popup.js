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
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+apiToken
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a kind and helpful AI."},
          {"role": "user", "content": question}
        ], 
        max_tokens: 3000,
        temperature: 0.7,
        n: 1
      })
    });
    const data = await response.json();
    const answer = data.choices[0].message.content;
    answerDiv.textContent = answer;
    loaderDiv.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
});
