import React, { Component } from 'react';
import { shape } from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './AlbumCard.module.css';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;

    return (
      <li className={ styles.album }>
        <Link
          className={ styles.albumData }
          data-testid={ `link-to-album-${album.collectionId}` }
          to={ `/album/${album.collectionId}` }
        >
          <div
            className={ styles.imageContainer }
            style={ { backgroundImage: `url('${album.artworkUrl100}')` } }
          >
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
          </div>

          <div className={ styles.infos }>
            <p className={ styles.artistName }>{ album.artistName }</p>
            <p className={ styles.collectionName }>{ album.collectionName }</p>
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
