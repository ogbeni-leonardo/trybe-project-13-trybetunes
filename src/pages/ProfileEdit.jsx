import React, { Component } from 'react';
import { string } from 'prop-types';

import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    const { username } = this.props;

    return (
      <div data-testid="page-profile-edit">
        <Header username={ username } />
        Profile Edit
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  username: string.isRequired,
};

export default ProfileEdit;
