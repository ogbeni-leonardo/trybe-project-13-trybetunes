import React, { Component } from 'react';
import { string } from 'prop-types';

import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

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
    const { username } = this.props;

    return (
      <div data-testid="page-favorites">
        <Header username={ username } />
        { loading && <p id="text">Carregando...</p> }
        <ul>
          { !loading && allFavoriteSongs
            .map((song) => (
              <MusicCard
                key={ song.trackId }
                allFavoriteSongs={ allFavoriteSongs }
                song={ song }
                addOrRemoveFavoriteSong={ this.removeFavoriteSong }
              />
            )) }
        </ul>
      </div>
    );
  }
}

Favorites.propTypes = {
  username: string.isRequired,
};

export default Favorites;
