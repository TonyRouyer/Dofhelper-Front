// FiltreNom.js
import React from 'react';

const FiltreNom = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="text-black	"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rechercher par nom..."
    />
  );
};

export default FiltreNom;
