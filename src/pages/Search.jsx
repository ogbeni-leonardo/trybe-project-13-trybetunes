import React, { Component } from 'react';
import { string } from 'prop-types';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';

import styles from '../css/Search.module.css';

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
      <div data-testid="page-search" className={ styles.searchPage }>
        <Header username={ username } />

        <form className={ styles.searchForm }>
          <h1 className={ styles.searchTitle }>Pesquisar</h1>

          <div className={ styles.searchArea }>
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
          </div>
        </form>

        <div>
          { lastSearch !== ''
            && albums.length === 0
            && !loading
            && <p className={ styles.errorMessage }>Nenhum álbum foi encontrado</p> }

          { loading && <p className={ styles.loadingMessage }>Carregando...</p> }

          { !loading && albums.length > 0 && (
            <p className={ styles.successMessage }>
              Resultado de álbuns de:
              {' '}
              { lastSearch }
            </p>
          ) }

          <ul className={ styles.albumsContainer }>
            { albums.map((album) => (
              <AlbumCard key={ album.collectionId } album={ album } />
            )) }
          </ul>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  username: string.isRequired,
};

export default Search;
