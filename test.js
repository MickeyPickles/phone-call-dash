//this is the code that makes a phone call that you can run on the command line like this:
//node test.js
//To how how to send an SMS go here
//https://docs.nexmo.com/messaging/sms-api

const Nexmo = require('nexmo');

const appId = '<APP_ID>';

const privateKey = require('fs').readFileSync('./private.key');
const nexmo = new Nexmo({
  apiKey: '<API_KEY>',
  apiSecret: '<API_SECRET>',
  applicationId: appId,
  privateKey: privateKey
});


nexmo.calls.create({
  to: [{
    type: 'phone',
    number: '12121234567'
  }],
  from: {
    type: 'phone',
    number: '12121234567'
  },
  //the JSON at this URL tells Nexmo what the content of the phone call is. To learn more go here
  //https://docs.nexmo.com/voice/voice-api/ncco-reference
  answer_url: ['http://capturetheory.com/school_dash/first_call_talk.json']
}, (err, res) => {
  if(err) {
    console.error("there is an error");
    console.error(err);
  }
  else {
    console.log(res);
  }
});
