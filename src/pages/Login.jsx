import React, { Component } from 'react';
import { shape } from 'prop-types';

import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.inputChange = this.inputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      inputContent: '',
      submitIsDisabled: true,
      loading: false,
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  handleClick(event) {
    event.preventDefault();

    const { inputContent } = this.state;
    const { history: { push } } = this.props;

    this.setState(
      { loading: true },
      async () => {
        await createUser({ name: inputContent });
        push('/search');
      },
    );
  }

  inputChange({ target: { value } }) {
    this.setState({ inputContent: value });
    if (value.trim().length > 2) this.setState({ submitIsDisabled: false });
    else this.setState({ submitIsDisabled: true });
  }

  render() {
    const { inputContent, submitIsDisabled, loading } = this.state;

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
                  onChange={ this.inputChange }
                  placeholder="Digite seu nome..."
                  type="text"
                  value={ inputContent }
                />
              </label>

              <button
                data-testid="login-submit-button"
                onClick={ this.handleClick }
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
};

export default Login;
