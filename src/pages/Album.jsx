import React, { Component } from 'react';
import { string, shape } from 'prop-types';

import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumData: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const data = await getMusics(id);
    this.setState({ albumData: data });
  }

  render() {
    const { albumData } = this.state;
    const { username } = this.props;

    return (
      <div data-testid="page-album">
        <Header username={ username } />

        { albumData.length > 0 && (
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
        ) }

        { albumData
          .filter((_music, index) => index > 0)
          .map((music) => (
            <MusicCard key={ music.trackId } track={ music } />
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
