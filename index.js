const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
const botToken = process.env.BOT_TOKEN

dotenv.config()

try {
    // bot variable that initializes a new SlackBot instance which has 2 values
    console.log(botToken)
    // const bot = new SlackBot({
    //     // token: `${process.env.BOT_TOKEN}`,
    //     token: botToken,
    //     name: 'Magic Service'
    // })
} catch (error) {
    console.log("there was an error")
}


// create bot start handler
// bot.on('start', () => {
//     const params = {
//         icon_emoji: ':robot_face:'
//     }

//     // initialize bot.postMessageToChannel function which is a SlackBot.js method to post a message to the channel
//     bot.postMessageToChannel(
//         'random', // the channel name we want to post to
//         'Get inspired while working with @MagicService',
//         params // emoji
//     );
// })