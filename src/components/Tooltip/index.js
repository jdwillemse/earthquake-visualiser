import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import css from './styles.module.css';
import { TooltipContext } from '../../contexts/TooltipContext';
import { UserLocationContext } from '../../contexts/UserLocationContext';
import { getDistance } from '../../utils/math';

export const tooltipId = 'tooltip';

// [longitude,latitude]
function Tooltip() {
  const { activeFeature } = useContext(TooltipContext);
  const { coordinates } = useContext(UserLocationContext);

  const distance =
    activeFeature &&
    getDistance(coordinates, activeFeature.geometry.coordinates);

  return (
    <div className={css.wrap}>
      <div
        className={css.tooltip}
        id={tooltipId}
        role="region"
        aria-live="polite"
      >
        <AnimatePresence>
          {activeFeature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>{activeFeature.properties.place}</h3>
              <div>
                Magnitude <strong>{activeFeature.properties.mag}</strong> |{' '}
                <strong>{Math.round(distance)} km</strong> from you
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Tooltip;
