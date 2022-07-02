import React, { Component } from 'react';
import { string, func, shape } from 'prop-types';

import { createUser } from '../services/userAPI';

import '../css/Login.css';

class Login extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      submitIsDisabled: true,
      loading: false,
    };
  }

  onButtonClick(event) {
    event.preventDefault();

    const { username, history: { push } } = this.props;

    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: username });
        push('/search');
      },
    );
  }

  onInputChange(event) {
    const { target: { value } } = event;
    const { handleChange } = this.props;

    const hasValidValue = value.trim().length > 2;
    this.setState({ submitIsDisabled: !hasValidValue });
    handleChange(event);
  }

  render() {
    const { loading, submitIsDisabled } = this.state;
    const { username } = this.props;

    return (
      <div>
        { loading
          ? (<p className="loadingPage">Carregando...</p>)
          : (
            <div className="formLoginContainer">
              <form data-testid="page-login" className="formLogin">
                <div className="titleLoginContainer">
                  <h1 className="titleLogin">
                    Trybe
                    <span>Tunes</span>
                  </h1>
                </div>

                <div className="userLoginContainer">
                  <label htmlFor="name" className="loginLabel">
                    Usuário:
                    <input
                      data-testid="login-name-input"
                      name="username"
                      onChange={ this.onInputChange }
                      placeholder="Seu nome de usuário"
                      type="text"
                      value={ username }
                    />
                  </label>

                  <label htmlFor="password" className="loginLabel">
                    Senha:
                    <input
                      name="password"
                      placeholder="Digite sua senha"
                      type="password"
                    />
                  </label>

                  <label htmlFor="remember" className="remember">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                    />
                    Me mantenha conectado
                  </label>

                  <button
                    className="buttonLogin"
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
  username: string.isRequired,
  handleChange: func.isRequired,
};

export default Login;
