import React from 'react';

import css from './styles.module.css';
import Marker from '../Marker';
import UserMarker from '../UserMarker';

function MarkerList({ features }) {
  if (!features) {
    return null;
  }

  const timeOffset = features[features.length - 1].properties.time;

  return (
    <div className={css.wrap}>
      <UserMarker />
      {features.map((item) => (
        <Marker {...item} timeOffset={timeOffset} key={item.id} />
      ))}
      {/* <Marker geometry={{ coordinates: [0, 0] }} userMarker /> */}
    </div>
  );
}

export default MarkerList;
