// FiltreRatio.js
import React from 'react';

const FiltreRatio = ({ value, onChange }) => {
  return (
    <input
      type="number"
      className="text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Ratio minimum..."
    />
  );
};

export default FiltreRatio;
