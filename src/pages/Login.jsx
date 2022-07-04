import React, { Component } from 'react';
import { shape } from 'prop-types';

import { createUser } from '../services/userAPI';

import '../css/Login.css';

class Login extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      username: '',
      submitIsDisabled: true,
      loading: false,
    };
  }

  onButtonClick(event) {
    event.preventDefault();

    const { username } = this.state;
    const { history: { push } } = this.props;

    this.setState(
      { loading: true },
      () => createUser({ name: username })
        .then(() => push('/search')),
    );
  }

  onInputChange({ target: { value } }) {
    const isValid = value.trim().length > 2;
    this.setState({ username: value, submitIsDisabled: !isValid });
  }

  render() {
    const { username, submitIsDisabled, loading } = this.state;

    return (
      <div className="login-page">
        { loading
          ? (<p className="loading-login">Carregando...</p>)
          : (
            <div className="login-form-container">
              <form data-testid="page-login" className="login-form">
                <div className="login-title-container">
                  <h1 className="login-title">
                    Trybe
                    <span>Tunes</span>
                  </h1>
                </div>

                <div className="user-login-container">
                  <label htmlFor="username" className="login-label">
                    Usuário:
                    <input
                      data-testid="login-name-input"
                      id="username"
                      name="username"
                      onChange={ this.onInputChange }
                      placeholder="Seu nome de usuário"
                      type="text"
                      value={ username }
                    />
                  </label>

                  <label htmlFor="password" className="login-label">
                    Senha:
                    <input
                      name="password"
                      placeholder="Digite sua senha"
                      type="password"
                    />
                  </label>

                  <label htmlFor="remember" className="login-remember">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                    />
                    Me mantenha conectado
                  </label>

                  <button
                    className="login-button"
                    data-testid="login-submit-button"
                    onClick={ this.onButtonClick }
                    type="submit"
                    disabled={ submitIsDisabled }
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: shape({}).isRequired,
};

export default Login;
