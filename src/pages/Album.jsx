import React, { Component } from 'react';
import { string } from 'prop-types';

import Header from '../components/Header';

class Album extends Component {
  render() {
    const { username } = this.props;

    return (
      <div data-testid="page-album">
        <Header username={ username } />
        Album
      </div>
    );
  }
}

Album.propTypes = {
  username: string.isRequired,
};

export default Album;
