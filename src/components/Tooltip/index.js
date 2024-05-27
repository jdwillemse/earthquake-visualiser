import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import css from './styles.module.css';
import { selectActiveFeature } from '../../slices/tooltipSlice';

export const tooltipId = 'tooltip';

// [longitude,latitude]
function Tooltip() {
  const activeFeature = useSelector(selectActiveFeature);

  return (
    <div className={css.wrap}>
      <div
        className={css.tooltip}
        id={tooltipId}
        role="region"
        aria-live="polite"
      >
        {/* used to fade out animation after activeFeature is unset */}
        <AnimatePresence>
          {activeFeature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>
                {activeFeature.customCopy || activeFeature.properties.place}
              </h3>
              {activeFeature.properties && (
                <div>
                  Magnitude <strong>{activeFeature.properties.mag}</strong> |{' '}
                  <strong>{Math.round(activeFeature.distance)} km</strong> from
                  you
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Tooltip;
