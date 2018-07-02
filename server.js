const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

let msg = 'Hello World';
let TheBestDevs = [
  {
    name:'Bruno',
    squad:'mobile'
  },
  {
    name:'David',
    squad:'mobile'
  },
  {
    name:'Adonis',
    squad:'portal'
  },
  {
    name:'Ygor',
    squad:'All'
  },
  {
    name:'Gusta',
    squad:'portal'
  },
  {
    name:'Edu',
    squad:'portal'
  },
  {
    name:'Rodolfo',
    squad:'cloud'
  },
  {
    name:'Winicius',
    squad:'cloud'
  }
]

// GraphQL schema
const schema = buildSchema(`

    type Developer{
      name: String
      squad: String
    }

    type Mutation{
      changeMessage(to:String!): String
      changeSquadDeveloper (where: String!, to: String!) : Developer
    }

    type Query {
      message: String
      allDevs : [Developer]
    }
`);

// Root resolver
const root = {
    message: () => msg,

    changeMessage :({to}) =>{
      msg = to;
      return msg;
    },

    allDevs: () => TheBestDevs,

    changeNameDeveloper: ({where, to})=>{
      TheBestDevs.map(dev =>{
        if(dev.name === where){
          dev.name = to;
        }
      });
      return TheBestDevs.filter(dev => dev.name === to) [0];
    }
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));