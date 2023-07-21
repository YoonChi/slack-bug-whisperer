// const SlackBot = require('slackbots');
const axios = require('axios');
const dotenv = require('dotenv');
// const { createEventAdapter } = require('@slack/events-api');
// const { WebClient } = require('@slack/web-api');
const { App } = require('@slack/bolt');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

const keyPath = './keys/finops-bot-sa-key.json'

dotenv.config()

    const bot = new App ({
        token: `${process.env.SLACK_BOT_TOKEN}`,
        signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
        name: 'Magic Service'
    });

    // validation message
    (async () => {
        const port = 3002
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
        }
    }

        // use axios to get the json file to return data every time user requests it
    function inspireMe() {
        axios.get('https://raw.githubusercontent.com/YoonChi/slack-bug-whisperer/main/src/quotes.json')
          .then(res => { 
                const quotes = res.data; // returned data
                const random = Math.floor(Math.random() * quotes.length); // generate random number out of x number of quotes
                const quote = quotes[random].quote // get random quote 
                const author = quotes[random].author // get random quote's author name
            
                bot.client.chat.postMessage({
                    channel: `random`,
                    text: `:zap: ${quote} - *${author}*`,
                    icon_emoji: ':male-technologist:' // needs chat:write.customize scope
                }
                );
          })
    }

    // const apiKey = process.env.GCP_API_KEY
    // const baseUrl = 'https://cloudbilling.googleapis.com/v1/';
    // const projectName = "finops-bot"
    // const url = `${baseUrl}projects/${projectName}/billingInfo?key=${apiKey}`;
    
    // function callGCPBillingBudgetsAPI() {
    //     axios.get(url)
    //         .then(response => {
    //             console.log('Billing info:', response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching billing info:', error.message)
    //         })
    // }
    // ---------------------------------------- //

    // const auth = new google.auth.GoogleAuth({
    //     keyFile: keyPath,
    //     scopes: [
    //         'https://www.googleapis.com/auth/cloud-platform', 'https://recommender.googleapis.com', 'https://www.googleapis.com/auth/compute'], 
    // });
    
    async function listProjects() {
        const cloudresourcemanager = google.cloudresourcemanager(
            {
                version: 'v1',
                auth,
            }
        );
        const res = await cloudresourcemanager.projects.list();
        console.log('Projects:', res.data.projects);
    }

    async function listRecommendations() {
        const recommender = google.recommender({
            version: 'v1',
            auth,
        });
    }


    // ---------------------------------------- //
    const auth = new google.auth.GoogleAuth({
        keyFile: keyPath,
        scopes: [
            'https://www.googleapis.com/auth/cloud-platform', 'https://recommender.googleapis.com', 'https://www.googleapis.com/auth/compute'], 
    });
    
    const compute = require('@google-cloud/compute');
    const projectId  = "finops-bot"

    async function listInstances() {
        const compute = google.compute(
            {
                version: 'v1',
                auth,
            }
        );
        // const res = compute.instances.getInstance({
        //     instance: 'bugslife',
        //     project: 'finops-bot',
        //     zone: 'us-central1-a'
        // });
        // const instances = res.data.items;

        // console.log('List of instances:', instances);
    }

    // ---------------------------------------- //
//     async function getInstances() {
//         const projectId = 'finops-bot';
//         const computeEndpoint = `https://compute.googleapis.com/compute/v1/projects/${projectId}/aggregated/instances`;

//         try {
//             // Create a GoogleAuth client to obtain an access token
//             const auth = new GoogleAuth();
//             const accessToken = await auth.getAccessToken();
//             console.log("accessToken: ", accessToken);

//             // Make the API request using axios
//             const response = await axios.get(computeEndpoint, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//             });

//             // Process the API response
//             console.log(response.data);
//             } catch (error) {
//                 console.error('Error retrieving instances:', error.message);
//             }
//         }

// getInstances();


// ******** TESTING ******** //
    // postMessageToRandomChannel()
    // inspireMe();
    // listProjects();
    // listInstances();


    const newProject = require('./newGCPProject')
    newProject(); 
    console.log("end");