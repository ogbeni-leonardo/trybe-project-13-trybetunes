import React, { Component } from 'react';
import { shape, func, arrayOf } from 'prop-types';

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
    const favorite = allFavoriteSongs.some(
      (favoriteSong) => favoriteSong.trackId === trackId,
    );
    this.setState({ favorite });
  }

  onCheckChange({ target: { checked } }, song) {
    const { addOrRemoveFavoriteSong } = this.props;

    const action = checked ? 'add' : 'remove';
    addOrRemoveFavoriteSong(song, action);
  }

  render() {
    const { favorite } = this.state;
    const { song } = this.props;
    const { trackId, trackName, previewUrl } = song;

    return (
      <li>
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
  addOrRemoveFavoriteSong: func.isRequired,
};

export default MusicCard;
