'use strict';
const { Model }  = require('objection');

class Users extends Model {
  static get tableName() {
    return 'Users'
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 225 },
      }
    }
  }

  static get relationMappings () {
    return {}
  }

}

module.exports = {
  Users,
}

/* see http://vincit.github.io/objection.js/#models for example mappings.  to/from should
   use the /table/ name, not the model name */