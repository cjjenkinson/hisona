'use strict';

module.exports = {
  parseBody: body => {
    return typeof body !== 'object' ? JSON.parse(body) : body;
  },
};
