'use strict';
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [
  { 'joke': 'Dlaczego komputer poszedł do lekarza?', 'response': 'Bo złapał wirusa!' },
  { 'joke': 'Dlaczego komputer nie może być głodny?', 'response': 'Bo ma pełen dysk!' },
  { 'joke': 'Co mówi jeden bit do drugiego?', 'response': '„Trzymaj się, zaraz się przestawiamy!”' }
];

let lameJoke = [
  { 'joke': 'Dlaczego programiści preferują noc?', 'response': 'Bo w nocy jest mniej bugów do łapania!' },
  { 'joke': 'Jak nazywa się bardzo szybki programista?', 'response': 'Błyskawiczny kompilator!' }
];

app.get('/jokebook/categories', (req, res) => {
  res.json(categories);
});

app.get('/jokebook/joke/:category', (req, res) => {
  const category = req.params.category;
  let jokesArray;

  if (category === 'funnyJoke') jokesArray = funnyJoke;
  else if (category === 'lameJoke') jokesArray = lameJoke;
  else return res.status(400).json({ error: `no jokes for category ${category}` });

  const randomIndex = Math.floor(Math.random() * jokesArray.length);
  res.json(jokesArray[randomIndex]);
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Jokebook</title>
      </head>
      <body>
        <h1>Jokebook Test</h1>
        <button id="getCategories">Pobierz kategorie</button>
        <ul id="categoriesList"></ul>

        <input id="categoryInput" placeholder="Wpisz kategorię">
        <button id="getJoke">Pobierz losowy żart</button>
        <p id="jokeOutput"></p>

        <script>
          const categoriesList = document.getElementById('categoriesList');
          const jokeOutput = document.getElementById('jokeOutput');

          document.getElementById('getCategories').addEventListener('click', () => {
            fetch('/jokebook/categories')
              .then(res => res.json())
              .then(data => {
                categoriesList.innerHTML = '';
                data.forEach(cat => {
                  const li = document.createElement('li');
                  li.textContent = cat;
                  categoriesList.appendChild(li);
                });
              });
          });

          document.getElementById('getJoke').addEventListener('click', () => {
            const category = document.getElementById('categoryInput').value;
            fetch('/jokebook/joke/' + category)
              .then(res => res.json())
              .then(data => {
                if(data.error) jokeOutput.textContent = data.error;
                else jokeOutput.textContent = data.joke + ' - ' + data.response;
              });
          });
        </script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
