#So what is HyperGraphQL?
=> It is a GraphQL query interface over RDF stores driven by the exact principles and 
offering the functionalities discussed above. In
being so, it seamlessly ties together some of the most interesting web technologies today: linked data, GraphQL and JSON-LD.

# Summary
HyperGraphQL is a GraphQL-based interface for querying RDF stores, serving two key objectives:
hiding the complexities of the Semantic Web stack behind a simpler and more familiar to many clients GraphQL interface;
providing a flexible mechanism for restricting access to RDF triplestores down to naturally definable subsets of queries,
which can be efficiently handled, thus minimising the impact on the stores’ availability.
A HyperGraphQL response is a JSON-LD object conveying the full semantic context of the retrieved data. 
This makes it a natural Linked Data Fragment interface and a query layer for hypermedia-enabled web APIs powered by RDF stores.
Demo
Try a live demo over DBpedia at http://www.hypergraphql.org/demo and check out tutorials at http://www.hypergraphql.org/tutorial.
Code
Check out the GitHub repository at: https://github.com/hypergraphql/hypergraphql.
