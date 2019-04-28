const { ApolloServer } = require('apollo-server');
import typeDefs from './utils/surfspotatlasschema';
import LaunchAPI from "./utils/api.js"

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
