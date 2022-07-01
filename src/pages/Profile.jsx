import React, { Component } from 'react';
import { string } from 'prop-types';

import Header from '../components/Header';

class Profile extends Component {
  render() {
    const { username } = this.props;

    return (
      <div data-testid="page-profile">
        <Header username={ username } />
        Profile
      </div>
    );
  }
}

Profile.propTypes = {
  username: string.isRequired,
};

export default Profile;
