import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Home from './screen/home/Home';
import Message from './screen/message/Message';
import Countdown from './screen/countdown/Countdown';

function app() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/message" component={Message} />
        <Route path="/countdown-timer" component={Countdown} />
      </Switch>
    </Router>
  );
}

export default app;
