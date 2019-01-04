var request = require("request");


exports.send = function(message, json) {
  var options = {
    method: 'POST',
    url: 'https://hooks.slack.com/services/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',
    headers:
      { 'Postman-Token': 'bff70105-e656-497a-8afe-e3e0ed882942',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json' },
    body:
      { channel: '#continuous-delivery',
        username: 'webhookbot',
        text: message,
        attachments:[
          {
            fallback: message,
            pretext: message,
            color:"#00D000",
            fields:[
              {
                "title": message,
                "value": "```" + JSON.stringify(json) + "```",
                "short": false
              }
            ]
          }
        ],
        icon_emoji: ':ant:'
      },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

};
