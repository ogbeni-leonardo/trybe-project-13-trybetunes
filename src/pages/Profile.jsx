import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import { getUser } from '../services/userAPI';

import Header from '../components/Header';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userData: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      () => {
        getUser().then((userData) => this.setState({ userData, loading: false }));
      },
    );
  }

  render() {
    const { userData, loading } = this.state;
    const { username } = this.props;

    return (
      <div className="page">
        <Header username={ username } />
        { loading
          ? <p>Carregando...</p>
          : (
            <div data-testid="page-profile">
              <p>{ userData.name }</p>
              <p>{ userData.email }</p>
              <p>{ userData.description }</p>
              <img
                data-testid="profile-image"
                src={ userData.image }
                alt={ userData.name }
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

Profile.propTypes = {
  username: string.isRequired,
};

export default Profile;
