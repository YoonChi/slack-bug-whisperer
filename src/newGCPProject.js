const { App } = require('@slack/bolt');
const { Resource } = require('@google-cloud/resource-manager');
const keyPath = './keys/finops-bot-sa-key.json'
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config()

const app = new App({
    token: `${process.env.SLACK_BOT_TOKEN}`,
    signingSecret: `${process.env.SLACK_SIGNING_SECRET}`,
    name: 'Magic Service'
  });
  
    // validation message
    // (async () => {
    //     const port = 3001
    //     // Start bot
    //     await app.start(process.env.PORT || port);
    //     console.log(`⚡️ Slack Bot app is running on port ${port}!`);
    // })();

    const projectIdPrefix = 'finops-bot';

    function generateRandomProjectId() {
        const randomId = Math.random().toString(36).substr(2,5);
    }
    
    function createGCPProject() {
        app.command('/create-project', async ({ command, ack, say }) => {
            ack(); // Acknowledge the command request immediately
            
            try {
            const userId = command.user_id;
            const projectId = generateRandomProjectId();
        
            // Use interactive message to gather more information from users (e.g., billing account)
            const result = await app.client.chat.postMessage({
                token: `${process.env.SLACK_BOT_TOKEN}`,
                channel: command.channel_id,
                text: `To create a new GCP project, please provide the following information:\n
                Project Name: ${projectId}\n
                Billing Account: _Please select a billing account from the dropdown._`,
                blocks: [
                {
                    type: 'input',
                    block_id: 'billing_account',
                    label: {
                    type: 'plain_text',
                    text: 'Billing Account',
                    },
                    element: {
                    type: 'external_select',
                    action_id: 'billing_account_selection',
                    placeholder: {
                        type: 'plain_text',
                        text: 'Select a billing account',
                    },
                    },
                },
                ],
            });
        
            console.log('Interactive message sent:', result);
            } catch (error) {
            console.error('Error sending interactive message:', error);
            say('An error occurred while creating the project. Please try again.');
            }
        });
      
        // Listen for interactive message submission
        app.action('billing_account_selection', async ({ body, ack }) => {
            ack(); // Acknowledge the interactive message submission
        
            try {
            const selectedBillingAccount = body.actions[0].selected_option.value;
            const projectId = body.message.text.split('Project Name: ')[1].split('\n')[0];
        
            // Create the GCP project using the Google Cloud Resource Manager
            const resourceManager = new Resource();
            const [project] = await resourceManager.createProject(projectId, {
                name: projectId,
                billingAccountName: selectedBillingAccount,
                projectNumber: `PROJECT-${Math.floor(Math.random() * 1000000)}`, // Generate a random project number
            });
        
            console.log('GCP Project created:', project);
            app.client.chat.postMessage({
                token: `${process.env.SLACK_BOT_TOKEN}`,
                channel: body.channel.id,
                text: `GCP project ${projectId} created successfully!`,
            });
            } catch (error) {
            console.error('Error creating GCP project:', error);
            app.client.chat.postMessage({
                token: `${process.env.SLACK_BOT_TOKEN}`,
                channel: body.channel.id,
                text: 'An error occurred while creating the project. Please try again.',
            });
            }
        });
      
        (async () => {
            // Start the app
            await app.start(process.env.PORT || 3000);
        
            console.log('Slackbot is running!');
        })();
    }

        console.log("testing");

        module.exports = generateRandomProjectId;
        module.exports = createGCPProject;
        
