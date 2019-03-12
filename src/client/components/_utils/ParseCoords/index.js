import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import './styles.scss'

function ParseCoords({ lat = '', lon = '' }) {
  const splitCoords = (x) => {
    return x.split('|').length >= 4 ? x.split('|') : null
  }
  const formattedLat = splitCoords(lat)
  const formattedLon = splitCoords(lon)
  if (formattedLat && formattedLon) {
    return(
      <span className="coordSet">
        <Icon>place</Icon>
        <span className="coord"> {formattedLat[0]}&deg; {formattedLat[1]}&apos; {formattedLat[2]}&quot; {formattedLat[3]} </span>
        <span className="coord"> {formattedLon[0]}&deg; {formattedLon[1]}&apos; {formattedLon[2]}&quot; {formattedLon[3]} </span>
      </span>
    )
  }
}
ParseCoords.propTypes = {
  lat: PropTypes.string,
  lon: PropTypes.string
}

export default ParseCoords;
