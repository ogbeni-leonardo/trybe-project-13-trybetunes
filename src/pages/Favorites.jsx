import React, { Component } from 'react';
import { string } from 'prop-types';

import Header from '../components/Header';

class Favorites extends Component {
  render() {
    const { username } = this.props;

    return (
      <div data-testid="page-favorites">
        <Header username={ username } />
        Favorites
      </div>
    );
  }
}

Favorites.propTypes = {
  username: string.isRequired,
};

export default Favorites;
