import React, { Component } from 'react';
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
              Meu cabeçalho
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
