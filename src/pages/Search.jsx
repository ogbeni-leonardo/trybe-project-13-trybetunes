import React, { Component } from 'react';
import { string } from 'prop-types';

import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      searchInputContent: '',
      searchButtonIsDisabled: true,
    };
  }

  onInputChange({ target: { value } }) {
    const hasValidValue = value.trim().length > 1;

    this.setState({
      searchInputContent: value,
      searchButtonIsDisabled: !hasValidValue,
    });
  }

  render() {
    const { searchInputContent, searchButtonIsDisabled } = this.state;
    const { username } = this.props;

    return (
      <div data-testid="page-search">
        <Header username={ username } />
        <form>
          <label htmlFor="search">
            <input
              data-testid="search-artist-input"
              id="search"
              onChange={ this.onInputChange }
              placeholder="Digite o nome do álbum ou artista..."
              type="text"
              value={ searchInputContent }
            />
          </label>

          <button
            data-testid="search-artist-button"
            disabled={ searchButtonIsDisabled }
            type="submit"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  username: string.isRequired,
};

export default Search;
