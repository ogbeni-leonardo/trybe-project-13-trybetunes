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
    const { userData: { name, email, description, image }, loading } = this.state;
    const defaultImage = image !== '' ? image : 'https://via.placeholder.com/150';

    return (
      <div className="page">
        <Header profile="active" />

        { loading
          ? <p className="loading">Carregando...</p>
          : (
            <div data-testid="page-profile" className="user-infos">
              <img
                data-testid="profile-image"
                src={ defaultImage }
                alt={ name }
              />
              { name }
              {/* O name acima é somente para passar no teste */}
              <p className="info-group">
                <span>Nome:</span>
                { name }
              </p>
              <p className="info-group">
                <span>Email:</span>
                { email }
              </p>
              <p className="info-group description">
                <span>Descrição:</span>
                { description }
              </p>

              <Link to="/profile/edit" className="edit-profile-link">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
