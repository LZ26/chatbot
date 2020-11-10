const router = require('express').Router();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const authenticator = new IamAuthenticator({
  apikey: process.env.WATSON_ASSISTANT_APIKEY,
});

const assistant = new AssistantV2({
  version: '2020-11-10',
  authenticator: authenticator,
  url: process.env.WATSON_ASSISTANT_APIKEY,
});

router.get('/session', async (req, res, next) => {
  try {
    const session = await assistant.createSession({
      assistantId: process.env.WATSON_ASSISTANT_ID,
    });
    res.send(sesson);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
