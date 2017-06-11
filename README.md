# Atkin as a Service
*The [sieve of Atkin](https://en.wikipedia.org/wiki/Sieve_of_Atkin) is a modern algorithm for finding all prime numbers up to a specified integer.*

This is a demonstration for using [child processes](https://nodejs.org/api/child_process.html) in a REST API.

## Requirements
 * Node.js v6 or later: [https://nodejs.org/en/](https://nodejs.org/en/)
 * Docker (optional): [https://www.docker.com/](https://www.docker.com/)
 * Yarn (optional): [https://yarnpkg.com/en/](https://yarnpkg.com/en/)

## Setup
 1. `git clone https://github.com/saschazar21/atkin-service`
 2. `cd atkin-service`
 3. `npm install` or `yarn`

## Environment variables
The service can be modified using two environment variables:
 * **USE_CHILDPROCESS**: if set to *true*, the API will use child processes when calculating prime numbers. If not desired, the variable has to be unset (setting any other value will evaluate to *true*).
 * **PORT**: using this variable, the standard port *3000* may be overridden.

Either the environment variables are set manually, or specified in the `.env`-file. This file is parsed at launch and is also excluded from any git actions due to its existence in `.gitignore`.

## Launch
The REST API may be launched using `npm start`. A status message listing the port and whether child processes are used is appearing after the service was bootstrapped.

## Endpoints
 * `GET /`: Currently the only endpoint. It calculates all prime numbers until *10,000,000*, unless a `limit` parameter together with a custom value was added like this: `?limit={custom value}`. Returns the 10 highest prime numbers of that range.

## Author
Sascha Zarhuber

## License
MIT

## References
The algorithm for the sieve of Atkin was taken from @kramtark's gist and can be viewed here: [https://gist.github.com/kramtark/277c0657530572e92c48](https://gist.github.com/kramtark/277c0657530572e92c48)

## Changelog
 * **1.0.0**: Initial version, containing the root endpoint: `/`
