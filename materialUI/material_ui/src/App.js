import React,  { Component, Fragment } from 'react';
import './App.css';
import LeftMenu from './LeftMenu';
import MainWebset from './MainWebset';
import show_result from './show_result';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="wrapper">
      
        <Router>
        <Fragment>
          <Switch>
          <Route exact path="/" component={LeftMenu} />
          <Route  path="/LeftMenu" component={LeftMenu} />
          <Route   path="/MainWebset" component={MainWebset} />
          <Route  path="/show_result" component={show_result} />
          </Switch>
          </Fragment>
       </Router>
      </div>
    )
  }
}

export default App;
