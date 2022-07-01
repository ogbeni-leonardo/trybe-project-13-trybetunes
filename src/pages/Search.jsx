import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      searchInputContent: '',
      searchButtonIsDisabled: true,
      albums: [],
      lastSearch: '',
      loading: false,
    };
  }

  onInputChange({ target: { value } }) {
    const hasValidValue = value.trim().length > 1;

    this.setState({
      searchInputContent: value,
      searchButtonIsDisabled: !hasValidValue,
    });
  }

  onButtonClick(event) {
    event.preventDefault();

    const { searchInputContent } = this.state;

    this.setState(
      { loading: true },
      () => searchAlbumsAPI(searchInputContent)
        .then((data) => this.setState({
          albums: data,
          lastSearch: searchInputContent,
          searchInputContent: '',
          loading: false,
        })),
    );
  }

  render() {
    const {
      searchInputContent,
      searchButtonIsDisabled,
      albums,
      lastSearch,
      loading,
    } = this.state;

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
            onClick={ this.onButtonClick }
            type="submit"
          >
            Pesquisar
          </button>
        </form>

        <div>
          { lastSearch !== ''
            && albums.length === 0
            && <p>Nenhum álbum foi encontrado</p> }

          { loading && <p>Carregando...</p> }

          { !loading && albums.length > 0 && (
            <p>
              Resultado de álbuns de:
              {' '}
              { lastSearch }
            </p>
          ) }

          <u>
            { albums.map(({ collectionName, collectionId }) => (
              <li key={ collectionId }>
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  { collectionName }
                </Link>
              </li>
            )) }
          </u>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  username: string.isRequired,
};

export default Search;
