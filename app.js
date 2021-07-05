const express = require('express');
const bodyParser = require('body-parser');

//middleware function that help setup or graphql endpoint

const {graphqlHTTP} = require('express-graphql');
//has keywords like schema and mutations that turn the string into ..well.. schemas and mutations lol
const {buildSchema} = require('graphql');

const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const isAuth = require('./middleware/is-auth')
const app = express();

app.use(bodyParser.json());

//our middleware isAuth will run on every incoming request
app.use(isAuth);



//we only need one endpoint
//this will pass down request to ur graphql

app.use('/graphql', graphqlHTTP({
    //first parameter is the schema , 2nd is the resolvers, 3rd gives you access to graphiql
    schema: graphQlSchema,
    //bundle of all the resolvers
    rootValue:graphQlResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@graphqlpractice.1g6za.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(()=> {
    app.listen(3000);
})
.catch(ERR => {
    console.log(err);
});


