import React, { Component } from 'react';

import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

import '../css/Favorites.css';

class Favorites extends Component {
  constructor() {
    super();

    this.updateFavoriteSongs = this.updateFavoriteSongs.bind(this);
    this.removeFavoriteSong = this.removeFavoriteSong.bind(this);

    this.state = {
      allFavoriteSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.updateFavoriteSongs();
  }

  updateFavoriteSongs() {
    this.setState(
      { loading: true },
      () => getFavoriteSongs()
        .then((favorites) => {
          this.setState({ allFavoriteSongs: favorites || [], loading: false });
        }),
    );
  }

  removeFavoriteSong(song) {
    this.setState(
      { loading: true },
      () => removeSong(song).then(() => {
        getFavoriteSongs().then((favorites) => {
          this.setState({ allFavoriteSongs: favorites || [], loading: false });
        });
      }),
    );
  }

  render() {
    const { loading, allFavoriteSongs } = this.state;

    return (
      <div data-testid="page-favorites" className="page">
        <Header favorites="active" />
        <h1 className="favorite-title">Minhas favoritas</h1>

        { loading && <p className="loading">Carregando...</p> }

        <ul className="favorite-songs">
          { !loading && allFavoriteSongs
            .map((song) => (
              <MusicCard
                key={ song.trackId }
                allFavoriteSongs={ allFavoriteSongs }
                song={ song }
                updateFavoriteSongs={ this.removeFavoriteSong }
              />
            )) }
        </ul>
      </div>
    );
  }
}

export default Favorites;
