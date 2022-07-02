import React, { Component } from 'react';
import { shape, func, bool } from 'prop-types';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.onCheckChange = this.onCheckChange.bind(this);

    const { favoriteSong } = this.props;

    this.state = {
      favoriteSong,
    };
  }

  onCheckChange({ target: { checked } }, track) {
    const { addOrRemoveFavoriteSong } = this.props;

    this.setState({ favoriteSong: checked });

    const action = checked ? 'add' : 'remove';
    addOrRemoveFavoriteSong(track, action);
  }

  render() {
    const { favoriteSong } = this.state;
    const { track } = this.props;
    const { trackId, trackName, previewUrl } = track;

    return (
      <div>
        <p>{ trackName }</p>
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
            checked={ favoriteSong }
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            onChange={ (event) => this.onCheckChange(event, track) }
            type="checkbox"
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  addOrRemoveFavoriteSong: func.isRequired,
  favoriteSong: bool.isRequired,
  track: shape({}).isRequired,
};

export default MusicCard;
