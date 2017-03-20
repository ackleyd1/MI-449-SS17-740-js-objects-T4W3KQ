// A couple jokes to start with
var jokes = window.localStorage.getItem('jokes')
if (jokes) {
  jokes = JSON.parse(jokes)
} else {
  jokes = {
    'the horse': {
      setup: 'A horse walks into the bar. The bartender asks...',
      punchline: 'Why the long face?'
    },
    'Orion\'s pants': {
      setup: 'How does Orion keep his pants up?',
      punchline: 'With an asteroid belt.'
    }
  }
  var stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
}

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requestedJokeInput')
var requestedJokeSetup = document.getElementById('requestedJokeSetup')
var requestedJokePunchline = document.getElementById('requestedJokePunchline')
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

var updateDisplayedJoke = function () {
  stringifiedJokes = window.localStorage.getItem('jokes')
  jokes = JSON.parse(stringifiedJokes)
  var requestedJokeKey = requestedJokeInput.value
  if (requestedJokeKey && jokes[requestedJokeKey]) {
    requestedJokeSetup.textContent = jokes[requestedJokeKey].setup
    requestedJokePunchline.textContent = jokes[requestedJokeKey].punchline
  } else {
    requestedJokeSetup.textContent = 'No matching joke found.'
    requestedJokePunchline.textContent = ''
  }
}

var deleteJokeButton = document.getElementById('deleteJokeButton')
var deleteJokeInput = document.getElementById('deleteJokeInput')

var deleteJoke = function () {
  stringifiedJokes = window.localStorage.getItem('jokes')
  jokes = JSON.parse(stringifiedJokes)
  var deleteJokeKey = deleteJokeInput.value
  if (deleteJokeKey && jokes[deleteJokeKey]) {
    delete jokes[deleteJokeKey]
    stringifiedJokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokes', stringifiedJokes)
    updatePage()
  }
}

var newJokeKey = document.getElementById('newJokeKey')
var newJokeSetup = document.getElementById('newJokeSetup')
var newJokePunchline = document.getElementById('newJokePunchline')
var newJokeButton = document.getElementById('newJokeButton')

var newJoke = function () {
  stringifiedJokes = window.localStorage.getItem('jokes')
  jokes = JSON.parse(stringifiedJokes)
  newJokeKey = newJokeKey.value
  newJokeSetup = newJokeSetup.value
  newJokePunchline = newJokePunchline.value

  var newJokeTemp = {
    setup: newJokeSetup,
    punchline: newJokePunchline
  }
  jokes[newJokeKey] = newJokeTemp
  stringifiedJokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', stringifiedJokes)
  updatePage()
}
// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}
// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
deleteJokeButton.addEventListener('click', deleteJoke)
newJokeButton.addEventListener('click', newJoke)
