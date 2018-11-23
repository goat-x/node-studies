var AWS = require('aws-sdk')
AWS.config.update({ region: '	sa-east-1' })
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
const queueURL = 'https://sqs.sa-east-1.amazonaws.com/908200864016/MinhaFila'

// let params = {
    // QueueUrl: queueURL,
    // QueueName: 'MinhaFila',
    // Attributes: {
    //     'DelaySeconds': '60',
    //     'MessageRetentionPeriod': '86400'
    // }
// }

// Sending a message.
// NOTE: Here we need to populate the queue url you want to send to.
// That variable is indicated at the top of app.js.
let params = {
    MessageBody: 'Mensagem do Thiago!',
    QueueUrl: queueURL,
    DelaySeconds: 0
}

sqs.sendMessage(params, function (err, data) {
    if (err) {
        console.log('Error', err);
    } else {
        console.log('Sucess', data);
    }
})

// sqs.listQueues(params, function (err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data.QueueUrls);
//     }
// });

// sqs.getQueueUrl(params, function (err, result) {
//       if (err) {
//           console.log("Error", err);
//       } else {
//           console.log("Success", data.QueueUrls);
//       }
// })