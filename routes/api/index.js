const express = require('express');
const User = require('../../models/User');
const graphqlHTTP = require('express-graphql').graphqlHTTP


const router = express.Router();

router.get('/', graphqlHTTP({

    schema: User,
    graphiql: true,

  }
))