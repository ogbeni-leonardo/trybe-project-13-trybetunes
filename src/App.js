import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { username } = this.state;

    return (
      <Router>
        <Switch>

          <Route
            path="/album/:id"
            render={ () => <Album username={ username } /> }
          />

          <Route
            path="/profile/edit"
            render={ () => <ProfileEdit username={ username } /> }
          />

          <Route
            path="/profile"
            render={ () => <Profile username={ username } /> }
          />

          <Route
            path="/favorites"
            render={ () => <Favorites username={ username } /> }
          />

          <Route
            path="/search"
            render={ () => <Search username={ username } /> }
          />

          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                username={ username }
                handleChange={ this.handleChange }
              />
            ) }
          />

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
