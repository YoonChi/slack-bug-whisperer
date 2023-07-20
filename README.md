# slack-bug-whisperer
practicing nodejs with freecodecamp

## Pre-reqs
- a slack account


## Installation
- Install [Node.js](https://nodejs.org/en) and npm
  - Node.js comes with npm


## Initial Setup Instructions:
- create an index.js file (entrypoint)
`touch index.js`
- initialize npm
`npm init`

## Install Dependencies
`npm install slackbots`
- this is a node.js library for Slack API
`npm install axios`
- a promise-based HTTP client for browser & node.js
- `npm install -g nodemon`

### Next Steps:
- roadblock: having auth issues . 
  - troubleshoot: grab new token key

## Troubleshooting:
`curl -d "text=Hi." -d "channel=random" -H "Authorization: Bearer $token" -X POST https://ateam-3cj6816.slack.com/api/chat.postMessage` 
- expected output: post a message, "Hi" to channel called, `#random`.
- validated: true
- concerns: the key is set as a local environment variable, "token", and it works when token is passed to the curl statement. However, it does not work passing the hard-coded token value to SlackBot constructor.
