const { default: axios } = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');
 

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
    email: {
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

          const res = await axios.get(`http://localhost:8000/users/${args.id}`);
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

          const res = await axios.get(`http://localhost:8000/users`);
          return res.data;

        } catch (err) {
          console.log(err.message)
        }
      }
    }
    
  })
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: User,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: {type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },

      },
      async resolve(parent, args) {
        try {
          const res = await axios.post('http://localhost:8000/users', {
            name: args.name, email: args.email, password: args.password
          })
          return res.data
        } catch (err) {
          console.log(err.message)
        }
      }
    },
    deleteUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        

      },
      async resolve(parent, args) {
        try {
          const res = await axios.delete(`http://localhost:8000/users/${args.id}`)
          return res.data
        } catch (err) {
          console.log(err.message)
        }
      }
    },
    updateUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: {type: GraphQLString },
        password: { type: GraphQLString },

      },
      async resolve(parent, args) {
        try {
          const res = await axios.patch(`http://localhost:8000/users/${args.id}`, args)
          return res.data
        } catch (err) {
          console.log(err.message)
        }
      }
    },
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})