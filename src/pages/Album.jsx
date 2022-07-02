import React, { Component } from 'react';
import { string, shape } from 'prop-types';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.itsFavoriteSong = this.itsFavoriteSong.bind(this);

    this.state = {
      albumData: [],
      favoriteSongs: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const albumData = await getMusics(id);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ albumData, favoriteSongs });
  }

  addFavoriteSong(track) {
    this.setState(
      { loading: true },
      () => {
        addSong(track).then(() => {
          getFavoriteSongs().then((favoriteSongs) => {
            this.setState({ favoriteSongs, loading: false });
          });
        });
      },
    );
  }

  itsFavoriteSong(track) {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some((favorite) => favorite.trackId === track.trackId);
  }

  render() {
    const { albumData, loading } = this.state;
    const { username } = this.props;

    return (
      <div data-testid="page-album">
        <Header username={ username } />

        { !loading && albumData.length > 0 ? (
          <>
            <p data-testid="artist-name">
              Nome do artista:
              {' '}
              { albumData[0].artistName }
            </p>
            <p data-testid="album-name">
              Nome do álbum:
              {' '}
              { albumData[0].collectionName }
            </p>
          </>
        ) : <p>Carregando...</p> }

        { !loading && albumData
          .filter((_music, index) => index > 0)
          .map((music) => (
            <MusicCard
              addFavoriteSong={ this.addFavoriteSong }
              favoriteSong={ this.itsFavoriteSong(music) }
              key={ music.trackId }
              track={ music }
            />
          ))}
      </div>
    );
  }
}

Album.propTypes = {
  username: string.isRequired,
  match: shape({}).isRequired,
};

export default Album;
