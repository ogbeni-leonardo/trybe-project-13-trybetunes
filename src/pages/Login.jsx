import React, { Component } from 'react';
import { string, func, shape } from 'prop-types';

import { createUser } from '../services/userAPI';

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

    const { username } = this.props;
    const { history: { push } } = this.props;

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
    const hasValidValue = value.trim().length > 2;
    this.setState({ submitIsDisabled: !hasValidValue });

    const { handleChange } = this.props;
    handleChange(event);
  }

  render() {
    const { submitIsDisabled, loading } = this.state;
    const { username } = this.props;

    return (
      <div>
        { loading
          ? (<p>Carregando...</p>)
          : (
            <form data-testid="page-login">
              <label htmlFor="name">
                Nome:
                <input
                  data-testid="login-name-input"
                  name="username"
                  onChange={ this.onInputChange }
                  placeholder="Digite seu nome..."
                  type="text"
                  value={ username }
                />
              </label>

              <button
                data-testid="login-submit-button"
                onClick={ this.onButtonClick }
                type="submit"
                disabled={ submitIsDisabled }
              >
                Entrar
              </button>
            </form>
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
