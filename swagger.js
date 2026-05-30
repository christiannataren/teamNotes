const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();
const { env } = require('node:process');

const doc = {
    security: [{ bearerAuth: [] }],
    info: {
        title: 'Team Notes',
        description: 'Create notes and shared them with your team'
    },
    // securityDefinitions: {
    //     bearerAuth: {
    //         type: 'apiKey',       // must be 'apiKey' for OAS 2.0
    //         in: 'header',
    //         name: 'Authorization' // must match the actual header name exactly
    //     }
    // },

    // host: 'teamnotes-djf1.onrender.com',
    // schemes: ["https"]
    host: 'localhost:8080',
    schemes: ["http"]

};

const outputFile = './swagger-output.json';
const routes = [
    './server.js'
]

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
