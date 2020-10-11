import React from 'react';

import Marker from '../Marker';
import UserMarker from '../UserMarker';

function MarkerList({ features }) {
  if (!features) {
    return null;
  }

  const timeOffset = features[features.length - 1].properties.time;

  return (
    <>
      <UserMarker />
      {features.map((item) => (
        <Marker {...item} timeOffset={timeOffset} key={item.id} />
      ))}
      {/* <Marker geometry={{ coordinates: [0, 0] }} userMarker /> */}
    </>
  );
}

export default MarkerList;
