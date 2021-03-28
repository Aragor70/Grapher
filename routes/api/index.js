const express = require('express');
const User = require('../../models/User');
const graphqlHTTP = require('express-graphql').graphqlHTTP


const router = express.Router();

var root = { hello: () => 'Ciao' };

router.get('/', graphqlHTTP({

    schema: User,
    rootValue: root,
    graphiql: true,

  }
))