/* 
    1. We have to define type and Relations
    2. GraphQl does all the heavylifting for us

*/

const graphql = require('graphql');
const _ = require('lodash');
//var _ = require('underscore');
//WE HAVE TO pass this schema to app file inside middleware
//obj types, relation and way to interact with objs

//define obj types in graphql
//es6 desctruct
//grab GraphQLObjectType var props from graphql

const {
    GraphQLObjectType, GraphQLString, 
    GraphQLSchema, GraphQLID, GraphQLInt,
    GraphQLList
} = graphql;

//DUMMY DATA ARR not from db :) for now
//Do aNother Exampple using api fetch('url')
var books = [
    {name: 'Name of the Winf', genre: 'Fantacy', id:'1', authorid: '1'},
    {name: 'The final empire', genre: 'Fantacy', id:'2', authorid: '2'},
    {name: 'The long earth', genre: 'Sci-Fi', id:'3', authorid: '3'},
    {name: 'The Hero of Ages', genre: 'Fantacy', id:'4', authorid: '2'},
    {name: 'The Colour of Magic', genre: 'Fantacy', id:'5', authorid: '3'},
    {name: 'The Light Fantastic', genre: 'Fantacy', id:'6', authorid: '3'}

];

var authors = [
    {name: 'Patrick Rothfus', age: 44, id:'1'},
    {name: 'Brandon Sanderson', age: 42, id:'2'},
    {name: 'Terry Pratchett', age: 66, id:'3'}

];

//GraphQLObjectType fun ntakes obj and type
//Defining our object type BookType called Book
// interact between diff types book, author ...
const BookType = new GraphQLObjectType({
    name: 'Book',
    //wrap in function
    //why we have to wrap fields property inside a function?
//= TypeError fails to fetch
//BECAUSE BOOKTYPE, AUTHORTYPE nested inside, program won't find their types
//becauae of their orders
    fields: () => ({
        //graphql special string GraphQLString
        //this ES6 obj returns this obj
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        //this is gonna be  an obj and type authorType
        //nesting this inside book
        author: {
            type: AuthorType,
            //resolve fun is responsible for grabing and return data
            //use this fun inside the author
            //which author corresponds to this book?
            resolve(parent, args){
                //we already have parent obj of books and other properties
                //from areny we can see author id, book id
                console.log(parent);
                return _.find(authors, {id: parent.authorid})

            }
        }
    })

});

//crreate type for author as well
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    //wrap in function
    fields: () => ({
        //graphql special string GraphQLString
        //this ES6 obj returns this obj
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        //books field to associate with author
        books: {
            /* this refers to only 1 book so bad so use GraphQlList
            type: BookType */
            type: new GraphQLList(BookType),
            // resolve function grabs data we need
            resolve(parent, args){
                return _.filter(books, {authorid: parent.id});
            }
        }
    })

});


//yo pani type nai ho
// how initially deep into graph? definining this root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    //root query type in each inside fields
    //no need to put inside fun like before cox no need to worry about an order
    fields: {
        //query for book
        
        book: {
            type: BookType,
            //pass args along when querying like
        /* //which book to return? id
            book(id: '123'){
                name
                genre
            }

         */
            args: {id: {type: GraphQLID}},
            //if user passes id we'll access down
            //fire this resolve fun which takes 2 args
            resolve(parent, args){
 //code to get data from db / of some other source
                //args.id
                //look through books arr with aid 2
                //in js there is no type of for Id
                //so it makes a string
                /* console.log(typeof(args.id)); = string */
                return _.find(books, {id: args.id});
            
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //_.find = low dash method
                return _.find(authors, {id: args.id});
            
            }
        },
        //additional
        //WOW LIST OF ALL THE BOOKS
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    //soo which querey=? allowing users to make q from frnt-end?
    /* book(id: '2'){
        name
        genre
    } */
    query: RootQuery
})