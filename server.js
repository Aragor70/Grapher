require('dotenv').config({ path: 'config/config.env'})
const express = require('express');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql')

const User = require('./models/User');


const app = express()

app.use(cors());



app.use('/graphql', graphqlHTTP({

    schema: User,
    graphiql: true

  }
))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}.`))
