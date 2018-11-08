import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, Switch } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { syncHistoryWithStore, ConnectedRouter } from 'react-router-redux';

import Main from './Main';
import Chat from './Chat';
import { configureStore, history } from '../redux/store';

interface IRootType {
  store: Store<any>; // Redux.Store<any>;
  isProduction: boolean;
}

const store = configureStore();

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/*<TransitionGroup>*/}
        {/*<CSSTransition*/}
          {/*timeout={300}*/}
          {/*classNames="fade"*/}
        {/*>*/}
          <Switch>
            <Route path="/chat" component={Chat}/>
            <Route path="/" component={Main}/>
          </Switch>
        {/*</CSSTransition>*/}
      {/*</TransitionGroup>*/}
    </ConnectedRouter>
  </Provider>
)