'use strict';

import { Model } from 'objection';

function Users() {
  Model.apply(this, arguments);
}

Model.extend(Users);

Users.tableName = 'Users';

Users.jsonSchema = {
  type: 'object',
  required: [],

  properties: {
    id: {type:'integer'},
  }
};

/* see http://vincit.github.io/objection.js/#models for example mappings.  to/from should
   use the /table/ name, not the model name */
Users.relationMappings = {
  
};

export default Users;
