import React, { Component }  from 'react';
import Header from "./Header";
import Map from "./Map";
import Pin from "./Pin";
import Footer from "./Footer";
import ApolloClient from "apollo-boost";
import { graphql } from 'react-apollo';

const Wave = (props) => {
  return (
    <div>
      <p>{props.data.id}</p>
    </div>
  );
};

export default Wave
