/* eslint no-console: ["error", { allow: ["log"] }] */

/**
 * Import necessary node modules
 */
const express = require('express');
const morgan = require('morgan');

/**
 * Import necessary local modules
 */
const lib = require('./lib');

const app = express();                      // create instance
const cp = !!process.env.USE_CHILDPROCESS;  // check if environment variable is set
const msg = `App listening on port ${process.env.PORT || 3000}.
Child processes are ${cp ? '' : 'NOT'} used.`;

app.use(morgan('tiny'));                    // use logging middleware
app.use(lib.router);                        // use routing middleware

/**
 * Make app listen to specified port
 */
app.listen(process.env.PORT || 3000, () => console.log(msg));
