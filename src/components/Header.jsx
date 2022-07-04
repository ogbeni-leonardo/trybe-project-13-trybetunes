import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';

import './Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      () => getUser().then((user) => this.setState({ user, loading: false })),
    );
  }

  render() {
    const { loading, user: { name } } = this.state;

    return (
      <div className="header-container">
        { loading
          ? <p className="header-loading">Carregando...</p>
          : (
            <header className="header" data-testid="header-component">
              <div className="header__title-container">
                <h1 className="header__title">
                  Trybe
                  <span>Tunes</span>
                </h1>
                <p
                  className="header__username"
                  data-testid="header-user-name"
                >
                  <span>Olá,</span>
                  {' '}
                  { name }
                  {'!'}
                </p>
              </div>

              <nav>
                <ul className="header__pages-list">
                  <li>
                    <Link
                      className="page-link"
                      data-testid="link-to-search"
                      to="/search"
                    >
                      Buscar
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="page-link"
                      data-testid="link-to-favorites"
                      to="/favorites"
                    >
                      Favoritas
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="page-link"
                      to="/profile"
                      data-testid="link-to-profile"
                    >
                      Meu Perfil
                    </Link>
                  </li>
                </ul>
              </nav>
            </header>
          ) }
      </div>
    );
  }
}

export default Header;
