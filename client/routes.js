import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';
import Home from './components/Home';

const NoMatch = () => {
  return <h3>404 - Not found</h3>;
};

class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Header /> */}
          <Switch>
            <Route path="/" exact component={Home} />
            <NoMatch />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
