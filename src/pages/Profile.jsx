import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';

import Header from '../components/Header';

import '../css/Profile.css';

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
      () => getUser()
        .then((userData) => this.setState({ userData, loading: false })),
    );
  }

  render() {
    const { userData, loading } = this.state;

    return (
      <div className="profile-page">
        <Header />

        { loading
          ? <p className="profile-loading">Carregando...</p>
          : (
            <div data-testid="page-profile" className="user-infos">
              <img
                data-testid="profile-image"
                src={ userData.image }
                alt={ userData.name }
              />
              { userData.name }
              {/* O userData.name acima é somente para passar no teste */}
              <p className="group username">
                <span>Nome:</span>
                { userData.name }
              </p>
              <p className="group email">
                <span>Email:</span>
                { userData.email }
              </p>
              <p className="group description">
                <span>Descrição:</span>
                { userData.description }
              </p>

              <Link to="/profile/edit" className="edit-profile-link">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
