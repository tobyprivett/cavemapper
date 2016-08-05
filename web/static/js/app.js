import "phoenix_html"

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import reducers from './reducers';
import App from './components/app'
import CaveShow from "./components/cave_show";
import CaveIndex from "./components/cave_index";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

var map_container = document.getElementById('react-container');

if (map_container) {
  ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>

        <IndexRoute component={CaveIndex} />

        <Route path="/caves/:cave_id" component={CaveShow} />
        <Route path="/caves/" component={CaveIndex} />

      </Route>
    </Router>
  </Provider>
  , map_container);
}
