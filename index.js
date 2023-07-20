const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const { App } = require('@slack/bolt');

dotenv.config()

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
    const port = 3000
    // Start app
    await app.start(process.env.PORT || port);
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
  })();


// try {
    console.log("A")
    const bot = new App ({
        token: `${process.env.SLACK_BOT_TOKEN}`,
        signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
        name: 'Magic Service'
    })

    // bot.on('start', () => {
        const params = {
            icon_emoji: ':robot_face:'
        }
    // initialize bot.postMessageToChannel function which is a SlackBot.js method to post a message to the channel
    bot.client.chat.postMessage(
        'random', // the channel name we want to post to
        'Get inspired while working with @MagicService'
        // params
    );
    // })
// } catch (error) {
//     console.log("there was an error")
// }
