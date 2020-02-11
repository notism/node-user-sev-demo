/* eslint-disable camelcase */
// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

const mongodb = require('mongodb');
// const FetchCreatedBy = require('../../common/mixins/fetch-created-by')
module.exports = function(server) {
  const User = server.models.user;
  console.log("XXX TEST")

  User.defineProperty('firstName', {
    type: String,
  });
  User.defineProperty('lastName', {
    type: String,
  }); 
  User.defineProperty('profileImageUrl', {
    type: String,
  });
  User.defineProperty('createdDate', {
      type: Date, 
      default: '$now'    
  });
  User.defineProperty('createdBy', {type: mongodb.ObjectID, default: 'SYSTEM'});  
  User.belongsTo(User, {as: 'createdByUser', foreignKey: 'createdBy'});
 


  User.settings.indexes = {
    email_index: {
      email: 1,
    },
    username_index: {
      username: 1,
    },
    firstName_index: {
      firstName: 1,
    },
    lastName_index: {
      lastName: 1,
    }   
  };

  User.settings.acls = [{
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'DENY',
  },
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: 'registerUser',
  },
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: 'isEmailExists',
  }, 
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: 'isTokenValid',
  },
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: '*',
  },  
  
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    property: 'find',
    permission: 'ALLOW',
  },
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: 'create',
  },
  {
    principalType: 'ROLE',
    principalId: '$owner',
    permission: 'ALLOW',
    property: 'deleteById',
  },
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: 'login',
  },
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: 'logout',
  },
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: 'patchAttributes',
  },
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: 'replaceById',
  },
  {
    principalType: 'ROLE',
    principalId: '$everyone',
    permission: 'ALLOW',
    property: 'findById',
  },
 ];
};
