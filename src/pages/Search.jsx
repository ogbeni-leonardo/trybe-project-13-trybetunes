import React, { Component } from 'react';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

import Header from '../components/Header';
import AlbumCard from '../components/AlbumCard';

import '../css/Search.css';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      search: '',
      buttonIsDisabled: true,
      albums: [],
      lastSearch: '',
      loading: false,
    };
  }

  onInputChange({ target: { value } }) {
    const isValid = value.trim().length > 1;
    this.setState({ search: value, buttonIsDisabled: !isValid });
  }

  onButtonClick(event) {
    event.preventDefault();

    const { search } = this.state;

    this.setState(
      () => ({ loading: true, lastSearch: search }),
      () => searchAlbumsAPI(search)
        .then((albums) => this.setState({
          albums,
          search: '',
          buttonIsDisabled: true,
          loading: false,
        })),
    );
  }

  render() {
    const {
      search,
      buttonIsDisabled,
      albums,
      lastSearch,
      loading,
    } = this.state;

    return (
      <div data-testid="page-search" className="page">
        <Header search="active" />

        <form className="search-form">
          <h1 className="search-form-title">Buscar</h1>

          <div className="search-area">
            <label htmlFor="search">
              <input
                data-testid="search-artist-input"
                id="search"
                onChange={ this.onInputChange }
                placeholder="Digite o nome do álbum ou do artista..."
                type="text"
                value={ search }
              />
            </label>

            <button
              data-testid="search-artist-button"
              disabled={ buttonIsDisabled }
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
            && <p className="search-alert">Nenhum álbum foi encontrado</p> }

          { loading && <p className="search-alert">Carregando...</p> }

          { !loading && albums.length > 0 && (
            <p className="search-success">
              Resultado de álbuns de:
              {' '}
              {/* <span>{ lastSearch }</span> */}
              {/* Não passa nos testes */}
              { lastSearch }
              {/* Passa nos testes */}
            </p>
          ) }

          <ul className="albums-container">
            { albums.map((album) => (
              <AlbumCard key={ album.collectionId } album={ album } />
            )) }
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
