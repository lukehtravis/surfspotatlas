import React, { Component, Fragment } from "react";
import { ApolloServer } from 'apollo-server';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import AddSpot from "./Components/AddSpot";
import typeDefs from './utils/surfspotatlasschema';
import {LaunchAPI} from "./utils/api.js"

class App extends Component {
  render() {
    const server = new ApolloServer({
      typeDefs,
      dataSources: () => ({
        launchAPI: new LaunchAPI(),
      })
    });

    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
    return (
      <Router>
        <Fragment>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/AddSpot" component={AddSpot} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
