import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import css from './styles.module.css';
import { TooltipContext } from '../../contexts/TooltipContext';

export const tooltipId = 'tooltip';

// [longitude,latitude]
function Tooltip() {
  const { activeFeature } = useContext(TooltipContext);
  const distance = 100;

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
                Magnitude {activeFeature.properties.mag} | {distance}km from you
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Tooltip;
