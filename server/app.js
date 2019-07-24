//go inside and  Krishnas-MacBook-Pro:server krishnabagale$ node app
//sudo npm install nodemon -g
//npm install express
//Krishnas-MacBook-Pro:server krishnabagale$ nodemon app
//npm install graphql
//npm install graphql express-graphql
// npm install lodash

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
//graphql server to retrieve data
//http://localhost:4000/graphql
//setup middleware with 
//this graphqlHTTP() function will fireup when req graphql comes in
//{"errors":[{"message":"GraphQL middleware options must contain a schema."}]}
app.use('/graphql', graphqlHTTP({
    //have schema as this middleware fun takes them
    //schema to describe how data looks
    //passinng schema as property from here
    //to mapout graph
    //request to endpoint /graphql
    schema,
    //another property
    //This creates that browser tool :) WOW
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Listing request on port 4000');
})