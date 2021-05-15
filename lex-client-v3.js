const { LexRuntimeV2 } = require('@aws-sdk/client-lex-runtime-v2');


class AWSLexServiceClientV3 {

  constructor() {
    this.lexRunTimeV2Service = new LexRuntimeV2({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      },
      apiVersion: process.env.AWS_LEX_API_VERSION
    });
  }

  async postMessage (text) {
    try {
      // All the Lex v2 service request params
      const lexServiceV2RequestParams = {
        botId: process.env.AWS_LEX_BOT_ID,
        botAliasId: process.env.AWS_LEX_BOT_ALIAS_ID,
        localeId: process.env.AWS_LEX_BOT_LOCAL_ID,
        sessionId: process.env.AWS_LEX_BOT_SESSION_ID,
        sessionState: {},
        text: text.toString()
      };

      /** Trail - 1 */
      // Here we are creating LexRunTimeV2 instance on the fly everytime and using it
      const lexRunTimeV2Service = new LexRuntimeV2({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        },
        apiVersion: process.env.AWS_LEX_API_VERSION
      });

      return await lexRunTimeV2Service.recognizeText(lexServiceV2RequestParams);
      

      /** Trail - 2 */
      // Here we are creating LexRunTimeV2 instance once per class instantiate
      // return await this.lexRunTimeV2Service.recognizeText(lexServiceV2RequestParams);
    } catch (ex) {
      console.log(ex);
      throw ex;
    }
  }
}

module.exports = AWSLexServiceClientV3;
