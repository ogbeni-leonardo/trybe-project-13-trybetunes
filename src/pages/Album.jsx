import React, { Component } from 'react';
import { string, shape } from 'prop-types';

import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.addOrRemoveFavoriteSong = this.addOrRemoveFavoriteSong.bind(this);

    this.state = {
      albumContent: [],
      allFavoriteSongs: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const albumContent = await getMusics(id);
    const allFavoriteSongs = await getFavoriteSongs();
    this.setState({ albumContent, allFavoriteSongs });
  }

  addOrRemoveFavoriteSong(song, action) {
    const addOrRemove = (action === 'add') ? addSong : removeSong;

    this.setState(
      { loading: true },
      () => addOrRemove(song).then(() => {
        getFavoriteSongs().then((favorites) => {
          this.setState({ allFavoriteSongs: favorites || [], loading: false });
        });
      }),
    );
  }

  render() {
    const { albumContent, loading, allFavoriteSongs } = this.state;
    const { username } = this.props;

    return (
      <div data-testid="page-album">
        <Header username={ username } />

        { !loading && albumContent.length > 0 ? (
          <>
            <p data-testid="artist-name">
              Nome do artista:
              {' '}
              { albumContent[0].artistName }
            </p>
            <p data-testid="album-name">
              Nome do álbum:
              {' '}
              { albumContent[0].collectionName }
            </p>
          </>
        ) : <p>Carregando...</p> }

        { !loading && albumContent
          .filter((_song, index) => index > 0)
          .map((song) => (
            <MusicCard
              key={ song.trackId }
              song={ song }
              allFavoriteSongs={ allFavoriteSongs }
              addOrRemoveFavoriteSong={ this.addOrRemoveFavoriteSong }
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
