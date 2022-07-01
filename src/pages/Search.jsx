import React, { Component } from 'react';
import { string } from 'prop-types';

import Header from '../components/Header';

class Search extends Component {
  render() {
    const { username } = this.props;

    return (
      <div data-testid="page-search">
        <Header username={ username } />
        Search
      </div>
    );
  }
}

Search.propTypes = {
  username: string.isRequired,
};

export default Search;
