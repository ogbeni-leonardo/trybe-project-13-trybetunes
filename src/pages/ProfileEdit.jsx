import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { shape, string } from 'prop-types';

import { getUser, updateUser } from '../services/userAPI';

import Header from '../components/Header';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.validateEntries = this.validateEntries.bind(this);

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      saveButtonIsDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  componentDidMount() {
    this.setState(
      { loading: true },
      () => {
        getUser().then(({ name, email, image, description }) => {
          this.setState(
            { name, email, image, description, loading: false },
            () => this.validateEntries(),
          );
        });
      },
    );
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => this.validateEntries());
  }

  onButtonClick() {
    const { name, email, image, description } = this.state;
    const { history: { push } } = this.props;

    this.setState(
      { loading: true },
      () => updateUser({ name, email, image, description })
        .then(() => push('/profile')),
    );
  }

  validateEntries() {
    const { name, email, image, description } = this.state;

    const REGEX_TO_VALIDATE_EMAIL = (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const isValid = [name, email, image, description].every(({ length }) => length > 0)
      && REGEX_TO_VALIDATE_EMAIL.test(email);

    this.setState({ saveButtonIsDisabled: !isValid });
  }

  render() {
    const {
      name,
      email,
      image,
      description,
      saveButtonIsDisabled,
      loading,
      redirect,
    } = this.state;

    const { username } = this.props;

    if (redirect) return <Redirect to="/profile" />;

    return (
      <div className="page">
        <Header username={ username } />
        { loading
          ? <p>Carregando...</p>
          : (
            <div data-testid="page-profile-edit">
              <label htmlFor="editName">
                Nome:
                <input
                  onChange={ this.handleChange }
                  id="editName"
                  type="text"
                  value={ name }
                  name="name"
                  data-testid="edit-input-name"
                />
              </label>

              <label htmlFor="editEmail">
                E-mail:
                <input
                  onChange={ this.handleChange }
                  id="editEmail"
                  type="text"
                  value={ email }
                  name="email"
                  data-testid="edit-input-email"
                />
              </label>

              <label htmlFor="editDescription">
                Descrição:
                <input
                  onChange={ this.handleChange }
                  id="editDescription"
                  type="text"
                  value={ description }
                  name="description"
                  data-testid="edit-input-description"
                />
              </label>

              <label htmlFor="editImage">
                Imagem:
                <input
                  onChange={ this.handleChange }
                  id="editImage"
                  type="text"
                  value={ image }
                  name="image"
                  data-testid="edit-input-image"
                />
              </label>

              <button
                onClick={ this.onButtonClick }
                type="button"
                data-testid="edit-button-save"
                disabled={ saveButtonIsDisabled }
              >
                Salvar
              </button>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  username: string.isRequired,
  history: shape({}).isRequired,
};

export default ProfileEdit;
