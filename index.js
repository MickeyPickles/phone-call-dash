

//check Nexmo docs on how to generate a private_kay and appId
const Nexmo = require('nexmo');
const appId = '<APP_ID>';
const privateKey = require('fs').readFileSync('./private.key');

//set an env variable for the phone number you want to call like this:
//12121234567
const recipientNumber = process.env.phoneNumber

//change apiKey and apiSecret accordingly
const nexmo = new Nexmo({
  apiKey: '<API_KEY>',
  apiSecret: '<API_SECRET>',
  applicationId: appId,
  privateKey: privateKey
});



/**
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */
exports.handler = (event, context, callback) => {
    console.log('Calling phone number', recipientNumber);

    nexmo.calls.create({
      to: [{
        type: 'phone',
        number: recipientNumber
      }],
      from: {
        type: 'phone',
        number: '12325551212'
      },
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
};
