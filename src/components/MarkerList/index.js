import React from 'react';
import { useSelector } from 'react-redux';

import css from './styles.module.css';
import Marker from '../Marker';
import UserMarker from '../UserMarker';
import { selectData } from '../../slices/earthquakeDataSlice';

function MarkerList() {
  const { features } = useSelector(selectData);

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
    </div>
  );
}

export default MarkerList;
