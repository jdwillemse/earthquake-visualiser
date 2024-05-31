import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import css from './styles.module.css';
import { useTooltipStore } from '../../slices/tooltipSlice';

export const tooltipId = 'tooltip';

function Tooltip() {
  const selectedMarker = useTooltipStore((state) => state.selectedMarker);

  return (
    <div className={css.wrap}>
      <div
        className={css.tooltip}
        id={tooltipId}
        role="region"
        aria-live="polite"
      >
        {/* used to fade out animation after selectedMarker is unset */}
        <AnimatePresence>
          {selectedMarker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>
                {selectedMarker.customCopy || selectedMarker.properties?.place}
              </h3>
              {selectedMarker.properties && (
                <div>
                  Magnitude <strong>{selectedMarker.properties.mag}</strong> |{' '}
                  <strong>{Math.round(selectedMarker.distance ?? 0)} km</strong>{' '}
                  from you
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
