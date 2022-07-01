import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userData: '',
    };
  }

  async componentDidMount() {
    const { username } = this.props;

    const userData = await getUser(username);
    this.setState({ loading: false, userData });
  }

  render() {
    const { loading, userData: { name } } = this.state;

    return (
      <div>
        { loading
          ? (<p>Carregando...</p>)
          : (
            <header data-testid="header-component">
              <nav>
                <ul>
                  <li>
                    <Link to="/search" data-testid="link-to-search">Search</Link>
                  </li>
                  <li>
                    <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
                  </li>
                  <li>
                    <Link to="/profile" data-testid="link-to-profile">Profile</Link>
                  </li>
                </ul>
              </nav>
              <p data-testid="header-user-name">{ name }</p>
            </header>
          ) }
      </div>
    );
  }
}

Header.propTypes = {
  username: string.isRequired,
};

export default Header;
