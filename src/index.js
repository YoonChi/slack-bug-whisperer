const SlackBot = require('slackbots');
const axios = require('axios');
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

    const channel = { channel: "random" }

    function postMessageToRandomChannel() {
        try {
            bot.client.chat.postMessage({
                channel: `random`,
                text: `Get inspired while working with @MagicService!`
            })
        } catch (error) {
            console.log("there was an error")
        }
    }


    function handleMessage(message) {
        if(message.includes(' inspire me')) {
            inspireMe()
        } else if(message.includes(' random joke')) {
            randomJoke()
        } else if(message.includes(' help')) {
            runHelp()
        }
    }

    // use axios to get the json file to return data
    function inspireMe() {
        axios.get('https://raw.githubusercontent.com/YoonChi/slack-bug-whisperer/main/quotes.json')
          .then(res => {
                const quotes = res.data; // returned data
                const random = Math.floor(Math.random() * quotes.length); // generate random number out of x number of quotes
                const quote = quotes[random].quote // get random quote 
                const author = quotes[random].author // get random quote's author name
    
                // const params = {
                //     icon_emoji: ':male-technologist:'
                // }
            
                bot.client.chat.postMessage({
                    channel: `random`,
                    text: `:zap: ${quote} - *${author}*`,
                    icon_emoji: ':male-technologist:'
                }
                );
          })
    }
    
    inspireMe();
    // // Testing
     // postMessageToRandomChannel()

