# node-aws-lex-bot-communicator-demo
A demo repository to do the AWS Lex Bot communication with AWS JS SDK (v2/v3)
- This app is created to demostrate the AWS JS SDK V3 library NODEHTTP2 session error

## Setup & Run the app

```sh
# Clone the repo into your local
git clone https://github.com/hari-007/node-aws-lex-bot-communicator-demo.git
```

```sh
# Go inside the app
cd node-aws-lex-bot-communicator-demo
```

```sh
# Install the libraires
npm i
```


> Make sure you have updated the `.env` file

> I have not included the senstive information like access_key, access_secrete, bot_id, and bot_alias_id. So,please use yours.


```sh
# Finally start the app. Default port is > 3007
npm start
```

## How to reproduce this:
- Check below two libraries approach after setup and installation completes

### With V3 AWS-SDK-JS library -- `Session destroy issue (until the version 3.16.0)`

#### Description:
- [`lex-client-v3.js`](lex-client-v3.js) :: File contains the `@aws-sdk/client-lex-runtime-v2` client of aws-sdk-js-v3 implementation.
- postMessage() :: Method contians two ways of initializing the client-lex-runtime-v2.
- We can try both the approaches to reproduce the session destroyed issue

#### Steps to reproduce:
- Use postman/insomnia to call below endpoint with JSON body as `{ "text": "***** anything ***"}`
> `POST` :: `http://localhost:3007/v3/send`
- Or use below curl
```sh
curl --location --request POST 'http://localhost:3007/v3/send' \
--header 'Content-Type: application/json' \
--data-raw '{ "text": "getting started"}'
```

### With V2 AWS-SDK-JS library -- `No issues`
- This is working as expected and no issues noted.
- To call this endpoint use below details with JSON body as `{ "text": "***** anything ***"}`
> `POST` :: `http://localhost:3007/v2/send`
- Or use belwo curl
```sh
curl --location --request POST 'http://localhost:3007/v3/send' \
--header 'Content-Type: application/json' \
--data-raw '{ "text": "getting started"}'
```