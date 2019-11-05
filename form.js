const { STATUS, CANCELLED_REASON } = require('./enum_val');
class Form {
  constructor() {}
}

Form.prototype.createdByInput = function() {
  return {
    type: 'input',
    name: 'createdBy',
    message: 'Enter Created By'
  };
};

Form.prototype.descriptionInput = function() {
  return {
    type: 'input',
    name: 'description',
    message: 'Enter Description'
  };
};

Form.prototype.statusInput = function() {
  return {
    type: 'list',
    name: 'status',
    message: 'Status of Ticket',
    choices: [STATUS.COMPLETED, STATUS.CANCELLED]
  };
};

Form.prototype.severityInput = function() {
  return {
    type: 'number',
    name: 'severity',
    message: 'Enter Severity',
    validate: function(value) {
      if (typeof value !== 'number' || isNaN(value)) {
        return 'you need to provide a number';
      }
      return true;
    }
  };
};

Form.prototype.commentsInput = function() {
  return {
    type: 'input',
    name: 'comments',
    message: 'Enter Comments',
    when: input => {
      if (input.status === STATUS.COMPLETED) {
        return true;
      } else {
        return false;
      }
    }
  };
};

Form.prototype.cancelledReasonInput = function() {
  return {
    type: 'list',
    name: 'cancelledReason',
    message: 'Reason for Cancellation',
    choices: [CANCELLED_REASON.ENDUSER, CANCELLED_REASON.OTHER],
    when: input => {
      if (input.status === STATUS.CANCELLED) {
        return true;
      } else {
        return false;
      }
    }
  };
};

Form.prototype.cancelledOtherdescriptionInput = function() {
  return {
    type: 'input',
    name: 'cancelledOtherDescription',
    message: 'Enter Description for Cancellation',
    when: input => {
      if (input.cancelledReason === CANCELLED_REASON.OTHER) {
        return true;
      } else {
        return false;
      }
    }
  };
};

Form.prototype.setDescription = function(description) {
  this._description = description;
};

Form.prototype.setCreatedBy = function(createdBy) {
  this._createdBy = createdBy;
};

Form.prototype.setSeverity = function(Severity) {
  this._severity = Severity;
};

Form.prototype.setStatus = function(status) {
  this._status = status;
};

Form.prototype.setCancelledReason = function(reason) {
  this._cancelledReason = reason;
};

Form.prototype.setCancelledOtherDesc = function(description) {
  this._cancelledOtherDescription = description;
};

Form.prototype.setComments = function(comments) {
  this._comments = comments;
};

Form.prototype.getAllValues = function() {
  return {
    createdBy: this._createdBy,
    Description: this._description,
    Severity: this._severity,
    Status: this._status,
    cancelledReason: this._cancelledReason,
    cancelledDescription: this._cancelledOtherDescription,
    comments: this._comments
  };
};

module.exports = Form;
