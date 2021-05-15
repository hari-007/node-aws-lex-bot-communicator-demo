const AWS = require('aws-sdk');


class AWSLexServiceClientV2 {

  constructor() { }

  postMessage (text) {
    return new Promise((resolve, reject) => {
      // All the Lex v2 service request params
      const lexServiceV2RequestParams = {
        botId: process.env.AWS_LEX_BOT_ID,
        botAliasId: process.env.AWS_LEX_BOT_ALIAS_ID,
        localeId: process.env.AWS_LEX_BOT_LOCAL_ID,
        sessionId: process.env.AWS_LEX_BOT_SESSION_ID,
        sessionState: {},
        text: text.toString()
      };

      // Here we are creating LexRunTimeV2 instance on the fly everytime and using it
      const lexRunTimeV2Service = new AWS.LexRuntimeV2({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        },
        apiVersion: process.env.AWS_LEX_API_VERSION
      });

      lexRunTimeV2Service.recognizeText(lexServiceV2RequestParams, (err, data) => {
        if (err) {
          console.log(ex);
          return reject(err);
        }

        return resolve(data);
      });
    });
  }
}

module.exports = AWSLexServiceClientV2;
