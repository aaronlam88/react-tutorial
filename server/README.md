# Server
This server is written in ES6, using Express
## Setup
Required: Node >= v12, npm >= v6

To install: `npm install`
To start: `npm start`
To test: `npm test`

# Database
## MySQL
### Setup
Required following environment variables:
- MYSQL_HOST=xxxx
- MYSQL_PORT=xxxx
- MYSQL_USER=xxxx
- MYSQL_PASS=xxxx

(If you need to change the name of those variable, change the name in `server/src/utils/adapters/mysql/adapter.js`)
