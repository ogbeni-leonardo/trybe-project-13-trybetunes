import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { shape } from 'prop-types';

import './AlbumCard.css';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;

    return (
      <li className="album-card">
        <Link
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
        >
          <div
            className="album-card__image-container"
            style={ { backgroundImage: `url('${album.artworkUrl100}')` } }
          >
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
          </div>

          <div className="album-card__infos">
            <p className="album-card__name">{ album.artistName }</p>
            <p className="album-card__collection">{ album.collectionName }</p>
          </div>
        </Link>
      </li>
    );
  }
}

AlbumCard.propTypes = {
  album: shape({}).isRequired,
};

export default AlbumCard;
