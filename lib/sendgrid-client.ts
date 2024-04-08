const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

export default client;
