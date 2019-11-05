const fs = require('fs');
const Logic = require('./logic');
const Form = require('./form');

const form = new Form();

const saveResultToJson = answers => {
  fs.readFile('tickets.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }
    let result = [];

    if (data) {
      data = JSON.parse(data);
      result = data.concat(answers);
    } else {
      result = [answers];
    }

    result = JSON.stringify(result);

    fs.writeFileSync('tickets.json', result, 'utf8');
  });
};

Logic([
  form.createdByInput(),
  form.descriptionInput(),
  form.severityInput(),
  form.statusInput(),
  form.commentsInput(),
  form.cancelledReasonInput(),
  form.cancelledOtherdescriptionInput()
]).then(answers => {
  console.log('Ticket details saved in tickets.json');
  saveResultToJson(answers);
});
