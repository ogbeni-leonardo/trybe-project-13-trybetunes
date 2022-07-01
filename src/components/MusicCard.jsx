import React, { Component } from 'react';
import { shape } from 'prop-types';

class MusicCard extends Component {
  render() {
    const { track: { trackName, previewUrl } } = this.props;

    return (
      <>
        <p>{ trackName }</p>
        <audio
          controls
          data-testid="audio-component"
        >
          <source src={ previewUrl } />
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          { ' ' }
          <code>audio</code>
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  track: shape({}).isRequired,
};

export default MusicCard;
