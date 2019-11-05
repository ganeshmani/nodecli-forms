const inquirer = require('inquirer');
const Form = require('./form');
const datamodule = require('./logic');
const { STATUS, CANCELLED_REASON } = require('./enum_val');
describe('completing user ticket', () => {
  // stub inquirer
  let backup;
  const form = new Form();
  beforeEach(() => {
    backup = inquirer.prompt;
    inquirer.prompt = questions =>
      Promise.resolve({
        createdBy: 'test',
        description: 'test',
        severity: 2,
        status: STATUS.COMPLETED,
        comments: 'description'
      });
  });

  it('should complete the ticket with given data', () => {
    datamodule([
      form.createdByInput(),
      form.descriptionInput(),
      form.severityInput(),
      form.statusInput(),
      form.commentsInput(),
      form.cancelledReasonInput(),
      form.cancelledOtherdescriptionInput()
    ]).then(answers => {
      let result = {
        createdBy: 'test',
        description: 'test',
        severity: 2,
        status: 'COMPLETED',
        comments: 'description'
      };

      expect(answers).toEqual(result);
    });
  });

  // restore
  afterEach(() => {
    inquirer.prompt = backup;
  });
});

describe('cancelling user ticket', () => {
  // stub inquirer
  let backup;
  const form = new Form();
  beforeEach(() => {
    backup = inquirer.prompt;
    inquirer.prompt = questions =>
      Promise.resolve({
        createdBy: 'test',
        description: 'test',
        severity: 2,
        status: STATUS.CANCELLED,
        cancelledReason: CANCELLED_REASON.OTHER,
        cancelledOtherDescription: 'description'
      });
  });

  it('should record data as ticket cancelled with given data', () => {
    expect.assertions(1);
    datamodule([
      form.createdByInput(),
      form.descriptionInput(),
      form.severityInput(),
      form.statusInput(),
      form.commentsInput(),
      form.cancelledReasonInput(),
      form.cancelledOtherdescriptionInput()
    ]).then(answers => {
      let result = {
        createdBy: 'test',
        description: 'test',
        severity: 2,
        status: 'CANCELLED',
        cancelledReason: 'OTHER',
        cancelledOtherDescription: 'description'
      };
      expect(answers).toEqual(result);
    });
  });

  // restore
  afterEach(() => {
    inquirer.prompt = backup;
  });
});

describe('cancelling ticket by enduser', () => {
  // stub inquirer
  let backup;
  const form = new Form();
  beforeEach(() => {
    backup = inquirer.prompt;
    inquirer.prompt = questions =>
      Promise.resolve({
        createdBy: 'test',
        description: 'test',
        severity: 2,
        status: STATUS.CANCELLED,
        cancelledReason: CANCELLED_REASON.ENDUSER
      });
  });

  it('should record data as ticket cancelled with enduser as reason', () => {
    datamodule([
      form.createdByInput(),
      form.descriptionInput(),
      form.severityInput(),
      form.statusInput(),
      form.commentsInput(),
      form.cancelledReasonInput(),
      form.cancelledOtherdescriptionInput()
    ]).then(answers => {
      let result = {
        createdBy: 'test',
        description: 'test',
        severity: 2,
        status: 'CANCELLED',
        cancelledReason: 'ENDUSER'
      };
      expect(answers).toEqual(result);
    });
  });

  // restore
  afterEach(() => {
    inquirer.prompt = backup;
  });
});
