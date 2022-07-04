import React, { Component } from 'react';
import { shape, func, arrayOf } from 'prop-types';

import './MusicCard.css';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.onCheckChange = this.onCheckChange.bind(this);

    this.state = {
      favorite: false,
    };
  }

  componentDidMount() {
    const { allFavoriteSongs, song: { trackId } } = this.props;

    const favorite = allFavoriteSongs
      .some((favoriteSong) => favoriteSong.trackId === trackId);

    this.setState({ favorite });
  }

  onCheckChange({ target: { checked } }, song) {
    const { updateFavoriteSongs } = this.props;

    const action = checked ? 'add' : 'remove';
    updateFavoriteSongs(song, action);
  }

  render() {
    const { favorite } = this.state;
    const { song } = this.props;
    const { trackId, trackName, previewUrl, collectionName, artworkUrl100 } = song;

    return (
      <li className="song-container">
        <img src={ artworkUrl100 } alt={ trackName } />
        <div className="song-info">
          <h2 className="song-name">{ trackName }</h2>
          <p className="song-collection">{ collectionName }</p>
        </div>

        <audio
          controls
          data-testid="audio-component"
        >
          <source src={ previewUrl } />
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>

        <label htmlFor={ trackId }>
          <input
            checked={ favorite }
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            onChange={ (event) => this.onCheckChange(event, song) }
            type="checkbox"
          />
          Favorita
        </label>
      </li>
    );
  }
}

MusicCard.defaultProps = {
  allFavoriteSongs: [{}],
};

MusicCard.propTypes = {
  song: shape({}).isRequired,
  allFavoriteSongs: arrayOf(shape({})),
  updateFavoriteSongs: func.isRequired,
};

export default MusicCard;
