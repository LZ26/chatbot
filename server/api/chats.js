const router = require('express').Router();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const newAuthenticator = new IamAuthenticator({
  apikey: process.env.WATSON_ASSISTANT_APIKEY,
});

const assistant = new AssistantV2({
  version: '2020-09-24',
  authenticator: newAuthenticator,
  url: process.env.WATSON_ASSISTANT_URL,
});

router.get('/session', async (req, res) => {
  try {
    const session = await assistant.createSession({
      assistantId: process.env.WATSON_ASSISTANT_ID,
    });
    res.send(session);
  } catch (err) {
    next(err);
  }
});

router.post('/message', async (req, res, next) => {
  payload = {
    assistantId: process.env.WATSON_ASSISTANT_ID,
    sessionId: req.headers.session_id,
    input: {
      message_type: 'text',
      text: req.body.input,
    },
  };

  try {
    const msg = await assistant.message(payload);
    res.json(msg['result']);
  } catch (err) {
    res.send('There was an error processing your request');
    console.log(err);
  }
});

module.exports = router;
