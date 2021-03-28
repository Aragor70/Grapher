const { default: axios } = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
 

const Users = [
  { id: '1', name: 'Bambino', password: 'qwerty123' },
  { id: '2', name: 'Ciao', password: 'qwerty123' }
]


const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: User,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parent, args) {
        /* for (let i = 0; i < users.length; i++) {
          if (users[i].id === args.id) {
            return users[i];
          }
        } */
        try {

          const res = await axios.get(`http://localhost:3000/users/${args.id}`);
          return res.data;

        } catch (err) {
          console.log(err.message)
        }
        
      }
    },
    users: {
      type: new GraphQLList(User),
      async resolve(parent, args) {
        try {

          const res = await axios.get(`http://localhost:3000/users`);
          return res.data;

        } catch (err) {
          console.log(err.message)
        }
      }
    }
    
  })
})


module.exports = new GraphQLSchema({
  query: RootQuery
})