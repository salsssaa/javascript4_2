'use strict';
const express = require('express');
const app = express();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
