const SlackBot = require('slackbots');
// const axios = require('axios');
const dotenv = require('dotenv');
// const { createEventAdapter } = require('@slack/events-api');
// const { WebClient } = require('@slack/web-api');
const { App } = require('@slack/bolt');

dotenv.config()

    const bot = new App ({
        token: `${process.env.SLACK_BOT_TOKEN}`,
        signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
        name: 'Magic Service'
    });

    // validation message
    (async () => {
        const port = 3000
        // Start bot
        await bot.start(process.env.PORT || port);
        console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
    })();

    const params = {
        icon_emoji: ':robot_face:'
    }

    const channel = {
        channel: "random"
    }
    try {
        bot.client.chat.postMessage({
            channel: `random`,
            text: `Get inspired while working with @MagicService!`
        })
    } catch (error) {
        console.log("there was an error")
    }
