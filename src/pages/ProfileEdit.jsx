import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { shape } from 'prop-types';

import { getUser, updateUser } from '../services/userAPI';

import Header from '../components/Header';

import '../css/ProfileEdit.css';

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
      () => getUser().then(({ name, email, image, description }) => {
        this.setState(
          { name, email, image, description, loading: false },
          () => this.validateEntries(),
        );
      }),
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

    if (redirect) return <Redirect to="/profile" />;

    return (
      <div className="page">
        <Header profile="active" />

        { loading
          ? <p className="edit-loading">Carregando...</p>
          : (
            <form data-testid="page-profile-edit" className="edit-form">
              <h1>Edite suas informações</h1>
              <label htmlFor="editName">
                Nome:
                <input
                  data-testid="edit-input-name"
                  id="editName"
                  name="name"
                  onChange={ this.handleChange }
                  placeholder="Digite seu nome..."
                  type="text"
                  value={ name }
                />
              </label>

              <label htmlFor="editEmail">
                E-mail:
                <input
                  data-testid="edit-input-email"
                  id="editEmail"
                  name="email"
                  onChange={ this.handleChange }
                  placeholder="Digite seu e-mail..."
                  type="text"
                  value={ email }
                />
              </label>

              <label htmlFor="editDescription">
                Descrição:
                <input
                  data-testid="edit-input-description"
                  id="editDescription"
                  name="description"
                  onChange={ this.handleChange }
                  placeholder="Dê mais informações sobre você..."
                  type="text"
                  value={ description }
                />
              </label>

              <label htmlFor="editImage">
                Imagem:
                <input
                  data-testid="edit-input-image"
                  id="editImage"
                  name="image"
                  onChange={ this.handleChange }
                  placeholder="URL da imagem..."
                  type="text"
                  value={ image }
                />
              </label>

              <button
                data-testid="edit-button-save"
                disabled={ saveButtonIsDisabled }
                onClick={ this.onButtonClick }
                type="button"
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: shape({}).isRequired,
};

export default ProfileEdit;
