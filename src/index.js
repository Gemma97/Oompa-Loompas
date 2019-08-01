import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, IndexRoute } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';

import MainView from './components/main_view';
import DetailView from './components/detail_view';
import reducers from './reducers';
import promise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={MainView} />
        <Route path="/oompa" component={DetailView} />
      </Switch>
    </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
